# Eitan Chudnovsky — personal site

Static personal site focused on Physical AI. Designed for **Cloudflare Pages** with no server or build step.

## Cloudflare Pages setup

1. In Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select this repository.
3. Configure the build:

| Setting | Value |
| --- | --- |
| Framework preset | **None** |
| Build command | *(leave empty)* |
| Build output directory | `/` (repository root) |

4. Save and deploy. Custom domains can be added after the first deploy.

No Node toolchain is required. The site is plain HTML, CSS, and JS served from the repo root (`index.html`, `styles.css`, `main.js`).

## Local preview

```bash
# any static server, e.g.
python3 -m http.server 8080
# then open http://localhost:8080
```

## Contents

- Hero: name, Physical AI headline, short support line, social links
- Focus: Physical AI fleets / production reliability
- Path: Upswift → JFrog → current CTO work (sparse)
- Footer: Tel Aviv · socials
