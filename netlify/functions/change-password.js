import { getStore } from "@netlify/blobs";
import bcrypt from "bcryptjs";

export default async (req) => {
  if (req.method!== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { oldPin, newPin } = await req.json();
  const store = getStore("caramel-admin");
  const hash = await store.get("password-hash");

  if (!hash) return Response.json({ error: "No password set" }, { status: 400 });

  const valid = await bcrypt.compare(oldPin, hash);
  if (!valid) return Response.json({ error: "Wrong current password" }, { status: 401 });

  const newHash = await bcrypt.hash(newPin, 10);
  await store.set("password-hash", newHash);
  return Response.json({ success: true });
}
