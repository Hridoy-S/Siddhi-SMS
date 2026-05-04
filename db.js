const { supabase } = require("./supabaseClient");
const crypto = require("crypto");

const demoPasswords = new Map([
  ["admin@siddhisms.com", "admin123"],
  ["owner@dhakaretail.com", "demo123"],
  ["admin@greenschool.edu.bd", "demo123"],
  ["ops@medicarebd.com", "demo123"]
]);

function asNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function camelUser(row, maskingByUserId, documentsByRequestId = new Map()) {
  const request = maskingByUserId.get(row.id);
  const documentRows = request ? documentsByRequestId.get(request.id) || [] : [];
  const requestDocuments = documentRows.length
    ? documentRows.map(document => ({
      id: document.id,
      name: document.file_name,
      type: document.file_type || "",
      path: document.file_path || "",
      url: document.file_url || "",
      status: document.status || "Submitted",
      createdAt: document.created_at || ""
    }))
    : Array.isArray(request?.documents) ? request.documents : [];
  return {
    id: row.id,
    name: row.name,
    company: row.company,
    email: row.email,
    phone: row.phone || "",
    address: row.address || "",
    companyType: row.company_type || "E-commerce",
    avatar: row.avatar || "",
    plan: row.plan || "Trial",
    balance: asNumber(row.balance),
    status: row.status || "Pending approval",
    accountStatus: row.account_status || "Pending",
    maskingStatus: row.masking_status || "Not applied",
    binTax: row.bin_tax || "",
    docs: row.docs || "",
    createdAt: row.created_at || "",
    maskingRequest: request ? {
      companyName: request.company_name || row.company,
      companyType: request.company_type || row.company_type || "E-commerce",
      otherCompanyType: request.other_company_type || "",
      binTax: request.bin_tax || "",
      website: request.website || "",
      email: request.email || row.email,
      phone: request.phone || row.phone || "",
      documents: requestDocuments,
      note: request.note || ""
    } : null
  };
}

function requireOk(result, label) {
  if (result.error) {
    throw new Error(`${label}: ${result.error.message}`);
  }
  return result.data;
}

function rpcMissing(error) {
  return error && (
    error.code === "PGRST202" ||
    /schema cache|verify_app_login|create_customer_profile/i.test(error.message || "")
  );
}

