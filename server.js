try {
  require("dotenv").config();
} catch {
  const fs = require("fs");
  const path = require("path");
  const envPath = path.join(__dirname, ".env");
  if (fs.existsSync(envPath)) {
    fs.readFileSync(envPath, "utf8").split(/\r?\n/).forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (!match || match[1].startsWith("#")) return;
      const value = String(match[2] || "").replace(/^['"]|['"]$/g, "");
      if (process.env[match[1]] === undefined) process.env[match[1]] = value;
    });
  }
}

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { supabase, testSupabaseConnection } = require("./supabaseClient");
const {
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
} = require("./db");

const PORT = Number(process.env.PORT || 8080);
const DATA_FILE = path.join(__dirname, "data-store.json");
const PUBLIC_DIR = __dirname;
const UPLOAD_DIR = path.join(__dirname, "uploads", "masking-documents");
const COMPANY_DOCUMENTS_BUCKET = "company-documents";
const ADMIN_KEY = process.env.ADMIN_API_KEY || "admin_live_change_me";
const CUSTOMER_API_KEY = process.env.CUSTOMER_API_KEY || "sk_live_demo_2026";
const WEBHOOK_SECRET = process.env.PAYMENT_WEBHOOK_SECRET || "webhook_change_me";
let memoryStore = null;

const seed = {
  users: [
    { id: "u1", name: "Tanvir Ahmed", company: "Dhaka Retail Ltd.", email: "owner@dhakaretail.com", phone: "01711000001", balance: 184250, accountStatus: "Approved", maskingStatus: "Approved" },
    { id: "u2", name: "Green School Admin", company: "Green School", email: "admin@greenschool.edu.bd", phone: "01822000002", balance: 9800, accountStatus: "Approved", maskingStatus: "Pending" }
  ],
  packages: [
    { id: "p1", name: "Starter Wallet", type: "non-masking", price: 3500, rate: 0.35, status: "Published" },
    { id: "p2", name: "Business Wallet", type: "non-masking", price: 16000, rate: 0.32, status: "Published" },
    { id: "p3", name: "Masking Wallet", type: "masking", price: 27500, rate: 0.55, status: "Published" }
  ],
  rates: { nonMasking: 0.3, masking: 0.48, otp: 0.34 },
  orders: [],
  messages: []
};

function readStore() {
  if (memoryStore) return memoryStore;
  if (!fs.existsSync(DATA_FILE)) {
    memoryStore = structuredClone(seed);
    writeStore(memoryStore);
    return memoryStore;
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function writeStore(data) {
  memoryStore = data;
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.warn(`Using in-memory store because ${DATA_FILE} is not writable: ${error.message}`);
  }
}

function sendJson(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-admin-key, x-webhook-secret",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, OPTIONS"
  });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", chunk => {
      raw += chunk;
      if (raw.length > 25_000_000) {
        req.destroy();
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
  });
}

function safeFileName(value) {
  const cleaned = path.basename(String(value || "document").replace(/[^\w.\- ]+/g, "_")).trim();
  return cleaned || "document";
}

let storageBucketReady = false;

async function ensureCompanyDocumentsBucket() {
  if (storageBucketReady) return;
  const { error } = await supabase.storage.createBucket(COMPANY_DOCUMENTS_BUCKET, { public: false });
  if (error && !/already exists|Duplicate/i.test(error.message || "")) throw error;
  storageBucketReady = true;
}

