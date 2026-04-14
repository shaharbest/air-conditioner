# Air Conditioner Business Website

Static business website for an air conditioner maintenance business.

## Stack

| Layer | Tool |
|---|---|
| Static site generator | [Hugo](https://gohugo.io/) v0.160.1 extended |
| Theme | [Hugo Serif](https://github.com/zerostaticthemes/hugo-serif-theme) (git submodule at `themes/hugo-serif-theme`) |
| CMS | [Decap CMS](https://decapcms.org/) |
| CMS auth | [DecapBridge](https://decapbridge.com/) (replaces deprecated Netlify Identity + Git Gateway) |
| Hosting | [Netlify](https://netlify.com) — auto-deploys on push to `main` |
| Source | [GitHub](https://github.com/shaharbest/air-conditioner) (public repo) |

## Repository layout

```
.
├── assets/images/          # Legacy images (from old theme — can be cleaned up)
├── config.toml             # All Hugo config: baseURL, title, theme, params, menus
├── content/
│   ├── _index.md           # Homepage headline and intro text
│   ├── about.md            # About page
│   ├── contact.md          # Contact page (hours table, intro text)
│   └── services/           # One .md file per service (title, body, weight)
├── data/
│   ├── contact.yaml        # Phone + email — shown in header contact box
│   ├── features.json       # 3 homepage feature cards {"features": [...]}
│   └── social.json         # Social links (currently empty)
├── layouts/                # Project-level template overrides (take precedence over theme)
│   ├── index.html          # Homepage — fixes features.json structure + hugo.Data
│   └── partials/
│       ├── call.html       # Contact box partial — uses hugo.Data
│       ├── social.html     # Social links partial — uses hugo.Data
│       └── sub-footer.html # Footer partial — uses hugo.Data
├── static/
│   ├── admin/              # Decap CMS admin panel
│   │   ├── index.html      # CMS entry point (loads decap-cms JS from CDN)
│   │   └── config.yml      # CMS collections config
│   └── images/             # Site images (copied from theme exampleSite)
├── themes/hugo-serif-theme/ # Theme as git submodule
└── netlify.toml            # Netlify build config (Hugo version, submodule strategy)
```

## Local development

```bash
# First time
git clone --recurse-submodules https://github.com/shaharbest/air-conditioner
cd air-conditioner

# Run dev server
hugo server
# → http://localhost:1313
```

## Content editing (CMS)

The business owner edits content at:
```
https://danielle.best/admin
```

Auth is handled by **DecapBridge** (PKCE OAuth via GitHub). The CMS covers:

| CMS section | File edited |
|---|---|
| Services | `content/services/*.md` (create/edit/delete) |
| Contact Info (phone, email) | `data/contact.yaml` |
| Homepage Features | `data/features.json` |
| Homepage | `content/_index.md` |
| About Page | `content/about.md` |
| Contact Page | `content/contact.md` |

Changes are committed directly to the `main` branch, which triggers a Netlify redeploy.

To invite a new CMS user: add them in the **DecapBridge dashboard** under the site's user management.

DecapBridge site ID: `5b0cdc16-fdc7-4702-8b0b-138bc51697af`

## Deployment

Netlify auto-deploys on every push to `main`. Build takes ~10s.

- Build command: `hugo --minify`
- Publish dir: `public`
- Hugo version: `0.160.1` (set via `HUGO_VERSION` env var in `netlify.toml`)
- Submodule strategy: `recursive` (set via `GIT_SUBMODULE_STRATEGY` in `netlify.toml`)
- Custom domain: `danielle.best` (DNS managed by Netlify — nameservers at `dns1-4.p09.nsone.net`)

### Netlify CLI

```bash
# Install
npm install -g netlify-cli

# Authenticate
netlify login

# Link this repo to the Netlify site (run once per machine)
netlify link

# Useful commands
netlify status              # show linked site info
netlify deploy --prod       # manual deploy (bypass git push)
netlify open                # open site admin in browser
netlify logs                # stream deploy/function logs
```

## Known issues / gotchas

- **Theme is a git submodule** — always clone with `--recurse-submodules`. Netlify handles this via `GIT_SUBMODULE_STRATEGY = "recursive"` in `netlify.toml`.
- **Theme uses deprecated `.Site.Data`** — project-level overrides in `layouts/` replace the affected partials with `hugo.Data`. Do not delete the `layouts/` overrides.
- **`data/features.json` is an object, not an array** — the theme's exampleSite uses a root-level array, but Decap CMS requires an object wrapper. The `layouts/index.html` override reads `hugo.Data.features.features` accordingly.
- **No contact form** — the contact page shows phone/email from `data/contact.yaml` but has no form submission. Add Netlify Forms if a form is needed.

## TODO / next steps

- Replace placeholder phone and email in `data/contact.yaml` with real business info
- Replace images in `static/images/` with real photos
- Set up Google Analytics 4 + Tag Manager for call tracking (set `google_analytics_id` in `config.toml`)