function makePasswordHash(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(String(password), salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

function verifyPassword(row, password) {
  const stored = String(row.password_hash || "");
  if (stored.startsWith("scrypt$")) {
    const [, salt, expected] = stored.split("$");
    const actual = crypto.scryptSync(String(password), salt, 64).toString("hex");
    return crypto.timingSafeEqual(Buffer.from(actual, "hex"), Buffer.from(expected, "hex"));
  }
  return demoPasswords.get(String(row.email || "").toLowerCase()) === password;
}

function loginShape(row) {
  return {
    id: row.id,
    role: row.role,
    name: row.name,
    company: row.company,
    email: row.email,
    phone: row.phone || "",
    status: row.status || "Active",
    account_status: row.account_status || "Pending",
    masking_status: row.masking_status || "Not applied"
  };
}

async function loginAppUser(email, password) {
  const result = await supabase
    .from("app_users")
    .select("*")
    .eq("email", String(email || "").toLowerCase())
    .maybeSingle();
  requireOk(result, "Login failed");
  if (!result.data || !verifyPassword(result.data, password)) return null;
  if (String(result.data.status || "").toLowerCase() === "suspended" || result.data.account_status === "Rejected") {
    const error = new Error("Your Siddhi SMS account has been temporarily suspended after unusual or suspicious activity was detected. Please contact Siddhi SMS support to review the account and restore access.");
    error.code = "ACCOUNT_SUSPENDED";
    throw error;
  }
  return loginShape(result.data);
}

async function createCustomerAccount(form) {
  const rpcResult = await supabase.rpc("create_customer_profile", {
    p_name: form.name,
    p_company: form.company,
    p_email: form.email,
    p_phone: form.phone,
    p_address: form.address || "",
    p_company_type: form.companyType || "E-commerce",
    p_password: form.password
  });
  if (!rpcResult.error) return rpcResult.data?.[0] || null;
  if (!rpcMissing(rpcResult.error)) throw new Error(`Signup failed: ${rpcResult.error.message}`);

  const id = `u${Date.now()}`;
  const row = {
    id,
    role: "customer",
    name: form.name.trim(),
    company: form.company.trim(),
    email: form.email.trim().toLowerCase(),
    phone: form.phone.trim(),
    address: form.address || "",
    company_type: form.companyType || "E-commerce",
    avatar: String(form.company || "U").replace(/[^A-Za-z0-9]+/g, "").slice(0, 2).toUpperCase() || "U",
    plan: "Trial",
    balance: 0,
    status: "Pending approval",
    account_status: "Pending",
    masking_status: "Not applied",
    password_hash: makePasswordHash(form.password)
  };
  requireOk(await supabase.from("app_users").insert(row), "Signup failed");
  return loginShape(row);
}

async function loadAppState({ role, userId }) {
  const isAdmin = role === "admin";
  const userFilter = query => isAdmin ? query : query.eq("user_id", userId);

  const [
    userRows,
    maskingRows,
    audienceRows,
    contactRows,
    packageRows,
    paymentRows,
    campaignRows,
    invoiceRows,
    routeRows,
    settingRows,
    adminProfileRows,
    documentRows
  ] = await Promise.all([
    supabase.from("app_users").select("*").eq("role", "customer").order("created_at", { ascending: false }),
    userFilter(supabase.from("masking_requests").select("*")).order("created_at", { ascending: true }),
    userFilter(supabase.from("audiences").select("*")).order("created_at", { ascending: true }),
    userFilter(supabase.from("contacts").select("*")).order("created_at", { ascending: true }),
    supabase.from("sms_packages").select("*").order("created_at", { ascending: true }),
    userFilter(supabase.from("payment_orders").select("*")).order("created_at", { ascending: false }),
    userFilter(supabase.from("sms_campaigns").select("*")).order("created_at", { ascending: false }),
    isAdmin
      ? supabase.from("invoices").select("*").order("created_at", { ascending: false })
      : supabase.from("invoices").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    supabase.from("gateway_routes").select("*").order("created_at", { ascending: true }),
    supabase.from("platform_settings").select("*"),
    isAdmin
      ? supabase.from("app_users").select("id,name,company,email,phone,status").eq("id", userId).maybeSingle()
      : Promise.resolve({ data: null, error: null }),
    userFilter(supabase.from("documents").select("*")).order("created_at", { ascending: false })
  ]);

  const users = requireOk(userRows, "Load users");
  const masking = requireOk(maskingRows, "Load masking requests");
  const audiences = requireOk(audienceRows, "Load audiences");
  const contacts = requireOk(contactRows, "Load contacts");
  const packages = requireOk(packageRows, "Load packages");
  const payments = requireOk(paymentRows, "Load payments");
  const campaigns = requireOk(campaignRows, "Load campaigns");
  const invoices = requireOk(invoiceRows, "Load invoices");
  const routes = requireOk(routeRows, "Load routes");
  const settings = requireOk(settingRows, "Load platform settings");
  const adminProfile = requireOk(adminProfileRows, "Load admin profile");
  const documents = requireOk(documentRows, "Load documents");

  const maskingByUserId = new Map(masking.map(row => [row.user_id, row]));
  const documentsByRequestId = new Map();
  documents.forEach(document => {
    const key = document.masking_request_id || `mr-${document.user_id}`;
    if (!documentsByRequestId.has(key)) documentsByRequestId.set(key, []);
    documentsByRequestId.get(key).push(document);
  });
  const settingMap = new Map(settings.map(row => [row.key, row.value]));
  const visibleUsers = isAdmin ? users : users.filter(user => user.id === userId);

  return {
    currentUserId: isAdmin ? (users[0]?.id || userId) : userId,
    users: visibleUsers.map(row => camelUser(row, maskingByUserId, documentsByRequestId)),
    audiences: audiences.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description || ""
    })),
    contacts: contacts.map(row => ({
      id: row.id,
      name: row.name,
      phone: row.phone,
      email: row.email || "",
      audienceId: row.audience_id,
      consent: row.consent,
      operator: row.operator || ""
    })),
    packages: packages.map(row => ({
      id: row.id,
      name: row.name,
      type: row.type,
      price: asNumber(row.price),
      rate: asNumber(row.rate),
      status: row.status
    })),
    payments: payments.map(row => ({
      id: row.id,
      userId: row.user_id,
      packageId: row.package_id,
      method: row.method,
      trx: row.trx || "",
      amount: asNumber(row.amount),
      status: row.status,
      credited: Boolean(row.credited),
      note: row.note || ""
    })),
    campaigns: campaigns.map(row => ({
      id: row.id,
      name: row.name,
      type: row.type,
      audienceId: row.audience_id || "",
      senderId: row.sender_id || "",
      message: row.message || "",
      sent: asNumber(row.sent),
      delivered: asNumber(row.delivered),
      cost: asNumber(row.cost),
      status: row.status
    })),
    invoices: invoices.map(row => ({
      id: row.id,
      userId: row.user_id,
      client: row.client,
      amount: asNumber(row.amount),
      status: row.status
    })),
    routes: routes.map(row => ({
      id: row.id,
      name: row.name,
      type: row.type,
      uptime: asNumber(row.uptime),
      latency: row.latency || "",
      health: row.health
    })),
    platformRates: settingMap.get("platform_rates") || { nonMasking: 0.3, masking: 0.48, otp: 0.34 },
    rateDraft: settingMap.get("platform_rates") || { nonMasking: 0.3, masking: 0.48, otp: 0.34 },
    gatewaySettings: settingMap.get("gateway_settings") || {},
    adminProfile: adminProfile ? {
      id: adminProfile.id,
      name: adminProfile.name || "",
      company: adminProfile.company || "",
      email: adminProfile.email || "",
      phone: adminProfile.phone || "",
      newPassword: "",
      confirmPassword: ""
    } : null
  };
}