async function uploadMaskingDocument(body) {
  if (!body.userId || !body.fileName || !body.dataUrl) throw new Error("userId, fileName and dataUrl required");
  const match = String(body.dataUrl).match(/^data:([^;]+);base64,(.+)$/);
  if (!match) throw new Error("Invalid document data");
  const [, mimeType, base64] = match;
  const buffer = Buffer.from(base64, "base64");
  if (!buffer.length) throw new Error("Empty document");
  if (buffer.length > 12_000_000) throw new Error("Document file is too large");
  await ensureCompanyDocumentsBucket();
  const documentId = `doc-${crypto.randomUUID()}`;
  const fileName = safeFileName(body.fileName);
  const storagePath = `${safeFileName(body.userId)}/${Date.now()}-${fileName}`;
  const upload = await supabase.storage
    .from(COMPANY_DOCUMENTS_BUCKET)
    .upload(storagePath, buffer, { contentType: body.fileType || mimeType, upsert: false });
  if (upload.error) throw upload.error;
  const signed = await supabase.storage.from(COMPANY_DOCUMENTS_BUCKET).createSignedUrl(storagePath, 60 * 10);
  if (signed.error) throw signed.error;
  const maskingRequestId = body.maskingRequestId || `mr-${body.userId}`;
  const row = {
    id: documentId,
    user_id: body.userId,
    masking_request_id: maskingRequestId,
    file_name: fileName,
    file_type: body.fileType || mimeType,
    file_path: storagePath,
    file_url: "",
    status: "Submitted",
    metadata: { size: Number(body.size || buffer.length), bucket: COMPANY_DOCUMENTS_BUCKET }
  };
  const dbResult = await supabase.from("documents").upsert(row, { onConflict: "id" });
  if (dbResult.error) throw dbResult.error;
  return {
    id: documentId,
    name: fileName,
    type: row.file_type,
    size: Number(body.size || buffer.length),
    path: storagePath,
    url: signed.data.signedUrl,
    status: "Submitted"
  };
}

async function resolveMaskingDocument({ userId, fileName, documentId, viewerRole, viewerId }) {
  let query = supabase.from("documents").select("*");
  if (documentId) query = query.eq("id", documentId);
  else query = query.eq("user_id", userId).eq("file_name", fileName).order("created_at", { ascending: false });
  const result = await query.limit(1).maybeSingle();
  if (result.error) throw result.error;
  const document = result.data;
  if (!document) return null;
  const isAdmin = viewerRole === "admin";
  const isOwner = viewerId && viewerId === document.user_id;
  if (!isAdmin && !isOwner) {
    const error = new Error("Document access denied");
    error.statusCode = 403;
    throw error;
  }
  if (!document.file_path) return document.file_url || null;
  const signed = await supabase.storage.from(COMPANY_DOCUMENTS_BUCKET).createSignedUrl(document.file_path, 60 * 10);
  if (signed.error) throw signed.error;
  return signed.data.signedUrl;
}

function requireAdmin(req, res) {
  if (req.headers["x-admin-key"] !== ADMIN_KEY) {
    sendJson(res, 401, { error: "Admin API key required" });
    return false;
  }
  return true;
}

function requireCustomer(req, res) {
  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (token !== CUSTOMER_API_KEY) {
    sendJson(res, 401, { error: "Customer bearer API key required" });
    return false;
  }
  return true;
}

function smsRate(type, rates) {
  if (type === "otp") return rates.otp;
  if (type === "masking") return rates.masking;
  return rates.nonMasking;
}

function smsSegments(text) {
  const hasBangla = /[\u0980-\u09FF]/.test(String(text || ""));
  const length = [...String(text || "")].length;
  const single = hasBangla ? 70 : 160;
  const multi = hasBangla ? 67 : 153;
  return length <= single ? 1 : Math.ceil(length / multi);
}

function creditOrder(store, order) {
  const user = store.users.find(item => item.id === order.userId);
  if (!user || order.credited) return false;
  user.balance += Number(order.amount || 0);
  order.status = "Completed";
  order.credited = true;
  order.completedAt = new Date().toISOString();
  return true;
}

