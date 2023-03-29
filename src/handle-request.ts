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

export default async function handleRequest(req: Request & { nextUrl?: URL }) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
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

  return res;
}