async function setUserControlStatus(userId, action) {
  const updates = action === "deactivate"
    ? { status: "Suspended", account_status: "Rejected" }
    : { status: "Active", account_status: "Approved" };
  const result = await supabase
    .from("app_users")
    .update(updates)
    .eq("id", userId)
    .eq("role", "customer")
    .select("*")
    .maybeSingle();
  requireOk(result, "Update user status");
  if (!result.data) throw new Error("Customer account not found");
  return loginShape(result.data);
}

async function deleteCustomerAccount(userId) {
  const result = await supabase
    .from("app_users")
    .delete()
    .eq("id", userId)
    .eq("role", "customer")
    .select("id,email")
    .maybeSingle();
  requireOk(result, "Delete customer account");
  if (!result.data) throw new Error("Customer account not found");
  return result.data;
}

function tokenHash(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

async function createPasswordReset(userId, baseUrl) {
  const userResult = await supabase
    .from("app_users")
    .select("id,name,email,company")
    .eq("id", userId)
    .eq("role", "customer")
    .maybeSingle();
  requireOk(userResult, "Load reset user");
  if (!userResult.data) throw new Error("Customer account not found");
  const token = crypto.randomBytes(32).toString("base64url");
  const resetUrl = `${String(baseUrl || "http://localhost:8080").replace(/\/$/, "")}/?reset=${encodeURIComponent(token)}`;
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60).toISOString();
  const resetId = `reset-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
  const emailId = `email-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
  requireOk(await supabase.from("password_reset_tokens").insert({
    id: resetId,
    user_id: userResult.data.id,
    token_hash: tokenHash(token),
    reset_url: resetUrl,
    status: "Pending",
    expires_at: expiresAt
  }), "Create password reset");
  requireOk(await supabase.from("email_outbox").insert({
    id: emailId,
    user_id: userResult.data.id,
    recipient: userResult.data.email,
    subject: "Reset your Siddhi SMS password",
    body: `Hello ${userResult.data.name},\n\nUse this secure link to reset your Siddhi SMS password:\n${resetUrl}\n\nThis link expires in 1 hour.`,
    status: "Queued",
    metadata: { resetId, resetUrl }
  }), "Queue reset email");
  return { email: userResult.data.email, resetUrl, expiresAt };
}

async function verifyPasswordReset(token) {
  const result = await supabase
    .from("password_reset_tokens")
    .select("id,user_id,status,expires_at,app_users(email,company)")
    .eq("token_hash", tokenHash(token))
    .maybeSingle();
  requireOk(result, "Verify password reset");
  if (!result.data || result.data.status !== "Pending" || new Date(result.data.expires_at).getTime() < Date.now()) {
    throw new Error("This password reset link is invalid or expired.");
  }
  return {
    userId: result.data.user_id,
    email: result.data.app_users?.email || "",
    company: result.data.app_users?.company || ""
  };
}

