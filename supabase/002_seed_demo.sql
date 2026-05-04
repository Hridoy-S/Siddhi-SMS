insert into public.app_users (
  id, role, name, company, email, phone, address, company_type, avatar, plan, balance,
  status, account_status, masking_status, bin_tax, docs, password_hash
) values
  ('admin1', 'admin', 'Siddhi Admin', 'Siddhi SMS', 'admin@siddhisms.com', '01700000000', 'Dhaka, Bangladesh', 'Agency', 'SA', 'Platform Admin', 0, 'Active', 'Approved', 'Approved', 'TIN-SIDDHI-2026', 'Company admin profile', extensions.crypt('admin123', extensions.gen_salt('bf'))),
  ('u1', 'customer', 'Tanvir Ahmed', 'Dhaka Retail Ltd.', 'owner@dhakaretail.com', '01711000001', 'Banani, Dhaka', 'E-commerce', 'DR', 'Business 50K', 184250, 'Active', 'Approved', 'Approved', 'BIN-112233, TIN-998877', 'Trade license, BIN, TIN', extensions.crypt('demo123', extensions.gen_salt('bf'))),
  ('u2', 'customer', 'Green School Admin', 'Green School', 'admin@greenschool.edu.bd', '01822000002', 'Mirpur, Dhaka', 'Education', 'GS', 'Starter 10K', 9800, 'Active', 'Approved', 'Pending', 'TIN-552211', 'School registration', extensions.crypt('demo123', extensions.gen_salt('bf'))),
  ('u3', 'customer', 'MediCare Ops', 'MediCare BD', 'ops@medicarebd.com', '01933000003', 'Dhanmondi, Dhaka', 'Healthcare', 'MB', 'Trial', 0, 'Pending approval', 'Pending', 'Not applied', null, null, extensions.crypt('demo123', extensions.gen_salt('bf')))
on conflict (id) do update set
  role = excluded.role,
  name = excluded.name,
  company = excluded.company,
  email = excluded.email,
  phone = excluded.phone,
  address = excluded.address,
  company_type = excluded.company_type,
  avatar = excluded.avatar,
  plan = excluded.plan,
  balance = excluded.balance,
  status = excluded.status,
  account_status = excluded.account_status,
  masking_status = excluded.masking_status,
  bin_tax = excluded.bin_tax,
  docs = excluded.docs;

insert into public.masking_requests (
  id, user_id, company_name, company_type, other_company_type, bin_tax, website, email, phone, documents, note, status, reviewed_by, reviewed_at
) values
  ('mr1', 'u1', 'Dhaka Retail Ltd.', 'E-commerce', '', 'BIN-112233, TIN-998877', 'https://dhakaretail.example', 'owner@dhakaretail.com', '01711000001', '["trade-license.pdf", "bin-certificate.pdf"]'::jsonb, 'Approved sender', 'Approved', 'admin1', now()),
  ('mr2', 'u2', 'Green School', 'Education', '', 'TIN-552211', '', 'admin@greenschool.edu.bd', '01822000002', '["school-registration.pdf"]'::jsonb, 'Awaiting review', 'Pending', null, null)
on conflict (id) do update set
  company_name = excluded.company_name,
  company_type = excluded.company_type,
  bin_tax = excluded.bin_tax,
  website = excluded.website,
  email = excluded.email,
  phone = excluded.phone,
  documents = excluded.documents,
  note = excluded.note,
  status = excluded.status,
  reviewed_by = excluded.reviewed_by,
  reviewed_at = excluded.reviewed_at;

insert into public.documents (id, user_id, masking_request_id, file_name, file_type, status, metadata) values
  ('doc1', 'u1', 'mr1', 'trade-license.pdf', 'application/pdf', 'Approved', '{"source":"demo"}'::jsonb),
  ('doc2', 'u1', 'mr1', 'bin-certificate.pdf', 'application/pdf', 'Approved', '{"source":"demo"}'::jsonb),
  ('doc3', 'u2', 'mr2', 'school-registration.pdf', 'application/pdf', 'Submitted', '{"source":"demo"}'::jsonb)
on conflict (id) do update set status = excluded.status, metadata = excluded.metadata;

insert into public.audiences (id, user_id, name, description) values
  ('a1', 'u1', 'New Customers', 'Recent opt-in buyers and fresh leads'),
  ('a2', 'u1', 'Old Customers', 'Repeat customers and dormant accounts'),
  ('a3', 'u2', 'Students', 'School and coaching student list'),
  ('a4', 'u2', 'Teachers', 'Faculty and admin staff')
on conflict (id) do update set name = excluded.name, description = excluded.description;

insert into public.contacts (id, user_id, audience_id, name, phone, email, consent, operator) values
  ('c1', 'u1', 'a1', 'Rahim Uddin', '01711000001', 'rahim@example.com', 'Opted in', 'GP'),
  ('c2', 'u1', 'a1', 'Nusrat Jahan', '01822000002', 'nusrat@example.com', 'Opted in', 'Robi'),
  ('c3', 'u1', 'a2', 'Farhana Akter', '01933000003', 'farhana@example.com', 'DND', 'Banglalink'),
  ('c4', 'u2', 'a3', 'Imran Hossain', '01644000004', 'imran@example.com', 'Opted in', 'Airtel'),
  ('c5', 'u2', 'a4', 'Sadia Islam', '01355000005', 'sadia@example.com', 'Opted in', 'GP')
