# Siddhi SMS Supabase Local Testing

## 1. Apply SQL in Supabase

Run these files in your Supabase SQL editor, in this order:

1. `supabase/001_schema.sql`
2. `supabase/002_seed_demo.sql`

The app uses the service role key only on the local Node server. Do not paste `SUPABASE_SERVICE_ROLE_KEY` into browser code.

## 2. Start the app

```bash
npm start
```

Open:

```text
http://localhost:8080/
```

## 3. Demo logins

Admin portal:

```text
admin@siddhisms.com
admin123
```

Customer portal:

```text
owner@dhakaretail.com
demo123
```

Extra demo customer accounts:

```text
admin@greenschool.edu.bd / demo123
ops@medicarebd.com / demo123
```

## 4. What to test

- Customer login, profile save, masking request submission, audience/contact create/edit/delete, CSV/XLSX import, quick SMS wallet deduction, campaign queueing, package order creation, billing views.
- Admin login, account approval, masking approval/rejection, package create/edit/delete, rate publishing, payment/order edit and completion, user/audience/campaign/billing views.
- Supabase health endpoint:

```text
http://localhost:8080/api/health/supabase
```

## 5. Important note

The SQL files are reviewable before you run them. Until they are applied to your Supabase project, database login and state loading routes will return table/function errors.