async function completePasswordReset(token, password) {
  if (!password || String(password).length < 6) throw new Error("Password must be at least 6 characters.");
  const reset = await verifyPasswordReset(token);
  const hashed = makePasswordHash(password);
  requireOk(await supabase.from("app_users").update({ password_hash: hashed }).eq("id", reset.userId), "Update password");
  requireOk(await supabase.from("password_reset_tokens").update({ status: "Used", used_at: new Date().toISOString() }).eq("token_hash", tokenHash(token)), "Mark reset used");
  return { ok: true, email: reset.email };
}

async function updateAdminProfile(adminId, draft) {
  const currentResult = await supabase
    .from("app_users")
    .select("id,email")
    .eq("id", adminId)
    .eq("role", "admin")
    .maybeSingle();
  requireOk(currentResult, "Load admin profile");
  if (!currentResult.data) throw new Error("Admin account not found");
  const email = String(draft.email || "").trim().toLowerCase();
  const newPassword = String(draft.newPassword || "");
  if (!email) throw new Error("Admin email is required.");
  if (email !== currentResult.data.email && !newPassword) throw new Error("Enter a new password when changing the admin email.");
  const updates = {
    name: String(draft.name || "Siddhi Admin").trim(),
    company: String(draft.company || "Siddhi SMS").trim(),
    email,
    phone: String(draft.phone || "").trim()
  };
  if (newPassword) {
    if (newPassword.length < 6) throw new Error("Admin password must be at least 6 characters.");
    updates.password_hash = makePasswordHash(newPassword);
  }
  const result = await supabase
    .from("app_users")
    .update(updates)
    .eq("id", adminId)
    .eq("role", "admin")
    .select("id,name,company,email,phone")
    .maybeSingle();
  requireOk(result, "Update admin profile");
  return result.data;
}

function ids(rows) {
  return rows.map(row => row.id).filter(Boolean);
}

