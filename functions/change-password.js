import { bcrypt } from 'bcryptjs' // bcryptjs works on Cloudflare

export async function onRequestPost(context) {
  const { request, env } = context
  
  const { oldPin, newPin } = await request.json()
  const store = env.AUTH_KV
  
  const hash = await store.get("password-hash")
  
  if (!hash) return Response.json({ error: "No password set" }, { status: 400 })
  
  const valid = await bcrypt.compare(oldPin, hash)
  if (!valid) return Response.json({ error: "Wrong current PIN" }, { status: 401 })
  
  const newHash = await bcrypt.hash(newPin, 10)
  await store.put("password-hash", newHash) // .put instead of .set
  
  return Response.json({ success: true })
}
