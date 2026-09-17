// Cloudflare Worker: relays the manuscript-request form to your Telegram bot.
// Paste this into the Cloudflare dashboard's "Edit code" editor for your Worker.
// See SETUP.md in this folder for step-by-step deploy instructions.

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    if (request.method !== 'POST') {
      return json({ ok: false, error: 'Method not allowed' }, 405, corsHeaders);
    }

    // Rate limit: configured on the RATE_LIMITER binding (Settings -> Bindings).
    // Guarded so the Worker still works before that binding is added.
    if (env.RATE_LIMITER) {
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      const { success } = await env.RATE_LIMITER.limit({ key: ip });
      if (!success) {
        return json({ ok: false, error: 'Too many requests' }, 429, corsHeaders);
      }
    }

    let data;
    try {
      data = await request.json();
    } catch (e) {
      return json({ ok: false, error: 'Invalid request body' }, 400, corsHeaders);
    }

    // Honeypot: real visitors never fill this hidden field. Bots that do get a
    // fake success so they stop retrying, without ever reaching Telegram.
    if (data.website) {
      return json({ ok: true }, 200, corsHeaders);
    }

    const name = (data.name || '').trim();
    const affiliation = (data.affiliation || '').trim();
    const email = (data.email || '').trim();
    const purpose = (data.purpose || '').trim();
    const project = (data.project || 'Portfolio site').trim();

    if (!name || !affiliation || !email) {
      return json({ ok: false, error: 'Missing required fields' }, 400, corsHeaders);
    }

    const MAX_LEN = { name: 50, affiliation: 100, email: 200, project: 200, purpose: 200 };
    if (name.length > MAX_LEN.name || affiliation.length > MAX_LEN.affiliation ||
        email.length > MAX_LEN.email || project.length > MAX_LEN.project ||
        purpose.length > MAX_LEN.purpose) {
      return json({ ok: false, error: 'Field too long' }, 400, corsHeaders);
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return json({ ok: false, error: 'Invalid email' }, 400, corsHeaders);
    }

    const text = [
      `📄 New Manuscript Request — ${project}`,
      '',
      `Name: ${name}`,
      `Affiliation: ${affiliation}`,
      `Email: ${email}`,
      `Purpose: ${purpose || '(none given)'}`
    ].join('\n');

    const tgResp = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: env.CHAT_ID, text })
    });

    if (!tgResp.ok) {
      return json({ ok: false, error: 'Telegram delivery failed' }, 502, corsHeaders);
    }
    return json({ ok: true }, 200, corsHeaders);
  }
};

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), { status, headers: { ...headers, 'Content-Type': 'application/json' } });
}