function publicFile(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const cleanPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const decodedPath = decodeURIComponent(cleanPath);
  const filePath = path.normalize(path.join(PUBLIC_DIR, decodedPath));
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }
  if (cleanPath === "/assets/siddhi-sms-logo.png") {
    const localLogoCandidates = [
      path.join(process.env.USERPROFILE || process.env.HOME || __dirname, "Downloads", "SiddhiSMS.png"),
      "C:\\Users\\biswa\\Downloads\\SiddhiSMS.png"
    ];
    const localLogo = localLogoCandidates.find(candidate => fs.existsSync(candidate));
    if (localLogo) {
      res.writeHead(200, { "Content-Type": "image/png", "Cache-Control": "no-store" });
      return fs.createReadStream(localLogo).pipe(res);
    }
  }
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404);
    return res.end("Not found");
  }
  const ext = path.extname(filePath);
  const contentTypes = { ".html": "text/html", ".css": "text/css", ".js": "application/javascript", ".json": "application/json", ".pdf": "application/pdf", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".doc": "application/msword", ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document" };
  res.writeHead(200, {
    "Content-Type": contentTypes[ext] || "application/octet-stream",
    "Content-Disposition": "inline"
  });
  fs.createReadStream(filePath).pipe(res);
}

function createGatewayIntent(order, method) {
  const gateway = String(method || "").toLowerCase();
  const base = process.env.PUBLIC_BASE_URL || `http://localhost:${PORT}`;
  if (process.env.ENABLE_PAYMENT_MOCK === "true") {
    return {
      mode: "mock",
      checkoutUrl: `${base}/checkout/mock?order=${encodeURIComponent(order.id)}&gateway=${encodeURIComponent(gateway)}`,
      message: "Mock checkout URL created. Replace with real gateway create-payment call before live money."
    };
  }
  if (gateway === "bkash" || gateway === "nagad") {
    return {
      mode: "manual",
      checkoutUrl: null,
      message: `${method} merchant credentials are not active. Use manual TRX review or set live gateway credentials.`
    };
  }
  return { mode: "manual", checkoutUrl: null, message: "Manual bank/TRX review order created." };
}

