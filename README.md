# Philly Green Clean

Static business website for Philly Green Clean LLC — air duct, dryer vent, and chimney cleaning in the Philadelphia area.

## Stack

| Layer | Tool |
|---|---|
| Static site generator | [Hugo](https://gohugo.io/) v0.160.1 extended |
| Theme | [shahar-local-biz](https://github.com/shaharbest/shahar-local-biz) (Hugo module) |
| CMS | [Decap CMS](https://decapcms.org/) |
| CMS auth | [DecapBridge](https://decapbridge.com/) (PKCE OAuth via GitHub) |
| Hosting | [Netlify](https://netlify.com) — auto-deploys on push to `main` |
| Source | [GitHub](https://github.com/shaharbest/air-conditioner) (public repo) |

## Repository layout

```
.
├── config.toml             # All Hugo config: baseURL, title, colors, fonts, params, menus, module import
├── go.mod                  # Hugo module: pins theme version
├── go.sum                  # Hugo module: checksum lockfile (commit this)
├── content/
│   └── _index.md           # Homepage headline and intro text (hero section body)
├── data/
│   ├── contact.yaml        # Phone + email — shown in header contact box
│   ├── services.json       # Homepage services grid (title, summary, icon)
│   ├── hours.json          # Business hours table
│   ├── testimonials.json   # Customer testimonials (can be empty array)
│   ├── faq.json            # FAQ accordion items
│   ├── seo.yaml            # Default OG image, OG description, Twitter card config
│   └── schema.yaml         # LocalBusiness JSON-LD structured data
├── static/
│   ├── admin/              # Decap CMS admin panel (do not edit unless changing CMS config)
│   │   ├── index.html      # CMS entry point — loads decap-cms JS from CDN
│   │   └── config.yml      # CMS collections: maps UI fields to data files
│   └── images/             # Site images (logos, service icons, OG image)
└── netlify.toml            # Netlify build config (Hugo version)
```

## Local development

```bash
# First time — no submodules needed, Hugo fetches the theme automatically
git clone https://github.com/shaharbest/air-conditioner
cd air-conditioner
hugo server
# → http://localhost:1313
```

Hugo downloads the theme from GitHub on first run and caches it locally.

## Content editing (CMS)

The business owner edits content at:
```
https://phillygreenclean.com/admin
```

Auth is handled by **DecapBridge** (PKCE OAuth via GitHub). The CMS covers:

| CMS section | File edited |
|---|---|
| Services | `data/services.json` |
| Testimonials | `data/testimonials.json` |
| FAQ | `data/faq.json` |
| Homepage | `content/_index.md` |
| Contact Info (phone, email) | `data/contact.yaml` |
| Business Hours | `data/hours.json` |
| SEO / Social Previews | `data/seo.yaml` |

Changes are committed directly to the `main` branch, which triggers a Netlify redeploy.

To invite a new CMS user: add them in the **DecapBridge dashboard** under the site's user management.

DecapBridge site ID: `5b0cdc16-fdc7-4702-8b0b-138bc51697af`

## Updating the theme

All layouts and styles live in the [shahar-local-biz](https://github.com/shaharbest/shahar-local-biz) theme repo.

After pushing a change to the theme repo:

```bash
# In this repo — pull the latest theme commit and deploy
hugo mod get -u github.com/shaharbest/shahar-local-biz
hugo mod tidy
git add go.mod go.sum
git commit -m "Update theme"
git push
```

The final `git push` triggers Netlify's deploy automatically.

## Deployment

Netlify auto-deploys on every push to `main`. Build takes ~10–30s (including theme download on first cold build).

- Build command: `hugo --minify`
- Publish dir: `public`
- Hugo version: `0.160.1` (set via `HUGO_VERSION` env var in `netlify.toml`)
- Custom domain: `phillygreenclean.com`

### Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify link          # link this repo to the Netlify site (once per machine)
netlify status        # show linked site info
netlify deploy --prod # manual deploy (bypass git push)
netlify open          # open site admin in browser
netlify logs          # stream deploy/function logs
```

## Known issues / gotchas

- **`data/features.json` is an object, not an array** — Decap CMS requires an object wrapper; the theme reads `hugo.Data.features.features` accordingly.
- **No contact form** — the contact page shows phone/email from `data/contact.yaml` but has no form submission. Add Netlify Forms if a form is needed.
- **Theme module requires Hugo extended** — the standard Hugo binary cannot compile SCSS. Netlify uses extended via `HUGO_EXTENDED = "true"` in `netlify.toml`.
