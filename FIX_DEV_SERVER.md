# Fix "Port in use" / "Unable to acquire lock"

Another Next.js dev server is already running. You have two options:

---

## Option 1: Just open the app (fastest)

The app is probably already running. **Open in your browser:**

- **http://localhost:3000**

If that doesn’t load, try:

- **http://localhost:3001**

No need to run `npm run dev` again.

---

## Option 2: Stop the old server and start fresh

1. **Stop the process using the port**  
   In PowerShell or Command Prompt, run (use the PID from the message, e.g. 25160):
   ```powershell
   taskkill /PID 25160 /F
   ```

2. **Delete the lock and cache**  
   In the project folder, delete the `.next` folder:
   - Open the project in File Explorer
   - If you don’t see `.next`, enable "Hidden items" in the View menu
   - Delete the **`.next`** folder

3. **Start the dev server again**
   ```bash
   npm run dev
   ```

4. **Open in browser:** http://localhost:3000

---

## Option 3: Use a different port (no need to kill anything)

```bash
npm run dev:port
```

Then open: **http://localhost:3002**
