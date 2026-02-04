# Deploy OwnGCC Hiring to Vercel

Follow these steps to deploy your project on Vercel.

---

## Step 1: Push your code to GitHub

Vercel deploys from a Git repository. If your project is not on GitHub yet:

### 1.1 Create a GitHub account (if you don’t have one)

- Go to [github.com](https://github.com) and sign up.

### 1.2 Create a new repository on GitHub

1. Click **“+”** (top right) → **“New repository”**.
2. Name it (e.g. `owngcc-hiring`).
3. Choose **Public**.
4. Do **not** check “Add a README” (you already have code).
5. Click **“Create repository”**.

### 1.3 Push your project from your computer

Open **PowerShell** or **Command Prompt** in your project folder and run:

```powershell
cd "C:\Users\DEVRAJ SRIVASTAW\Desktop\owngcc hiring\owngcc-hiring"

git init
git add .
git commit -m "Initial commit - OwnGCC Talent Center"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Replace **YOUR_USERNAME** with your GitHub username and **YOUR_REPO_NAME** with the repo name (e.g. `owngcc-hiring`).

If Git asks for login, use your GitHub username and a **Personal Access Token** (not your password). Create one at: GitHub → Settings → Developer settings → Personal access tokens.

---

## Step 2: Sign in to Vercel

1. Go to [vercel.com](https://vercel.com).
2. Click **“Sign Up”** or **“Log In”**.
3. Choose **“Continue with GitHub”** and authorize Vercel to access your GitHub account.

---

## Step 3: Import and deploy the project

1. On the Vercel dashboard, click **“Add New…”** → **“Project”**.
2. You’ll see a list of your GitHub repositories. Find **owngcc-hiring** (or your repo name) and click **“Import”**.
3. **Configure Project** (usually you can leave defaults):
   - **Framework Preset:** Next.js (auto-detected).
   - **Root Directory:** Leave as `.` (project root).
   - **Build Command:** `npm run build` (default).
   - **Output Directory:** Leave default.
   - **Install Command:** `npm install` (default).
4. Click **“Deploy”**.
5. Wait 1–2 minutes. Vercel will run `npm install` and `npm run build`, then deploy.

---

## Step 4: Open your live site

When the deployment finishes:

- You’ll see a **“Congratulations!”** message and a link like:  
  **https://owngcc-hiring-xxxxx.vercel.app**
- Click **“Visit”** or copy that URL to open your app in the browser.

That URL is your live deployment. You can share it with anyone.

---

## Optional: Custom domain

1. In the Vercel project, go to **Settings** → **Domains**.
2. Add your domain (e.g. `hiring.owngcc.com`) and follow the DNS instructions Vercel shows.

---

## Optional: Environment variables

Your app uses only frontend state and mock data, so you usually **don’t need** any environment variables. If you add an API key or similar later:

1. In the Vercel project, go to **Settings** → **Environment Variables**.
2. Add each variable (e.g. name + value) and redeploy.

---

## Troubleshooting

| Issue | What to do |
|-------|------------|
| Build fails | Check the build log on Vercel. Fix any TypeScript or build errors locally with `npm run build`. |
| “Module not found” | Ensure all imports and file paths are correct and that you pushed the latest code to GitHub. |
| Blank or wrong page | Hard refresh (Ctrl+Shift+R). If you use client-side state (e.g. localStorage), that’s normal on first visit. |

---

## Summary

1. Push project to GitHub (`git init`, `add`, `commit`, `remote`, `push`).
2. Sign in to Vercel with GitHub.
3. Import the repo → Deploy (default settings are fine).
4. Use the **Visit** link as your live URL.

Your app is frontend-only, so no database or server config is needed on Vercel.
