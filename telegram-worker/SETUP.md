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

## 5. Copy your Worker's URL
At the top of the Worker's page you'll see a URL like:
`https://gripvt-manuscript-relay.<your-subdomain>.workers.dev`
Copy it.

## 6. Point the page at it
In `GripVT.dc.html`, find this line near the top of the logic (search for `REPLACE-WITH-YOUR-WORKER`):
```
telegramWorkerUrl = 'https://REPLACE-WITH-YOUR-WORKER.workers.dev';
```
Replace the URL with the one you copied in step 5. Save.

## 7. Test it
Open the site, click "Manuscript Available on Request," fill in the form, hit **Send Request**.
You should get a Telegram message within a couple seconds. If you see an error in the
pop-up, double check the URL in step 6 and the two secrets in step 4.

## Notes
- CORS is left open (`*`) since this is a public request form with no login — the
  honeypot field blocks basic spam bots. If you want to lock it to only your domain
  later, replace `'Access-Control-Allow-Origin': '*'` in `worker.js` with your GitHub
  Pages URL.
- Free Cloudflare Workers tier covers far more requests than a portfolio site will see.
