# Siddhi SMS

A Bangladesh-focused bulk SMS SaaS starter with landing page, admin console, customer portal, wallet billing, masking approval, audience import, quick send, campaign send, API docs and a plain Node.js backend starter.

## Run as a website plus API

```powershell
node server.js
```

Open:

```text
http://localhost:8080
```

The old local static mode still works by opening `index.html`, but revenue/live mode should use `node server.js` so API, orders, wallet deduction and webhooks are available.

## Demo access

- Admin: `admin@siddhisms.com` / `admin123`
- User: `owner@dhakaretail.com` / any non-empty password
- Demo customer API key: `sk_live_demo_2026`
- Demo admin API key: `admin_live_change_me`

Change these before deployment.

## Included API routes

- `GET /api/health`
- `GET /api/packages`
- `POST /api/auth/signup`
- `POST /api/orders`
- `POST /api/admin/orders/:id/complete`
- `POST /api/messages/send`
- `POST /api/payments/webhook`

Example SMS request:

```bash
curl -X POST http://localhost:8080/api/messages/send \
  -H "Authorization: Bearer sk_live_demo_2026" \
  -H "Content-Type: application/json" \
  -d "{\"userId\":\"u1\",\"type\":\"non-masking\",\"sender_id\":\"DHAKASHOP\",\"message\":\"Hello {name}\",\"recipients\":10}"
```

## Payment system

The app supports the revenue flow now:

1. Customer chooses a wallet package.
2. Order is created for the package price.
3. Admin completes the order after payment verification, or a verified payment webhook completes it.
4. Wallet balance is credited once.
5. SMS sending deducts wallet balance by live admin rate, message type, segment count and recipients.

The server includes bKash/Nagad adapter boundaries and webhook handling, but real automatic checkout requires your official merchant credentials. Put credentials in environment variables based on `.env.example`; do not place live secrets in browser JavaScript.

## Before real launch

- Add official bKash/Nagad merchant credentials and replace mock/manual gateway logic with their live create/execute/search payment calls.
- Add your SMS provider/SMPP/HTTP gateway credentials.
- Move `data-store.json` to a real database such as PostgreSQL or MySQL.
- Add HTTPS, domain, backups, audit logs, rate limits and proper password hashing.
- Review BTRC/A2P, consent, DND, sender ID and promotional SMS compliance with a telecom/legal advisor.
