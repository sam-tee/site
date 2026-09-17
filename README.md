# samtee.uk — personal site

Zola static site for Sam Larcombe Tee (MSci Physics, Cambridge).
Deploys to **https://samtee.uk** via Cloudflare Pages.

## Local build

```sh
nix develop -c zola serve      # live preview
nix develop -c zola build      # outputs to public/
```

`static/cv.pdf` is the downloadable CV (regenerate from `cv.tex` if needed);
`static/_headers` forces it to download with a proper filename on Cloudflare.

## Deploy (GitHub mirror → Cloudflare Pages)

This repo is mirrored to GitHub. Cloudflare Pages builds from the mirror:

- **Build command:**
  `curl -L -o /tmp/zola.tar.gz https://github.com/getzola/zola/releases/download/v0.20.0/zola-v0.20.0-x86_64-unknown-linux-gnu.tar.gz && tar -xzf /tmp/zola.tar.gz -C /tmp && /tmp/zola build`
- **Output directory:** `public`
- **Custom domains:** `samtee.uk` (+ `www` redirecting to apex)

Push to `main` to redeploy. Alternatively the included
`.github/workflows/deploy.yml` deploys via Wrangler (needs
`CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` secrets).
