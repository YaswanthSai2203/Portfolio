# Developer portfolio

Premium, animated portfolio for a senior **Full Stack .NET Engineer** — Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, shadcn-style primitives (Radix), and Lucide icons. Dark mode is default; light mode is available from the header toggle.

## Folder structure

```
src/
  app/
    globals.css          # Tailwind v4 theme tokens, glass/neu utilities
    layout.tsx           # Fonts (Inter + Poppins), SEO metadata, ThemeProvider
    page.tsx             # Home page composition
    template.tsx         # Route-level page transitions
    robots.ts / sitemap.ts
  components/
    ui/                  # Button, Card, Dialog, Input, Label, Textarea
    sections/            # Hero, About, Skills, Experience, Projects, AI, Contact
    lazy-sections.tsx    # next/dynamic wrappers + skeletons (lazy loading)
    site-header.tsx      # Nav, socials, theme toggle
    site-footer.tsx
    particle-field.tsx
    theme-provider.tsx
    page-transition.tsx
  hooks/
    use-reduced-motion.ts
    use-count-up.ts
  lib/
    data.ts              # Copy: profile, skills, experience, projects
    utils.ts             # cn()
public/
  (exactly one .pdf — your resume; /api/resume picks it up automatically)
```

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm install`  | Install dependencies     |
| `npm run dev`  | Dev server (localhost)   |
| `npm run build`| Production build         |
| `npm run start`| Serve production build   |
| `npm run lint` | ESLint (flat config)     |

## Environment setup

1. **Node.js**: LTS (18.18+ or 20+ recommended for Next.js 16).
2. **No secrets required** for the static marketing site. If you add a real contact API later, use:
   - `CONTACT_WEBHOOK_URL` or your provider’s keys — never commit `.env.local`.
3. **Site URL for SEO**: In `src/app/layout.tsx` and `src/app/sitemap.ts`, replace `https://example.com` with your production domain (or read from `process.env.NEXT_PUBLIC_SITE_URL` if you prefer).

## Personalization

- Edit **`src/lib/data.ts`**: **`profile.name`** (used in hero, header wordmark, footer, tab title via `layout.tsx`), links, summary, skills, experience, projects.
- Put **exactly one** file named **`*.pdf`** in **`public/`** (no other PDFs). **`GET /api/resume`** finds it at runtime and sends it as a download; the suggested filename is derived from **`profile.name`** (e.g. `Jane-Doe-Resume.pdf`).

## Deployment

### Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Framework preset: **Next.js**. Root directory: repo root. Build: `npm run build`, Output: default (`.next`).
4. **Environment variables**: add any future API keys under Project → Settings → Environment Variables.
5. Deploy. Vercel assigns a URL; add your custom domain under **Domains**.

### Netlify

1. Push the repo to a Git host.
2. In [Netlify](https://www.netlify.com) → **Add new site** → **Import an existing project**.
3. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next` is **not** correct for static export; use the **Next.js** runtime:
     - Prefer the official **Netlify Next.js** plugin (see Netlify docs for `@netlify/plugin-nextjs`) so SSR and App Router work.
   - Alternatively, deploy via **Netlify CLI**: `npm i -g netlify-cli` → `netlify init` → follow prompts for Next.js.
4. Set environment variables in **Site settings → Environment variables** if needed.

### Build + run locally (production)

```bash
npm install
npm run build
npm run start
```

## Accessibility & performance notes

- Skip link, focus styles on primary controls, `aria-label` on icon buttons, dialog close labeled for screen readers.
- `prefers-reduced-motion` reduces particles, typing carousel, and heavy motion.
- Below-the-fold sections load via `next/dynamic` with lightweight skeletons.

## License

Private / personal use — adjust as you like for your own portfolio.
