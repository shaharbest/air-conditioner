# Air Conditioner Business Website

Static business website for an air conditioner maintenance business.

## Stack

| Layer | Tool |
|---|---|
| Static site generator | [Hugo](https://gohugo.io/) v0.160.1 extended |
| Theme | [Meghna Hugo](https://github.com/themefisher/meghna-hugo) (git submodule at `themes/meghna-hugo`) |
| Hugo module | `github.com/gethugothemes/hugo-modules/images` (vendored in `_vendor/`) |
| CMS | [Decap CMS](https://decapcms.org/) |
| CMS auth | [DecapBridge](https://decapbridge.com/) (replaces deprecated Netlify Identity + Git Gateway) |
| Hosting | [Netlify](https://netlify.com) — auto-deploys on push to `main` |
| Source | [GitHub](https://github.com/shaharbest/air-conditioner) (public repo) |

## Repository layout

```
.
├── assets/images/          # Site images (copied from theme example site)
├── config/_default/        # Hugo config split into multiple files
│   ├── hugo.toml           # Main config: baseURL, title, theme, plugins
│   ├── languages.toml      # Language definitions (en + fr, only en is used)
│   ├── menus.en.toml       # Navigation menu items
│   └── module.toml         # Hugo module imports + min Hugo version
├── content/english/        # Markdown content (blog posts, author pages)
├── data/en/                # YAML files — THIS is where all page content lives
│   ├── banner.yml          # Hero section (title, subtitle, CTA button)
│   ├── service.yml         # Services section (list of service cards)
│   ├── about.yml           # About section (list of feature points)
│   ├── feature.yml         # Feature section (image + feature list)
│   ├── cta.yml             # Call-to-action banner
│   ├── funfacts.yml        # Counters section
│   ├── testimonial.yml     # Testimonials carousel
│   ├── contact.yml         # Contact section (address, phone, email)
│   ├── pricing.yml         # Pricing section (currently unused/hidden)
│   ├── portfolio.yml       # Portfolio section (currently unused/hidden)
│   ├── skill.yml           # Skills section (currently unused/hidden)
│   └── team.yml            # Team section (currently unused/hidden)
├── static/admin/           # Decap CMS admin panel
│   ├── index.html          # CMS entry point (loads decap-cms JS from CDN)
│   └── config.yml          # CMS collections config (maps to data/en/*.yml)
├── themes/meghna-hugo/     # Theme as git submodule
├── _vendor/                # Vendored Hugo modules (committed so Netlify doesn't need to fetch)
├── netlify.toml            # Netlify build config (Hugo version, submodule strategy)
└── go.mod / go.sum         # Hugo module dependencies
```

## Local development

```bash
# First time
git clone --recurse-submodules https://github.com/shaharbest/air-conditioner
cd air-conditioner

# Run dev server
hugo server --buildDrafts
# → http://localhost:1313
```

## Content editing (CMS)

The business owner edits content at:
```
https://fluffy-malasada-57ebc5.netlify.app/admin
```

Auth is handled by **DecapBridge** (PKCE OAuth via GitHub). The CMS covers all sections in `data/en/`. Changes are committed directly to the `main` branch, which triggers a Netlify redeploy.

To invite a new CMS user: add them in the **DecapBridge dashboard** under the site's user management.

DecapBridge site ID: `5b0cdc16-fdc7-4702-8b0b-138bc51697af`

## Deployment

Netlify auto-deploys on every push to `main`. Build takes ~10s.

- Build command: `hugo --minify`
- Publish dir: `public`
- Hugo version: `0.160.1` (set via `HUGO_VERSION` env var in `netlify.toml`)
- Submodule strategy: `recursive` (set via `GIT_SUBMODULE_STRATEGY` in `netlify.toml`)

## Known issues / gotchas

- **Theme is a git submodule** — always clone with `--recurse-submodules`. Netlify handles this via `GIT_SUBMODULE_STRATEGY = "recursive"` in `netlify.toml`.
- **Hugo modules are vendored** — `_vendor/` is committed so Netlify doesn't need network access to fetch Go modules at build time.
- **Netlify Identity and Git Gateway are deprecated** — do not use them. DecapBridge is the replacement.
- **French content exists** (`content/french/`, `data/fr/`) but is not actively maintained. The site is single-language (English).
- **`data/fr/` is not wired into the CMS** — only `data/en/` collections are in `static/admin/config.yml`.
- The theme references `.Site.Data` and `.Site.Languages` which are deprecated in Hugo v0.156+. These produce warnings at build time but do not break the build.

## TODO / next steps

- Replace placeholder content in `data/en/` with real business info
- Replace images in `assets/images/` with real photos
- Configure custom domain in Netlify
- Set up Google Analytics 4 + Tag Manager for call tracking
- Update `config/_default/hugo.toml`: set `title`, `baseURL`, `googleAnalytics`
- Disable or hide unused sections (portfolio, pricing, skills, team) via `enable: false` in their respective `data/en/*.yml` files
