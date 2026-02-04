# OwnGCC Talent Center

A clean, professional, client-ready frontend demo for a hiring platform. **Frontend only** — uses mock data and local state; no backend or database.

## Tech stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- No authentication, no database

## Run locally

```bash
npm install
npm run dev
```

Open in your browser: **http://localhost:3000**

### If the app won’t open

1. **“Port 3000 is in use” or “Unable to acquire lock”**  
   Another dev server may be running. Either:
   - Open **http://localhost:3000** (or **http://localhost:3001** if it switched port) in your browser, or  
   - Close any other terminal/tab where you ran `npm run dev`, then run again:
     ```bash
     npm run dev
     ```
2. **Use a different port** (e.g. if 3000 is blocked):
   ```bash
   npm run dev:port
   ```
   Then open **http://localhost:3002**
3. **Stuck or weird errors**  
   Delete the build cache and restart:
   ```bash
   rmdir /s /q .next
   npm run dev
   ```
   Then open **http://localhost:3000**

## Application flow

1. **Landing** — OwnGCC branding, “How it works” (3 steps), **Start Hiring** CTA  
2. **Company requirements** — Conversational form, one question at a time (company name, location, contact, email). Step 1 of 5  
3. **Role & skills** — Role, headcount, experience level; skill suggestions by role (e.g. Frontend Developer → React, JavaScript, HTML, CSS). Edit/remove skills. Step 2 of 5  
4. **Working preferences** — Preferred hours (India / US / UK), interview mode (Video / Audio), joining timeline. Step 3 of 5  
5. **Budget & engagement** — Optional budget, engagement type (Full-time / Contract), optional note. Step 4 of 5  
6. **Completion** — Generated access code (e.g. GCC-9X28A), copy button, “This code has been sent to your email,” **Access Talent Dashboard**  
7. **Code verification** — Paste code; validated against the generated code; on success → dashboard  
8. **Talent dashboard** — Mock candidate cards (name, role, skills, experience, availability). **Shortlist** and **Request Interview**. Demo data banner shown  

## Design

- Theme inspired by [owngcc.com](https://owngcc.com): deep blue/slate, white, gray
- Clean spacing, modern typography, minimal UI
- Progress indicator “Step X of 5” on form steps

## Project structure

- `src/app/` — Pages (landing, start, role, preferences, budget, complete, access, dashboard)
- `src/components/` — `FlowProvider` (form state), `ProgressShell` (layout + progress), `ui/Card`
- `src/lib/dummyData.ts` — Mock candidates and access code generator

All logic is client-side; form state is persisted in `localStorage` via `FlowProvider`.
