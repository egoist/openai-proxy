OpenAI proxy on Cloudflare Worker and Vercel Edge.

If you are close to Hong Kong, it's better to deploy on Vercel. Since Cloudflare will use Hong Kong which is not a supported region for OpenAI API.

To deploy on Vercel:

- Fork this repo
- Add your repo on Vercel

To deploy on Cloudflare:

```
pnpm i
pnpm run deploy
```
