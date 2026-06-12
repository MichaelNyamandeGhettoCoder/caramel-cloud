import { getStore } from "@netlify/blobs";
import bcrypt from "bcryptjs";

export default async (req) => {
  if (req.method!== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { pin } = await req.json();
  const store = getStore("caramel-admin");
  const hash = await store.get("password-hash");

  // First run: set default password 1234
  if (!hash) {
    const defaultHash = await bcrypt.hash("1234", 10);
    await store.set("password-hash", defaultHash);
    return Response.json({ success: pin === "1234" });
  }

  const valid = await bcrypt.compare(pin, hash);
  return Response.json({ success: valid });
}