on conflict (id) do update set
  audience_id = excluded.audience_id,
  name = excluded.name,
  phone = excluded.phone,
  email = excluded.email,
  consent = excluded.consent,
  operator = excluded.operator;

insert into public.sms_packages (id, name, type, price, rate, status) values
  ('p1', 'Starter Wallet', 'non-masking', 3500, 0.35, 'Published'),
  ('p2', 'Business Wallet', 'non-masking', 16000, 0.32, 'Published'),
  ('p3', 'Masking Wallet', 'masking', 27500, 0.55, 'Published')
on conflict (id) do update set name = excluded.name, type = excluded.type, price = excluded.price, rate = excluded.rate, status = excluded.status;

insert into public.payment_orders (id, user_id, package_id, method, trx, amount, status, credited, note, completed_at) values
  ('pay1', 'u3', 'p1', 'bKash', 'BK72811', 3500, 'Pending', false, 'Waiting for payment verification', null),
  ('pay2', 'u2', 'p2', 'Nagad', 'NG55290', 16000, 'Completed', true, 'Completed by admin', now())
on conflict (id) do update set
  user_id = excluded.user_id,
  package_id = excluded.package_id,
  method = excluded.method,
  trx = excluded.trx,
  amount = excluded.amount,
  status = excluded.status,
  credited = excluded.credited,
  note = excluded.note,
  completed_at = excluded.completed_at;

insert into public.wallet_transactions (id, user_id, order_id, type, amount, balance_after, description) values
  ('wt1', 'u1', null, 'credit', 184250, 184250, 'Demo opening wallet balance'),
  ('wt2', 'u2', 'pay2', 'credit', 16000, 9800, 'Business Wallet credited by admin'),
  ('wt3', 'u1', null, 'debit', 5365, 184250, 'April Invoice Reminder campaign demo')
on conflict (id) do update set amount = excluded.amount, balance_after = excluded.balance_after, description = excluded.description;

insert into public.sms_campaigns (id, user_id, name, type, audience_id, sender_id, message, sent, delivered, cost, status) values
  ('camp1', 'u1', 'Eid Offer Bangla', 'Promotional', 'a2', 'DHAKASHOP', 'প্রিয় {name}, ঈদ অফার চলছে।', 48200, 45691, 14460, 'Completed'),
  ('camp2', 'u1', 'April Invoice Reminder', 'Transactional', 'a1', 'DHAKASHOP', 'প্রিয় {name}, আপনার বিল বকেয়া আছে।', 15780, 15312, 5365, 'Completed'),
  ('camp3', 'u1', 'Login OTP Priority', 'OTP', 'a1', 'DHAKASHOP', 'আপনার OTP 493221।', 9210, 9164, 3315, 'Live')
on conflict (id) do update set
  name = excluded.name,
  type = excluded.type,
  audience_id = excluded.audience_id,
  sender_id = excluded.sender_id,
  message = excluded.message,
  sent = excluded.sent,
  delivered = excluded.delivered,
  cost = excluded.cost,
  status = excluded.status;

insert into public.sms_messages (id, user_id, campaign_id, type, sender_id, recipients, segments, cost, status, payload) values
  ('msg1', 'u1', 'camp2', 'transactional', 'DHAKASHOP', 15780, 1, 5365, 'Delivered', '{"channel":"sms"}'::jsonb),
  ('msg2', 'u1', 'camp3', 'otp', 'DHAKASHOP', 9210, 1, 3315, 'Delivered', '{"channel":"sms"}'::jsonb)
on conflict (id) do update set status = excluded.status, payload = excluded.payload;

insert into public.sms_templates (id, user_id, name, type, body, status) values
  ('tpl1', null, 'OTP default', 'otp', 'আপনার OTP {code}। ৫ মিনিটের মধ্যে ব্যবহার করুন।', 'Active'),
  ('tpl2', null, 'Due reminder', 'transactional', 'প্রিয় গ্রাহক, আপনার বিল বকেয়া আছে। অনুগ্রহ করে আজই পরিশোধ করুন।', 'Active')
on conflict (id) do update set body = excluded.body, status = excluded.status;

insert into public.invoices (id, user_id, client, amount, status, due_date) values
  ('INV-2026-041', 'u1', 'Dhaka Retail Ltd.', 42000, 'Paid', '2026-04-30'),
  ('INV-2026-042', 'u2', 'Green ISP', 113500, 'Due', '2026-05-15')
on conflict (id) do update set user_id = excluded.user_id, client = excluded.client, amount = excluded.amount, status = excluded.status, due_date = excluded.due_date;

insert into public.gateway_routes (id, name, type, uptime, latency, health) values
  ('route1', 'OTP Route A', 'OTP', 99.98, '4.7s', 'Healthy'),
  ('route2', 'Masking Route GP/Robi', 'Masking', 99.72, '8.2s', 'Healthy'),
  ('route3', 'Promo Low Cost', 'Promotional', 98.91, '21.5s', 'Watch')
on conflict (id) do update set name = excluded.name, type = excluded.type, uptime = excluded.uptime, latency = excluded.latency, health = excluded.health;

insert into public.platform_settings (key, value) values
  ('platform_rates', '{"nonMasking":0.30,"masking":0.48,"otp":0.34}'::jsonb),
  ('gateway_settings', '{"mode":"Manual review","bkash":"Credential required","nagad":"Credential required","smsGateway":"Sandbox route","apiBase":"http://localhost:8080/api"}'::jsonb)
on conflict (key) do update set value = excluded.value, updated_at = now();
