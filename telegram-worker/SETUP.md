# Manuscript-request relay — setup

Connects the "Request the Manuscript" pop-up on GripVT.dc.html to your Telegram
without exposing your bot token on GitHub Pages. Takes ~10 minutes, no terminal needed.

## 1. Create a Cloudflare account
Go to https://dash.cloudflare.com/sign-up and sign up (free tier is enough).

## 2. Create the Worker
1. In the dashboard sidebar: **Workers & Pages** → **Create**.
2. Choose **Create Worker**, give it a name (e.g. `manuscript-relay` — this Worker is shared across all projects' manuscript-request forms), click **Deploy**.
   This creates a placeholder "Hello World" worker — that's fine, you'll replace it.

## 3. Paste the relay code
1. Click **Edit code** on your new Worker.
2. Select all the placeholder code and delete it.
3. Paste the full contents of `worker.js` (in this same folder) in its place.
4. Click **Save and deploy**.

## 4. Add your secrets
Your bot token and chat ID stay private here — never in the page's code.
1. Go to your Worker's **Settings** → **Variables and Secrets**.
2. Add a variable named `BOT_TOKEN` → paste the token BotFather gave you → mark it **Encrypt**.
3. Add a variable named `CHAT_ID` → paste your numeric Telegram chat ID → mark it **Encrypt**.
4. Save.

## 5. Add the rate-limit binding
Caps how often the same visitor can submit, on top of the honeypot.
1. Go to your Worker's **Settings** → **Bindings** → **Add**.
2. Choose **Rate Limiting**.
3. Name the binding `RATE_LIMITER` (the code looks for this exact name).
4. Set the limit to 5 requests per visitor, over the shortest period the dashboard
   offers that's closest to an hour — the exact period options depend on what
   Cloudflare's UI shows at the time, pick the closest fit.
5. Save. (If this binding type isn't available on your account, the Worker still
   works fine without it — it's guarded in the code — you'd just be relying on the
   honeypot alone until it is.)

## 6. Copy your Worker's URL
At the top of the Worker's page you'll see a URL like:
`https://manuscript-relay.<your-subdomain>.workers.dev`
Copy it.

## 7. Point the page at it
In `js/config.js` (repo root), find this line:
```
const TELEGRAM_WORKER_URL = 'https://REPLACE-WITH-YOUR-WORKER.workers.dev';
```
Replace the URL with the one you copied in step 6. Save.

## 8. Test it
Open `gripvt.html` or `testing-rig.html`, click "Manuscript Available on Request,"
fill in the form, hit **Send Request**. You should get a Telegram message within a
couple seconds. If you see an error in the pop-up, double check the URL in step 7
and the two secrets in step 4.

## Notes
- CORS is left open (`*`) since this is a public request form with no login — the
  honeypot field and the rate-limit binding are the spam gates. If you want to lock
  it to only your domain later, replace `'Access-Control-Allow-Origin': '*'` in
  `worker.js` with your GitHub Pages URL.
- The Worker validates field lengths and email format server-side too (not just in
  the page's JS), so a request sent straight to the Worker URL (bypassing the page)
  still gets rejected if it's malformed.
- Free Cloudflare Workers tier covers far more requests than a portfolio site will see.
