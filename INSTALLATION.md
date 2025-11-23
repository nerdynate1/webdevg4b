Star Catering — Installation and Running Guide
=============================================

This document explains what you need to install to run the app locally and how to start the development server or a production build.

Deploy to Vercel
-----------------
You can deploy this Next.js app to Vercel in a few minutes. No environment variables are required.

Option A — Import from Git (recommended)
1. Push this project to a Git provider (GitHub, GitLab, or Bitbucket).
2. Go to https://vercel.com/new and click "Import Project".
3. Select your repository.
4. Vercel will auto‑detect the framework as Next.js. Use the defaults:
   - Framework Preset: Next.js
   - Build Command: next build (default)
   - Install Command: npm install (default)
   - Output: .vercel/output (handled automatically by Next.js on Vercel)
5. Click Deploy. Your app will get a preview URL. Promote to Production when ready.

Option B — Vercel CLI
1. Install the CLI (one‑time):
   npm i -g vercel
2. From the project root, run and follow prompts:
   vercel
3. For a production deployment:
   vercel --prod

Notes for Vercel
- Node.js version: Vercel will use a compatible Node runtime automatically; the project develops on 24.11.1 locally. No special config needed.
- Environment variables: none required for this demo (payments are simulated).
- Custom domains: add them in Vercel Project Settings → Domains.

Troubleshooting on Vercel
- Build failed quickly after install step:
  - Try clearing the cache in Project Settings → Deployments → "Clear Cache and Redeploy".
  - Ensure package.json contains valid scripts (it does: build/start/dev).
- Mismatch between local and deployed behavior:
  - Make sure any uncommitted files are pushed to your Git repo before deploying.

Prerequisites
-------------
- Node.js: 24.11.1 (see .nvmrc)
  - Recommended: Use nvm to match the exact version.
- npm: comes with Node.js (npm v10+ is fine)
- Git: optional, for cloning the repository

Install Node.js
---------------
Option A — Using nvm (recommended)
1. Install nvm
   - macOS/Linux: https://github.com/nvm-sh/nvm
   - Windows: https://github.com/coreybutler/nvm-windows
2. In the project folder, run:
   nvm install
   nvm use
   This will read .nvmrc and switch to Node 24.11.1.

Option B — Direct installer
- Download Node.js 24.11.1 from https://nodejs.org/en/download/prebuilt-installer
- Verify version:
  node -v  (should print v24.11.1)
  npm -v

Project Setup
-------------
1. Clone or download the repository
   git clone <repo-url>
   cd Catering

2. Select the Node.js version (if using nvm)
   nvm use

3. Install dependencies
   npm install

Run the Application
-------------------
Development (hot reload):
- Start the dev server:
  npm run dev
- Open your browser at:
  http://localhost:3000

Production build locally:
1. Build the app:
   npm run build
2. Start the production server:
   npm start
3. Open:
   http://localhost:3000

Notes
-----
- This is a Next.js App Router project using Tailwind CSS and shadcn/ui-style components.
- Payments are simulated via a mock API endpoint. No real API keys or .env configuration are required.
- Supported routes include: /, /contact, /venues, /faq, /occasions, /checkout

Troubleshooting
---------------
- Port already in use (EADDRINUSE):
  Another process is using port 3000. Either stop it or set PORT to a different value when starting the app:
  PORT=3001 npm run dev

- Node.js version mismatch:
  If you see errors related to Node features or npm, ensure you are using Node 24.11.1. With nvm:
  nvm use

- Clean reinstall:
  rm -rf node_modules package-lock.json
  npm install
