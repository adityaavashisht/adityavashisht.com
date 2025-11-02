# adityavashisht.com

A single-page personal site built with Next.js 16 that showcases who I am, what I’m currently listening to, and where I’ve been working—all wrapped in a dark, tactile UI with subtle motion.

## Overview

This repo powers [adityavashisht.com](https://adityavashisht.com), a mobile-first personal site with:

- **About**: quick intro, location, and hero image.
- **Spotify Card**: shows what I’m listening to right now (or my latest track if I’m offline).
- **Experience Timeline**: chronological highlights from my recent roles.
- **Footer**: social links plus real-time visitor geolocation.

## Key Features

- **Live Spotify integration** using server actions (`app/utils/spotify.ts`) and the Spotify Web API, with blur-up album art via `@plaiceholder/next`.
- **Visitor geolocation** through a Vercel Edge Function (`app/api/geolocation/route.ts`) so the footer greets each visitor by city.
- **Deployed on Vercel** with analytics provided by `@vercel/analytics`.

## Tech Stack

- Next.js 16 (App Router) & React 19
- TypeScript 5
- Tailwind CSS 3
- Vercel Analytics & Edge Functions
- Spotify Web API
- `@plaiceholder/next` + `sharp` for blur placeholders

> Recommended Node.js version: **18.18+** (Node 20 works too).

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to view the site. ESLint runs in strict mode; keep `npm run lint` clean before pushing.

Available scripts (`package.json`):

- `npm run dev` – start the local dev server
- `npm run build` – create a production build
- `npm run start` – run the production server locally
- `npm run lint` – lint the entire project

## Environment Variables

Create `.env.local` and add:

```bash
SPOTIFY_CLIENT_ID=your-client-id
SPOTIFY_CLIENT_SECRET=your-client-secret
SPOTIFY_REFRESH_TOKEN=your-refresh-token
```

### Getting Spotify credentials

1. Create a Spotify app at [developer.spotify.com](https://developer.spotify.com/dashboard/).
2. Add `http://localhost:3000/api/auth/callback` (or your production URL) as a Redirect URI.
3. Grab the **Client ID** and **Client Secret**.
4. Exchange the app credentials for a refresh token (one-time):
   ```bash
   curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Authorization: Basic $(echo -n CLIENT_ID:CLIENT_SECRET | base64)" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=authorization_code&code=AUTH_CODE&redirect_uri=REDIRECT_URI"
   ```
   Save the `refresh_token` from the response into `.env.local`.

## Project Structure

```
app/
  components/
    About.tsx
    Spotify.tsx
    Experience.tsx
    Footer.tsx
    ...               # UI primitives (TrackCard, AudioWave, Speaker, etc.)
  utils/
    data/work.ts      # Work history data source
    spotify.ts        # Server-side Spotify helpers
    api.ts            # Client helper for geolocation fetch
  api/geolocation/
    route.ts          # Vercel Edge geolocation endpoint
  page.tsx            # Renders the landing sections
  layout.tsx          # Root layout, typography, analytics
public/
  me.jpeg             # Hero image
tailwind.config.ts
```

## Customization

- **Work history**: edit `app/utils/data/work.ts`.
- **Social links**: update the `socials` array in `app/components/Footer.tsx`.
- **Profile image**: replace `public/me.jpeg` (keep the same filename or update the import in `About.tsx`).
- **Spotify styling/content**: tweak `app/components/Trackcard.tsx` and `app/components/Spotify.tsx`.
- **Animations & palette**: adjust CSS variables or keyframes in `app/globals.css`.
- **New sections**: add components under `app/components/` and include them in `app/page.tsx` (e.g., Projects, Blog roll).

## Deployment

Deploying to [Vercel](https://vercel.com) is the smoothest path:

1. Push the repo to GitHub.
2. Create a new Vercel project and connect the repo.
3. Add the Spotify env vars in the Vercel dashboard.
4. Trigger the first deploy.

Geolocation relies on Vercel’s edge `geolocation` helper, so you’ll only see real visitor info when running on Vercel (locally it will return placeholder data).
