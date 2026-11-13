// Protección con usuario/contraseña (HTTP Basic Auth) para todo el sitio.
// La contraseña vive en la variable de entorno SITE_PASSWORD de Vercel, nunca en el repo.
export const config = { matcher: "/(.*)" };

const enc = new TextEncoder();
async function same(a, b) {
  // Comparación en tiempo constante usando hashes SHA-256
  const [x, y] = await Promise.all([a, b].map(s => crypto.subtle.digest("SHA-256", enc.encode(s))));
  const u = new Uint8Array(x), v = new Uint8Array(y);
  let d = 0; for (let i = 0; i < u.length; i++) d |= u[i] ^ v[i];
  return d === 0;
}

export default async function middleware(request) {
  const user = process.env.SITE_USER || "partum";
  const pass = process.env.SITE_PASSWORD;
  const deny = (msg) => new Response(msg, {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Boveda Partum", charset="UTF-8"', "Cache-Control": "no-store" }
  });
  if (!pass) return new Response("Sitio no configurado", { status: 503 });

  const h = request.headers.get("authorization") || "";
  if (!h.startsWith("Basic ")) return deny("Acceso restringido");
  let decoded = "";
  try { decoded = new TextDecoder().decode(Uint8Array.from(atob(h.slice(6)), c => c.charCodeAt(0))); } catch { return deny("Acceso restringido"); }
  const i = decoded.indexOf(":");
  const ok = (await same(decoded.slice(0, i), user)) & (await same(decoded.slice(i + 1), pass));
  if (!ok) return deny("Usuario o contraseña incorrectos");
  // sin respuesta => continúa y sirve index.html
}
