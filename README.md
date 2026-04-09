# Developer portfolio

Premium, animated portfolio for a senior **Full Stack .NET Engineer** — Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, **React Three Fiber** (sitewide subtle 3D background), shadcn-style primitives (Radix), and Lucide icons. Dark mode is default; light mode is available from the header toggle. **`prefers-reduced-motion`** disables the WebGL layer and scroll progress bar.

## Folder structure

```
src/
  app/
    globals.css          # Tailwind v4 theme tokens, glass/neu utilities
    layout.tsx           # Fonts (Inter + Poppins), SEO metadata, ThemeProvider
    page.tsx             # Home page composition
    template.tsx         # Route-level page transitions
    robots.ts / sitemap.ts
    api/contact/route.ts  # POST form → Resend or webhook
    api/resume/route.ts
  components/
    ui/                  # Button, Card, Dialog, Input, Label, Textarea
    sections/            # + Philosophy, Scalable systems, Projects (rich modal + demos)
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
    resume.ts            # Server: find single PDF in /public
    resume-download-name.ts
    mailto-contact.ts    # Client mailto fallback when API not configured
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
2. **Contact form**: Without server config, submit opens the visitor’s **mail client** with **to**, **subject**, and **body** prefilled (they tap Send). To send **silently** from the server, set **`RESEND_API_KEY`** + **`CONTACT_FROM_EMAIL`** in `.env.local` / Vercel (see [Resend](https://resend.com)); optional **`CONTACT_TO_EMAIL`** overrides **`profile.email`**. Or set **`CONTACT_WEBHOOK_URL`** for Slack/Zapier JSON.
3. **Site URL for SEO**: Set **`NEXT_PUBLIC_SITE_URL`** (e.g. `https://your-site.vercel.app`) in Vercel / `.env.local`. It drives **`metadataBase`**, Open Graph URLs, **`sitemap.xml`**, **`robots.txt`**, and **JSON-LD**. If unset, the app falls back to `https://example.com` (replace before launch).
4. **Health**: **`GET /api/health`** returns JSON with `ok`, `version` (short git SHA on Vercel), and `environment`.
5. **Social preview**: Dynamic **`opengraph-image`** / **`twitter-image`** (1200×630) use your **`profile`** from `data.ts`.

## Personalization

- Edit **`src/lib/data.ts`**: **`profile.name`** (used in hero, header wordmark, footer, tab title via `layout.tsx`), links, summary, skills, experience, **`certifications`**, **`readingList`**, **`nowUpdates`**, **`speakingAndWriting`**, **`openSourceHighlights`**, **`showcaseSnippet`** (engineering lab), projects.
- **Theme lab** (floating palette): accent hue presets + slider, cozy/compact density (persisted in `localStorage`). **Command palette**: press **`?`** (outside inputs) to filter-jump sections.
- **Deep link theme**: `?hue=250&accent=195&density=compact` applies on load and syncs when you change the customizer.
- **Stack fingerprint**: `?stack=Azure,.NET` on `/` filters projects (AND logic). **Impact** (`#impact`) and **Recruiter FAQ** (`#recruiter-faq`) — edit `impactRows` / `recruiterFaq` in `data.ts`.
- **Case study**: `/work/insurance-ai` — content in `insuranceAiCaseStudy`; **Konami** (↑↑↓↓←→←→BA outside inputs) shows a short toast.
- **Portfolio console** (bottom-left terminal): **`** (backtick) toggles; commands `help`, `whoami`, `open projects`, `health`, `theme dark|light`, `resume`, `joke`. **Esc** closes.
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
