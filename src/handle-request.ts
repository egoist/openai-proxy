const pickHeaders = (headers: Headers, keys: string[]): Headers => {
  const picked = new Headers();
  for (const key of keys) {
    const value = headers.get(key);
    if (typeof value === "string") {
      picked.set(key, value);
    }
  }
  return picked;
};

const CORS_HEADERS: Record<string, string> = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "Content-Type, Authorization",
};

export default async function handleRequest(req: Request & { nextUrl?: URL }) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: CORS_HEADERS,
    });
  }

  const { pathname, search } = req.nextUrl ? req.nextUrl : new URL(req.url);
  const url = new URL(pathname + search, "https://api.openai.com").href;
  const headers = pickHeaders(req.headers, ["content-type", "authorization"]);

  const res = await fetch(url, {
    body: req.body,
    method: req.method,
    headers,
  });

  for (const key in CORS_HEADERS) {
    res.headers.set(key, CORS_HEADERS[key]);
  }

  for (const key of res.headers.keys()) {
    if (key.startsWith("cf-")) {
      res.headers.delete(key);
    }
  }
  res.headers.delete("alt-svc");

  return res;
}