async function deleteMissing(table, scopeColumn, scopeValue, keptIds) {
  let query = supabase.from(table).delete();
  if (scopeColumn) query = query.eq(scopeColumn, scopeValue);
  if (keptIds.length) query = query.not("id", "in", `(${keptIds.map(id => `"${String(id).replaceAll('"', '""')}"`).join(",")})`);
  const result = await query;
  requireOk(result, `Delete removed ${table}`);
}

async function upsertRows(table, rows, label = table, onConflict = "id") {
  if (!rows.length) return;
  requireOk(await supabase.from(table).upsert(rows, { onConflict }), `Save ${label}`);
}

function ownerForAudience(audience, state, userId) {
  if (userId) return userId;
  const contact = state.contacts.find(item => item.audienceId === audience.id);
  return contact?.userId || state.currentUserId || state.users[0]?.id;
}

async function saveAppState({ role, userId, state }) {
  const isAdmin = role === "admin";
  const ownerId = isAdmin ? null : userId;
  const allUsers = Array.isArray(state.users) ? state.users : [];
  const users = isAdmin ? allUsers : allUsers.filter(user => user.id === userId);

  for (const user of users) {
    requireOk(await supabase.from("app_users").update({
      name: user.name,
      company: user.company,
      email: user.email,
      phone: user.phone,
      address: user.address,
      company_type: user.companyType,
      avatar: user.avatar,
      plan: user.plan,
      balance: asNumber(user.balance),
      status: user.status,
      account_status: user.accountStatus,
      masking_status: user.maskingStatus,
      bin_tax: user.binTax,
      docs: user.docs
    }).eq("id", user.id), "Save users");

    if (user.maskingRequest) {
      const status = user.maskingStatus === "Approved" || user.maskingStatus === "Rejected" ? user.maskingStatus : "Pending";
      await upsertRows("masking_requests", [{
        id: `mr-${user.id}`,
        user_id: user.id,
        company_name: user.maskingRequest.companyName || user.company,
        company_type: user.maskingRequest.companyType || user.companyType || "E-commerce",
        other_company_type: user.maskingRequest.otherCompanyType || "",
        bin_tax: user.maskingRequest.binTax || user.binTax || "",
        website: user.maskingRequest.website || "",
        email: user.maskingRequest.email || user.email,
        phone: user.maskingRequest.phone || user.phone,
        documents: user.maskingRequest.documents || [],
        note: user.maskingRequest.note || "",
        status,
        reviewed_at: status === "Pending" ? null : new Date().toISOString()
      }], "masking requests");

      const documents = (user.maskingRequest.documents || [])
        .filter(document => typeof document === "object" && document !== null)
        .map(document => ({
          id: document.id || `doc-${user.id}-${crypto.randomUUID()}`,
          user_id: user.id,
          masking_request_id: `mr-${user.id}`,
          file_name: document.name || document.fileName || "Submitted document",
          file_type: document.type || document.fileType || "",
          file_path: document.path || document.filePath || "",
          file_url: document.url || document.publicUrl || "",
          status: document.status || "Submitted",
          metadata: {
            size: document.size || 0,
            source: "masking_request"
          }
        }));
      await upsertRows("documents", documents, "documents");
    }
  }

  const audiences = (state.audiences || []).map(audience => ({
    id: audience.id,
    user_id: ownerId || ownerForAudience(audience, state, userId),
    name: audience.name,
    description: audience.description || ""
  }));
  const contacts = (state.contacts || []).map(contact => {
    const audience = audiences.find(item => item.id === contact.audienceId);
    return {
      id: contact.id,
      user_id: ownerId || audience?.user_id || state.currentUserId || userId,
      audience_id: contact.audienceId,
      name: contact.name,
      phone: contact.phone,
      email: contact.email || "",
      consent: contact.consent || "Opted in",
      operator: contact.operator || ""
    };
  });
  const payments = (state.payments || []).map(payment => ({
    id: payment.id,
    user_id: payment.userId,
    package_id: payment.packageId,
    method: payment.method || "bKash",
    trx: payment.trx || "",
    amount: asNumber(payment.amount),
    status: payment.status || "Pending",
    credited: Boolean(payment.credited),
    note: payment.note || "",
    completed_at: payment.status === "Completed" ? new Date().toISOString() : null
  }));
  const campaigns = (state.campaigns || []).map((campaign, index) => ({
    id: campaign.id || `camp-${Date.now()}-${index}`,
    user_id: ownerId || state.currentUserId || userId,
    name: campaign.name,
    type: campaign.type,
    audience_id: campaign.audienceId || null,
    sender_id: campaign.senderId || state.senderId || "",
    message: campaign.message || state.smsText || "",
    sent: asNumber(campaign.sent),
    delivered: asNumber(campaign.delivered),
    cost: asNumber(campaign.cost),
    status: campaign.status || "Queued"
  }));

  await upsertRows("audiences", audiences, "audiences");
  await upsertRows("contacts", contacts, "contacts");
  await upsertRows("payment_orders", payments, "payment orders");
  await upsertRows("sms_campaigns", campaigns, "campaigns");

  if (isAdmin) {
    await upsertRows("sms_packages", (state.packages || []).map(pkg => ({
      id: pkg.id,
      name: pkg.name,
      type: pkg.type,
      price: asNumber(pkg.price),
      rate: asNumber(pkg.rate),
      status: pkg.status || "Published"
    })), "packages");
    await upsertRows("gateway_routes", (state.routes || []).map((route, index) => ({
      id: route.id || `route-${index + 1}`,
      name: route.name,
      type: route.type,
      uptime: asNumber(route.uptime),
      latency: route.latency,
      health: route.health || "Healthy"
    })), "routes");
    await upsertRows("invoices", (state.invoices || []).map(invoice => ({
      id: invoice.id,
      user_id: invoice.userId || null,
      client: invoice.client,
      amount: asNumber(invoice.amount),
      status: invoice.status || "Due"
    })), "invoices");
    await upsertRows("platform_settings", [
      { key: "platform_rates", value: state.platformRates || state.rateDraft || {} },
      { key: "gateway_settings", value: state.gatewaySettings || {} }
    ], "platform settings", "key");
  }

  const scopedUserIds = isAdmin ? users.map(user => user.id) : [userId];
  for (const scopedUserId of scopedUserIds) {
    await deleteMissing("audiences", "user_id", scopedUserId, ids(audiences.filter(row => row.user_id === scopedUserId)));
    await deleteMissing("contacts", "user_id", scopedUserId, ids(contacts.filter(row => row.user_id === scopedUserId)));
    await deleteMissing("payment_orders", "user_id", scopedUserId, ids(payments.filter(row => row.user_id === scopedUserId)));
    await deleteMissing("sms_campaigns", "user_id", scopedUserId, ids(campaigns.filter(row => row.user_id === scopedUserId)));
  }

  return { ok: true };
}

module.exports = {
  loginAppUser,
  createCustomerAccount,
  loadAppState,
  saveAppState,
  setUserControlStatus,
  deleteCustomerAccount,
  createPasswordReset,
  verifyPasswordReset,
  completePasswordReset,
  updateAdminProfile
};
