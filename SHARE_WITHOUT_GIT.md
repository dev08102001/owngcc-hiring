# How to share this project without using Git

## Step 1: Prepare the folder to zip

Do **not** include `node_modules` and `.next` (they are large and will be recreated on the other side).

**Option A – Using File Explorer (Windows):**
1. Copy the entire project folder (e.g. `owngcc-hiring`) to a new location (e.g. Desktop).
2. Open the **copied** folder and delete:
   - `node_modules` (folder)
   - `.next` (folder, if it exists)
3. Right-click the copied folder → **Send to** → **Compressed (zipped) folder**.
4. You will get a `.zip` file (e.g. `owngcc-hiring.zip`).

**Option B – Using PowerShell (Windows):**
1. Open PowerShell and go to the **parent** of your project folder, e.g.:
   ```powershell
   cd "C:\Users\YourName\Desktop\owngcc hiring"
   ```
2. Run (this creates a zip excluding node_modules and .next):
   ```powershell
   Compress-Archive -Path * -DestinationPath ..\owngcc-hiring-share.zip -Force
   ```
   Then manually remove node_modules and .next from the path, or create a copy without them first and then zip that copy.

Easiest is **Option A**: copy folder → delete `node_modules` and `.next` in the copy → zip the copy.

---

## Step 2: Share the zip

Upload the zip file to any of these and send the link to the other person:

- **Google Drive** – Upload file → Right-click → Get link → Share
- **OneDrive** – Upload → Share → Copy link
- **WeTransfer** – [wetransfer.com](https://wetransfer.com) – Upload zip, enter their email or get link
- **Email** – Attach the zip if it’s under your email size limit (often 25 MB)

---

## Step 3: What the other person should do

Send them these instructions:

1. **Download** the zip and **extract** it to a folder (e.g. `owngcc-hiring`).
2. **Open terminal/command prompt** in that folder:
   - Windows: Open the folder in File Explorer, type `cmd` in the address bar and press Enter, or right-click inside the folder → “Open in Terminal” if available.
3. **Install and run:**
   ```bash
   npm install
   npm run dev
   ```
4. **Open in browser:**  
   Go to **http://localhost:3000**

They need **Node.js** installed. If they don’t have it: [nodejs.org](https://nodejs.org) – download and install the LTS version, then run the steps above again.
