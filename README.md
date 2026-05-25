# Air Conditioner Business Website

Static business website for an air conditioner maintenance business.

## Stack

| Layer | Tool |
|---|---|
| Static site generator | [Hugo](https://gohugo.io/) v0.160.1 extended |
| Theme | [shahar-local-biz](https://github.com/shaharbest/shahar-local-biz) (git submodule at `themes/shahar-local-biz`) |
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
├── static/
│   ├── admin/              # Decap CMS admin panel
│   │   ├── index.html      # CMS entry point (loads decap-cms JS from CDN)
│   │   └── config.yml      # CMS collections config
│   └── images/             # Site images
├── themes/shahar-local-biz/ # Theme as git submodule
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

## Updating the theme

All layouts and styles live in the [shahar-local-biz](https://github.com/shaharbest/shahar-local-biz) theme repo. The site repo pins the theme to a specific commit — it does not auto-follow changes.

After pushing a change to the theme repo, update the pin in this repo:

```bash
# In the theme repo — commit and push your changes first
git add .
git commit -m "your change description"
git push

# In this repo — advance the submodule pointer to the new commit, then deploy
git submodule update --remote themes/shahar-local-biz
git add themes/shahar-local-biz
git commit -m "Update theme"
git push
```

The final `git push` triggers Netlify's deploy automatically.

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
- **`data/features.json` is an object, not an array** — Decap CMS requires an object wrapper; the theme reads `hugo.Data.features.features` accordingly.
- **No contact form** — the contact page shows phone/email from `data/contact.yaml` but has no form submission. Add Netlify Forms if a form is needed.

## TODO / next steps

- Replace placeholder phone and email in `data/contact.yaml` with real business info
- Replace images in `static/images/` with real photos
- Set up Google Analytics 4 + Tag Manager for call tracking (set `google_analytics_id` in `config.toml`)
