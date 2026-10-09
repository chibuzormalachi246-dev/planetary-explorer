# Kinetic / Core — Planetary Tour

This is the editable React + TypeScript + Vite source project for the interactive solar-system experience.

## Publish on Netlify (recommended)
1. Upload this ZIP to a new GitHub repository (extract it first; upload the project files, not the ZIP itself).
2. In Netlify, choose **Add new site → Import an existing project** and connect the GitHub repository.
3. Set **Build command** to `npm run build` and **Publish directory** to `dist`. The included `netlify.toml` already defines these settings.
4. Click **Deploy**. Netlify will build the project and give you a public `*.netlify.app` address.

## Publish on Vercel
1. Extract the ZIP and upload the project to a GitHub repository.
2. Import that repository in Vercel.
3. Use the Vite framework preset, build command `npm run build`, and output directory `dist`. The included `vercel.json` defines the output and SPA rewrite.

## Run locally
Requires Node.js 20.19+ or 22.12+. Run `npm install`, then `npm run dev`. To make a production build, run `npm run build`; the deployable site is created in `dist/`.

## Important
This is the source project, not a prebuilt `dist` folder. Netlify's manual drag-and-drop deploy expects the built `dist` contents, so use the GitHub import flow above unless you build the project first. Hosting the site does not automatically generate income; ads, affiliate links, sponsorships, or paid features must be set up separately.
