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

## Automatic Deployment

Forgejo repo has a push mirror to GitHub which then deploys the page to 
cloudflare pages