async function api(req, res) {
  if (req.method === "OPTIONS") return sendJson(res, 204, {});
  const url = new URL(req.url, `http://${req.headers.host}`);
  const store = readStore();

  try {
    if (req.method === "GET" && url.pathname === "/api/health") {
      return sendJson(res, 200, { ok: true, service: "Siddhi SMS API", time: new Date().toISOString() });
    }

    if (req.method === "GET" && url.pathname === "/api/health/supabase") {
      await testSupabaseConnection();
      return sendJson(res, 200, { ok: true, service: "Supabase", time: new Date().toISOString() });
    }

    if (req.method === "POST" && url.pathname === "/api/app/login") {
      const body = await readBody(req);
      if (!body.email || !body.password) return sendJson(res, 400, { error: "email and password required" });
      const account = await loginAppUser(body.email, body.password);
      if (!account) return sendJson(res, 401, { error: "Invalid email or password" });
      if (body.role && body.role !== account.role && !(body.role === "user" && account.role === "customer")) {
        return sendJson(res, 403, { error: "This account does not have access to that portal" });
      }
      return sendJson(res, 200, {
        user: account,
        session: {
          role: account.role === "admin" ? "admin" : "user",
          userId: account.id
        }
      });
    }

    if (req.method === "GET" && url.pathname === "/api/app/password-reset/verify") {
      const token = url.searchParams.get("token");
      if (!token) return sendJson(res, 400, { error: "token required" });
      const reset = await verifyPasswordReset(token);
      return sendJson(res, 200, { reset });
    }

    if (req.method === "POST" && url.pathname === "/api/app/password-reset/complete") {
      const body = await readBody(req);
      if (!body.token || !body.password) return sendJson(res, 400, { error: "token and password required" });
      const result = await completePasswordReset(body.token, body.password);
      return sendJson(res, 200, result);
    }

    if (req.method === "POST" && url.pathname === "/api/app/signup") {
      const body = await readBody(req);
      if (!body.name || !body.company || !body.email || !body.phone || !body.password) {
        return sendJson(res, 400, { error: "name, company, email, phone and password required" });
      }
      const account = await createCustomerAccount(body);
      return sendJson(res, 201, {
        user: account,
        session: { role: "user", userId: account.id },
        message: "Signup created. Admin approval required."
      });
    }

    if (req.method === "POST" && url.pathname === "/api/app/masking-document") {
      const body = await readBody(req);
      const document = await uploadMaskingDocument(body);
      return sendJson(res, 201, { document });
    }

    if (req.method === "GET" && url.pathname === "/api/app/masking-document/resolve") {
      const userId = url.searchParams.get("userId");
      const fileName = url.searchParams.get("fileName");
      const documentId = url.searchParams.get("documentId");
      const viewerRole = url.searchParams.get("role");
      const viewerId = url.searchParams.get("viewerId");
      if (!documentId && (!userId || !fileName)) return sendJson(res, 400, { error: "documentId or userId and fileName required" });
      const documentUrl = await resolveMaskingDocument({ userId, fileName, documentId, viewerRole, viewerId });
      if (!documentUrl) return sendJson(res, 404, { error: "Saved document file not found. Please ask the user to upload this document again." });
      return sendJson(res, 200, { url: documentUrl });
    }

    if (req.method === "GET" && url.pathname === "/api/app/state") {
      const role = url.searchParams.get("role");
      const userId = url.searchParams.get("userId");
      if (!role || !userId) return sendJson(res, 400, { error: "role and userId required" });
      const state = await loadAppState({ role, userId });
      return sendJson(res, 200, { state });
    }

    if (req.method === "PUT" && url.pathname === "/api/app/state") {
      const body = await readBody(req);
      if (!body.role || !body.userId || !body.state) return sendJson(res, 400, { error: "role, userId and state required" });
      await saveAppState({ role: body.role, userId: body.userId, state: body.state });
      return sendJson(res, 200, { ok: true, time: new Date().toISOString() });
    }

    const userControlMatch = url.pathname.match(/^\/api\/admin\/users\/([^/]+)\/(activate|deactivate|password-reset)$/);
    if (req.method === "POST" && userControlMatch) {
      const [, userId, action] = userControlMatch;
      if (action === "password-reset") {
        const baseUrl = process.env.PUBLIC_BASE_URL || `http://localhost:${PORT}`;
        const reset = await createPasswordReset(userId, baseUrl);
        return sendJson(res, 200, {
          ok: true,
          message: `Password reset email queued for ${reset.email}.`,
          reset
        });
      }
      const user = await setUserControlStatus(userId, action);
      return sendJson(res, 200, { ok: true, user });
    }

    const deleteUserMatch = url.pathname.match(/^\/api\/admin\/users\/([^/]+)$/);
    if (req.method === "DELETE" && deleteUserMatch) {
      const deleted = await deleteCustomerAccount(deleteUserMatch[1]);
      return sendJson(res, 200, { ok: true, deleted });
    }

    if (req.method === "PUT" && url.pathname === "/api/admin/profile") {
      const body = await readBody(req);
      if (!body.adminId || !body.profile) return sendJson(res, 400, { error: "adminId and profile required" });
      const profile = await updateAdminProfile(body.adminId, body.profile);
      return sendJson(res, 200, { ok: true, profile });
    }

    if (req.method === "GET" && url.pathname === "/api/packages") {
      return sendJson(res, 200, { packages: store.packages.filter(pkg => pkg.status === "Published"), rates: store.rates });
    }

    if (req.method === "POST" && url.pathname === "/api/auth/signup") {
      const body = await readBody(req);
      if (!body.name || !body.company || !body.email || !body.phone) return sendJson(res, 400, { error: "name, company, email and phone required" });
      if (store.users.some(user => user.email.toLowerCase() === String(body.email).toLowerCase())) return sendJson(res, 409, { error: "Email already exists" });
      const user = {
        id: `u${Date.now()}`,
        name: body.name,
        company: body.company,
        email: body.email,
        phone: body.phone,
        balance: 0,
        accountStatus: "Pending",
        maskingStatus: "Not applied"
      };
      store.users.push(user);
      writeStore(store);
      return sendJson(res, 201, { user, message: "Signup created. Admin approval required." });
    }

    if (req.method === "POST" && url.pathname === "/api/orders") {
      const body = await readBody(req);
      const user = store.users.find(item => item.id === body.userId);
      const pkg = store.packages.find(item => item.id === body.packageId && item.status === "Published");
      if (!user || !pkg) return sendJson(res, 404, { error: "User or package not found" });
      const order = {
        id: `pay${Date.now()}`,
        userId: user.id,
        packageId: pkg.id,
        method: body.method || "bKash",
        trx: body.trx || "",
        amount: pkg.price,
        status: "Pending",
        credited: false,
        createdAt: new Date().toISOString()
      };
      order.gateway = createGatewayIntent(order, order.method);
      store.orders.unshift(order);
      writeStore(store);
      return sendJson(res, 201, { order });
    }

    const completeMatch = url.pathname.match(/^\/api\/admin\/orders\/([^/]+)\/complete$/);
    if (req.method === "POST" && completeMatch) {
      if (!requireAdmin(req, res)) return;
      const order = store.orders.find(item => item.id === completeMatch[1]);
      if (!order) return sendJson(res, 404, { error: "Order not found" });
      creditOrder(store, order);
      writeStore(store);
      return sendJson(res, 200, { order, message: "Order completed and wallet credited once." });
    }

    if (req.method === "POST" && url.pathname === "/api/messages/send") {
      if (!requireCustomer(req, res)) return;
      const body = await readBody(req);
      const user = store.users.find(item => item.id === body.userId);
      if (!user) return sendJson(res, 404, { error: "User not found" });
      if (user.accountStatus !== "Approved") return sendJson(res, 403, { error: "Account approval required" });
      if (body.type === "masking" && user.maskingStatus !== "Approved") return sendJson(res, 403, { error: "Masking approval required" });
      const recipients = Array.isArray(body.to) ? body.to.length : Number(body.recipients || 1);
      const segments = smsSegments(body.message);
      const cost = recipients * segments * smsRate(body.type, store.rates);
      if (user.balance < cost) return sendJson(res, 402, { error: "Insufficient wallet balance", cost, balance: user.balance });
      user.balance -= cost;
      const message = { id: `msg${Date.now()}`, userId: user.id, type: body.type || "transactional", senderId: body.sender_id, recipients, segments, cost, status: "Queued", createdAt: new Date().toISOString() };
      store.messages.unshift(message);
      writeStore(store);
      return sendJson(res, 202, { message, balance: user.balance });
    }

    if (req.method === "POST" && url.pathname === "/api/payments/webhook") {
      if (req.headers["x-webhook-secret"] !== WEBHOOK_SECRET) return sendJson(res, 401, { error: "Webhook secret required" });
      const body = await readBody(req);
      const order = store.orders.find(item => item.id === body.orderId);
      if (!order) return sendJson(res, 404, { error: "Order not found" });
      if (body.status === "Completed" || body.status === "success") creditOrder(store, order);
      else order.status = body.status || "Processing";
      order.gatewayPayload = body;
      writeStore(store);
      return sendJson(res, 200, { order });
    }

    return sendJson(res, 404, { error: "API route not found" });
  } catch (error) {
    if (error.code === "ACCOUNT_SUSPENDED") {
      return sendJson(res, 403, { code: "ACCOUNT_SUSPENDED", error: error.message });
    }
    if (/schema cache|Could not find the table|Could not find the function/i.test(error.message)) {
      return sendJson(res, 400, {
        error: `${error.message}. Apply supabase/001_schema.sql and supabase/002_seed_demo.sql in your Supabase SQL editor, then try again.`
      });
    }
    if (error.statusCode) return sendJson(res, error.statusCode, { error: error.message });
    return sendJson(res, 400, { error: error.message });
  }
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api/")) return api(req, res);
  return publicFile(req, res);
});

server.listen(PORT, () => {
  console.log(`Siddhi SMS running at http://localhost:${PORT}`);
});
