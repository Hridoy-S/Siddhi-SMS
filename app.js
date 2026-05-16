const state = {
  authView: "landing",
  sessionRole: null,
  mode: "admin",
  active: "dashboard",
  currentUserId: "u1",
  loginEmail: "owner@dhakaretail.com",
  loginPassword: "demo123",
  rememberMe: false,
  adminEmail: "admin@siddhisms.com",
  adminPassword: "admin123",
  passwordVisible: { login: false, admin: false, signup: false, reset: false, resetConfirm: false },
  adminProfile: { id: "", name: "", company: "", email: "", phone: "", newPassword: "", confirmPassword: "" },
  userSearch: "",
  documentUrls: {},
  modal: null,
  resetToken: "",
  resetEmail: "",
  resetPassword: "",
  resetPasswordConfirm: "",
  forgotEmail: "",
  signup: {
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    companyType: "E-commerce",
    password: "",
    avatar: ""
  },
  quickMode: "single",
  quickChannel: "sms",
  quickText: "আপনার OTP 493221। ৫ মিনিটের মধ্যে ব্যবহার করুন।",
  quickEmailSubject: "Important update",
  quickPhone: "01711000001",
  quickType: "otp",
  quickSenderId: "DHAKASHOP",
  quickAudienceId: "a1",
  campaignAudienceId: "a1",
  smsText: "প্রিয় {name}, আপনার অর্ডার #{order_id} নিশ্চিত করা হয়েছে। ধন্যবাদ।",
  campaignType: "transactional",
  senderId: "DHAKASHOP",
  balance: 184250,
  newAudienceName: "",
  selectedAudienceId: "a1",
  editingAudienceId: null,
  editingContactId: null,
  audienceDraft: { name: "", description: "" },
  contactDraft: { name: "", phone: "", email: "" },
  manualContact: { name: "", phone: "", email: "", audienceId: "a1" },
  googleSheetRows: [],
  googleSheetFileName: "",
  rateDraft: { nonMasking: 0.3, masking: 0.48, otp: 0.34 },
  editingPackageId: null,
  packageEditDraft: { name: "", type: "non-masking", price: 0, rate: 0 },
  selectedOrderId: "pay1",
  editingOrderId: null,
  orderDraft: { status: "Pending", trx: "", amount: 0, method: "bKash" },
  packageDraft: { name: "Growth Wallet", type: "non-masking", price: 30000, rate: 0.3 },
  platformRates: { nonMasking: 0.3, masking: 0.48, otp: 0.34 },
  gatewaySettings: {
    mode: "Manual review",
    bkash: "Credential required",
    nagad: "Credential required",
    smsGateway: "Sandbox route",
    apiBase: "http://localhost:8080/api"
  },
  users: [
    { id: "u1", name: "Tanvir Ahmed", company: "Dhaka Retail Ltd.", email: "owner@dhakaretail.com", phone: "01711000001", address: "Banani, Dhaka", companyType: "E-commerce", avatar: "DR", plan: "Business 50K", balance: 184250, status: "Active", accountStatus: "Approved", maskingStatus: "Approved", binTax: "BIN-112233, TIN-998877", docs: "Trade license, BIN, TIN", maskingRequest: { companyName: "Dhaka Retail Ltd.", companyType: "E-commerce", otherCompanyType: "", binTax: "BIN-112233, TIN-998877", website: "https://dhakaretail.example", email: "owner@dhakaretail.com", phone: "01711000001", documents: ["trade-license.pdf", "bin-certificate.pdf"], note: "Approved sender" } },
    { id: "u2", name: "Green School Admin", company: "Green School", email: "admin@greenschool.edu.bd", phone: "01822000002", address: "Mirpur, Dhaka", companyType: "Education", avatar: "GS", plan: "Starter 10K", balance: 9800, status: "Active", accountStatus: "Approved", maskingStatus: "Pending", binTax: "TIN-552211", docs: "School registration", maskingRequest: { companyName: "Green School", companyType: "Education", otherCompanyType: "", binTax: "TIN-552211", website: "", email: "admin@greenschool.edu.bd", phone: "01822000002", documents: ["school-registration.pdf"], note: "Awaiting review" } },
    { id: "u3", name: "MediCare Ops", company: "MediCare BD", email: "ops@medicarebd.com", phone: "01933000003", address: "Dhanmondi, Dhaka", companyType: "Healthcare", avatar: "MB", plan: "Trial", balance: 0, status: "Pending approval", accountStatus: "Pending", maskingStatus: "Not applied", binTax: "", docs: "", maskingRequest: null }
  ],
  audiences: [
    { id: "a1", name: "New Customers", description: "Recent opt-in buyers and fresh leads" },
    { id: "a2", name: "Old Customers", description: "Repeat customers and dormant accounts" },
    { id: "a3", name: "Students", description: "School and coaching student list" },
    { id: "a4", name: "Teachers", description: "Faculty and admin staff" }
  ],
  contacts: [
    { id: "c1", name: "Rahim Uddin", phone: "01711000001", email: "rahim@example.com", audienceId: "a1", consent: "Opted in", operator: "GP" },
    { id: "c2", name: "Nusrat Jahan", phone: "01822000002", email: "nusrat@example.com", audienceId: "a1", consent: "Opted in", operator: "Robi" },
    { id: "c3", name: "Farhana Akter", phone: "01933000003", email: "farhana@example.com", audienceId: "a2", consent: "DND", operator: "Banglalink" },
    { id: "c4", name: "Imran Hossain", phone: "01644000004", email: "imran@example.com", audienceId: "a3", consent: "Opted in", operator: "Airtel" },
    { id: "c5", name: "Sadia Islam", phone: "01355000005", email: "sadia@example.com", audienceId: "a4", consent: "Opted in", operator: "GP" }
  ],
  campaigns: [
    { name: "Eid Offer Bangla", type: "Promotional", audienceId: "a2", sent: 48200, delivered: 45691, cost: 14460, status: "Completed" },
    { name: "April Invoice Reminder", type: "Transactional", audienceId: "a1", sent: 15780, delivered: 15312, cost: 5365, status: "Completed" },
    { name: "Login OTP Priority", type: "OTP", audienceId: "a1", sent: 9210, delivered: 9164, cost: 3315, status: "Live" }
  ],
  routes: [
    { name: "OTP Route A", type: "OTP", uptime: 99.98, latency: "4.7s", health: "Healthy" },
    { name: "Masking Route GP/Robi", type: "Masking", uptime: 99.72, latency: "8.2s", health: "Healthy" },
    { name: "Promo Low Cost", type: "Promotional", uptime: 98.91, latency: "21.5s", health: "Watch" }
  ],
  packages: [
    { id: "p1", name: "Starter Wallet", type: "non-masking", price: 3500, rate: 0.35, status: "Published" },
    { id: "p2", name: "Business Wallet", type: "non-masking", price: 16000, rate: 0.32, status: "Published" },
    { id: "p3", name: "Masking Wallet", type: "masking", price: 27500, rate: 0.55, status: "Published" }
  ],
  payments: [
    { id: "pay1", userId: "u3", packageId: "p1", method: "bKash", trx: "BK72811", amount: 3500, status: "Pending", credited: false, note: "Waiting for payment verification" },
    { id: "pay2", userId: "u2", packageId: "p2", method: "Nagad", trx: "NG55290", amount: 16000, status: "Completed", credited: true, note: "Completed by admin" }
  ],
  invoices: [
    { id: "INV-2026-041", client: "Dhaka Retail Ltd.", amount: 42000, status: "Paid" },
    { id: "INV-2026-042", client: "Green ISP", amount: 113500, status: "Due" }
  ]
};

let persistTimer = null;
const sessionStorageKey = "siddhiSmsSession";
const rememberPreferenceKey = "siddhiSmsRememberMe";
const adminLoginPath = "/admin-secure-login";

function isAdminLoginPath() {
  return window.location.pathname === adminLoginPath;
}

function syncAuthViewFromPath() {
  if (isAdminLoginPath()) state.authView = "admin-login";
  else if (state.authView === "admin-login") state.authView = "landing";
}

function publicState() {
  return {
    currentUserId: state.currentUserId,
    users: state.users,
    audiences: state.audiences,
    contacts: state.contacts,
    campaigns: state.campaigns,
    routes: state.routes,
    packages: state.packages,
    payments: state.payments,
    invoices: state.invoices,
    platformRates: state.platformRates,
    rateDraft: state.rateDraft,
    gatewaySettings: state.gatewaySettings,
    senderId: state.senderId,
    smsText: state.smsText
  };
}

async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `Request failed: ${response.status}`);
  return payload;
}

function applyRemoteState(remote) {
  if (!remote) return;
  Object.assign(state, remote);
  const fallbackAudience = state.audiences[0]?.id || "";
  if (!state.selectedAudienceId || !state.audiences.some(item => item.id === state.selectedAudienceId)) state.selectedAudienceId = fallbackAudience;
  if (!state.quickAudienceId || !state.audiences.some(item => item.id === state.quickAudienceId)) state.quickAudienceId = fallbackAudience;
  if (!state.campaignAudienceId || !state.audiences.some(item => item.id === state.campaignAudienceId)) state.campaignAudienceId = fallbackAudience;
  if (!state.manualContact.audienceId || !state.audiences.some(item => item.id === state.manualContact.audienceId)) state.manualContact.audienceId = fallbackAudience;
}

async function loadRemoteState(role, userId) {
  const payload = await apiRequest(`/api/app/state?role=${encodeURIComponent(role)}&userId=${encodeURIComponent(userId)}`);
  applyRemoteState(payload.state);
}

function saveSession(role = state.sessionRole, userId = state.currentUserId) {
  if (!role || !userId) return;
  const payload = JSON.stringify({ role, userId, savedAt: Date.now(), rememberMe: Boolean(state.rememberMe) });
  localStorage.setItem(rememberPreferenceKey, JSON.stringify(Boolean(state.rememberMe)));
  if (state.rememberMe) {
    sessionStorage.removeItem(sessionStorageKey);
    localStorage.setItem(sessionStorageKey, payload);
  } else {
    localStorage.removeItem(sessionStorageKey);
    sessionStorage.setItem(sessionStorageKey, payload);
  }
}

function clearSession() {
  localStorage.removeItem(sessionStorageKey);
  sessionStorage.removeItem(sessionStorageKey);
}

async function restoreSession() {
  state.rememberMe = JSON.parse(localStorage.getItem(rememberPreferenceKey) || "false");
  syncAuthViewFromPath();
  const raw = localStorage.getItem(sessionStorageKey) || sessionStorage.getItem(sessionStorageKey);
  if (!raw) {
    render();
    return;
  }
  try {
    const saved = JSON.parse(raw);
    if (!saved.role || !saved.userId) throw new Error("Invalid saved session");
    state.rememberMe = Boolean(saved.rememberMe);
    state.sessionRole = saved.role;
    state.mode = saved.role === "admin" ? "admin" : "user";
    state.currentUserId = saved.userId;
    state.active = "dashboard";
    await loadRemoteState(saved.role, saved.userId);
  } catch (error) {
    clearSession();
    state.sessionRole = null;
    state.authView = "landing";
    toast("Session expired. Please log in again.", "error");
  }
  render();
}

function persistAppState() {
  if (!state.sessionRole || !state.currentUserId) return;
  window.clearTimeout(persistTimer);
  persistTimer = window.setTimeout(async () => {
    try {
      await apiRequest("/api/app/state", {
        method: "PUT",
        body: JSON.stringify({
          role: state.sessionRole,
          userId: state.currentUserId,
          state: publicState()
        })
      });
    } catch (error) {
      toast(`Database sync failed: ${error.message}`, "error");
    }
  }, 250);
}

const adminNav = [
  ["dashboard", "Admin Dashboard", "D"],
  ["approvals", "Masking Approval", "V"],
  ["users", "Users", "U"],
  ["packages", "Packages", "P"],
  ["orders", "New Orders", "O"],
  ["payments", "Payments", "M"],
  ["otp", "API & Gateways", "I"],
  ["contacts", "Audiences", "A"],
  ["campaigns", "Campaigns", "C"],
  ["quick", "Quick Send", "Q"],
  ["billing", "Billing", "B"],
  ["compliance", "Compliance", "K"],
  ["admin-profile", "Admin Profile", "S"]
];

const userNav = [
  ["dashboard", "Dashboard", "D"],
  ["profile", "Profile", "R"],
  ["masking", "Masking", "M"],
  ["quick", "Quick Send", "Q"],
  ["campaigns", "Campaigns", "C"],
  ["contacts", "Audiences", "A"],
  ["packages", "Buy Package", "P"],
  ["billing", "Billing", "B"],
  ["otp", "API", "I"]
];

function currentUser() {
  return state.users.find(user => user.id === state.currentUserId) || state.users[0];
}

function isLoggedIn() {
  return Boolean(state.sessionRole);
}

function initials(text) {
  return String(text || "U").split(/\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase();
}

function navItems() {
  return state.mode === "admin" ? adminNav : userNav;
}

function titleFor(key) {
  return Object.fromEntries(navItems().map(([id, label]) => [id, label]))[key] || "Dashboard";
}

function taka(value) {
  const hasPaisa = !Number.isInteger(Number(value));
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: hasPaisa ? 2 : 0,
    maximumFractionDigits: hasPaisa ? 2 : 0
  }).format(Number(value || 0));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function badge(value) {
  const v = String(value).toLowerCase();
  const cls = v.includes("dnd") || v.includes("due") || v.includes("pending") || v.includes("watch")
    ? "warn"
    : v.includes("failed") || v.includes("blocked") || v.includes("suspended") || v.includes("rejected")
      ? "bad"
      : v.includes("live") || v.includes("approved") || v.includes("active")
        ? "info"
        : "";
  return `<span class="badge ${cls}">${escapeHtml(value)}</span>`;
}

function audienceName(id) {
  return state.audiences.find(audience => audience.id === id)?.name || "Unknown audience";
}

function userName(id) {
  return state.users.find(user => user.id === id)?.company || "Unknown user";
}

function packageName(id) {
  return state.packages.find(pkg => pkg.id === id)?.name || "Wallet package";
}

function audienceContacts(id) {
  return state.contacts.filter(contact => contact.audienceId === id);
}

function optedInContacts(id) {
  return audienceContacts(id).filter(contact => contact.consent === "Opted in");
}

function audienceOptions(selectedId) {
  return state.audiences.map(audience => {
    const count = audienceContacts(audience.id).length;
    return `<option value="${audience.id}" ${selectedId === audience.id ? "selected" : ""}>${escapeHtml(audience.name)} (${count})</option>`;
  }).join("");
}

function packageTypeLabel(type) {
  return type === "masking" ? "Masking" : "Non-masking";
}

function packageRateForType(type) {
  return type === "masking" ? state.platformRates.masking : state.platformRates.nonMasking;
}

function packageTypeOptions(selectedType) {
  return ["non-masking", "masking"].map(type => `<option value="${type}" ${selectedType === type ? "selected" : ""}>${packageTypeLabel(type)}</option>`).join("");
}

function orderStatusOptions(selectedStatus) {
  return ["Pending", "Processing", "Completed", "Cancelled"].map(status => `<option value="${status}" ${selectedStatus === status ? "selected" : ""}>${status}</option>`).join("");
}

function paymentMethodOptions(selectedMethod) {
  return ["bKash", "Nagad", "Bank"].map(method => `<option value="${method}" ${selectedMethod === method ? "selected" : ""}>${method}</option>`).join("");
}

function companyTypeOptions(selectedType) {
  return ["E-commerce", "Education", "Healthcare", "ISP", "Finance", "Agency", "Other"].map(type => `<option value="${type}" ${selectedType === type ? "selected" : ""}>${type}</option>`).join("");
}

function messageTypeLabel(type) {
  if (type === "otp") return "OTP";
  if (type === "masking") return "Masking";
  return "Non-masking";
}

function liveRateForMessageType(type) {
  if (type === "otp") return state.platformRates.otp;
  if (type === "masking") return state.platformRates.masking;
  return state.platformRates.nonMasking;
}

function userCanUseMasking() {
  return state.mode === "admin" || currentUser().maskingStatus === "Approved";
}

function smsTypeOptions(selectedType) {
  const maskingLocked = !userCanUseMasking();
  return ["otp", "transactional", "promotional", "masking", "non-masking"].map(type => {
    const disabled = type === "masking" && maskingLocked ? "disabled" : "";
    const label = type === "masking" && maskingLocked ? "masking (approval required)" : type;
    return `<option value="${type}" ${selectedType === type ? "selected" : ""} ${disabled}>${label}</option>`;
  }).join("");
}

function smsInfo(text, type = state.campaignType) {
  const hasBangla = /[\u0980-\u09FF]/.test(text);
  const singleLimit = hasBangla ? 70 : 160;
  const multiLimit = hasBangla ? 67 : 153;
  const len = [...String(text || "")].length;
  const segments = len <= singleLimit ? 1 : Math.ceil(len / multiLimit);
  const baseRate = liveRateForMessageType(type);
  return { hasBangla, len, segments, cost: segments * baseRate };
}

function formatSmsHint(info, recipients = 1) {
  const total = info.cost * recipients;
  return `${info.len} characters · ${info.segments} segment(s) · ${info.hasBangla ? "Bangla Unicode" : "GSM/English"} · ${taka(info.cost)} each · ${taka(total)} total`;
}

function personalizePreview(text, contact = state.contacts[0]) {
  return String(text || "")
    .replaceAll("{name}", contact?.name || "Customer")
    .replaceAll("{phone}", contact?.phone || "017XXXXXXXX")
    .replaceAll("{email}", contact?.email || "name@example.com");
}

function shortcodeToolbar(target) {
  return `
    <div class="composer-tools">
      <button class="secondary" data-action="insert-token" data-target="${target}" data-token="{name}">{name}</button>
      <button class="secondary" data-action="insert-token" data-target="${target}" data-token="{phone}">{phone}</button>
      <button class="secondary" data-action="insert-token" data-target="${target}" data-token="{email}">{email}</button>
    </div>
  `;
}

function composerEnhancements(target, text, sampleContact) {
  return `
    ${shortcodeToolbar(target)}
    <div class="check"><span class="dot"></span><div><strong>Personalized preview</strong><p class="hint">${escapeHtml(personalizePreview(text, sampleContact))}</p></div></div>
  `;
}

function rateExplain(type, recipients, segments) {
  const rate = liveRateForMessageType(type);
  return `${messageTypeLabel(type)} live rate ${taka(rate)} × ${segments} segment(s) × ${recipients} recipient(s)`;
}

function operatorFromPhone(phone) {
  const prefix = String(phone).slice(0, 3);
  return ({ "017": "GP", "013": "GP", "018": "Robi", "016": "Airtel", "019": "Banglalink", "014": "Banglalink", "015": "Teletalk" })[prefix] || "Unknown";
}

function normalizeBdPhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (/^01[3-9]\d{8}$/.test(digits)) return digits;
  if (/^1[3-9]\d{8}$/.test(digits)) return `0${digits}`;
  if (/^8801[3-9]\d{8}$/.test(digits)) return digits.slice(2);
  return digits;
}

function metric(label, value, hint, trend = "good") {
  return `<article class="metric"><small>${label}</small><strong>${value}</strong><span class="trend ${trend}">${hint}</span></article>`;
}

function dashboardReportCard(title, value, subtitle, tone = "green") {
  return `
    <article class="report-mini ${tone}">
      <small>${escapeHtml(title)}</small>
      <strong>${value}</strong>
      <span>${escapeHtml(subtitle)}</span>
    </article>
  `;
}

function liquidAreaChart(title, value, subtitle, stats) {
  return `
    <section class="panel report-hero">
      <div class="between">
        <div>
          <p class="eyebrow">Live Reports</p>
          <h2>${escapeHtml(title)}</h2>
        </div>
        <div class="report-toggle"><span>Today</span><strong>Week</strong></div>
      </div>
      <div class="report-balance">
        <strong>${value}</strong>
        <span class="trend good">↗ ${escapeHtml(subtitle)}</span>
      </div>
      <div class="area-chart" aria-label="${escapeHtml(title)} chart">
        <svg viewBox="0 0 620 220" role="img">
          <defs>
            <linearGradient id="siddhiArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="#86efac" stop-opacity="0.44" />
              <stop offset="58%" stop-color="#0f6f54" stop-opacity="0.26" />
              <stop offset="100%" stop-color="#000000" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="siddhiLine" x1="0" x2="1">
              <stop offset="0%" stop-color="#86efac" />
              <stop offset="58%" stop-color="#17a982" />
              <stop offset="100%" stop-color="#0f6f54" />
            </linearGradient>
          </defs>
          <path class="chart-grid" d="M20 50H600M20 100H600M20 150H600M20 200H600" />
          <path class="chart-area" d="M20 158 C80 80 120 170 170 118 S260 80 315 132 390 172 445 104 540 74 600 92 L600 210 L20 210 Z" />
          <path class="chart-line" d="M20 158 C80 80 120 170 170 118 S260 80 315 132 390 172 445 104 540 74 600 92" />
          <circle cx="540" cy="74" r="8" />
        </svg>
        <div class="chart-tip"><small>Peak</small><strong>${stats[0]?.value || value}</strong></div>
        <div class="chart-days"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
      </div>
      <div class="report-mini-grid">${stats.map(item => dashboardReportCard(item.title, item.value, item.subtitle, item.tone)).join("")}</div>
    </section>
  `;
}

function liquidDonut(title, total, items) {
  const color = ["#86efac", "#17a982", "#0f6f54", "#fbbf24"];
  return `
    <section class="panel report-donut">
      <div class="between"><h2>${escapeHtml(title)}</h2><button class="secondary">Detail ›</button></div>
      <div class="donut-layout">
        <div>
          <small>Total</small>
          <strong>${total}</strong>
          <ul>${items.map((item, index) => `<li><span style="background:${color[index % color.length]}"></span>${escapeHtml(item.label)} <b>${item.value}</b></li>`).join("")}</ul>
        </div>
        <div class="donut-rings" aria-hidden="true">
          ${items.map((item, index) => `<i style="--ring:${index};--value:${Math.min(92, 34 + item.value)};--ring-color:${color[index % color.length]}"></i>`).join("")}
          <em></em>
        </div>
      </div>
    </section>
  `;
}

function featureCard(title, body, tag) {
  return `<article class="feature-card">
    <span>${escapeHtml(tag)}</span>
    <h3>${escapeHtml(title)}</h3>
    <p>${escapeHtml(body)}</p>
  </article>`;
}

function renderModeSwitch() {
  const switcher = document.querySelector("#mode-switch");
  if (!switcher) return;
  if (!isLoggedIn()) {
    switcher.innerHTML = "";
    return;
  }
  if (state.sessionRole !== "admin") {
    state.mode = "user";
    switcher.innerHTML = "";
    return;
  }
  switcher.innerHTML = `
    <button class="tab ${state.mode === "admin" ? "active" : ""}" data-mode="admin">Admin</button>
    <button class="tab ${state.mode === "user" ? "active" : ""}" data-mode="user">User</button>
  `;
}

function renderNav() {
  if (!isLoggedIn()) {
    document.querySelector("#nav").innerHTML = "";
    return;
  }
  document.querySelector("#nav").innerHTML = navItems().map(([key, label, icon]) => `
    <button class="nav-item ${state.active === key ? "active" : ""}" data-view="${key}">
      <span class="brand-mark" style="width:28px;height:28px;border-radius:6px;font-size:12px">${icon}</span>
      ${escapeHtml(label)}
    </button>
  `).join("");

  const footer = document.querySelector(".sidebar-footer");
  footer.innerHTML = state.mode === "admin"
    ? `<small>Admin Control</small><strong>Siddhi SMS HQ</strong>`
    : `<small>User Workspace</small><strong>${escapeHtml(currentUser().name)}</strong>`;
}

function dashboard() {
  if (state.mode === "user") return userDashboard();
  const delivered = state.campaigns.reduce((sum, item) => sum + item.delivered, 0);
  const sent = state.campaigns.reduce((sum, item) => sum + item.sent, 0);
  const pendingPayments = state.payments.filter(payment => payment.status === "Pending").length;
  const totalWallet = state.users.reduce((sum, user) => sum + user.balance, 0);
  const totalCustomers = state.users.length;
  const totalCost = state.campaigns.reduce((sum, campaign) => sum + Number(campaign.cost || 0), 0);
  const totalRevenue = state.payments.filter(payment => payment.status === "Completed").reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const totalProfit = Math.max(0, totalRevenue - totalCost);
  const deliveryRate = sent ? `${((delivered / sent) * 100).toFixed(1)}% delivery rate` : "No traffic yet";
  return `
    ${liquidAreaChart("Platform Balance", taka(totalWallet), deliveryRate, [
      { title: "Total customers", value: totalCustomers.toLocaleString(), subtitle: "registered accounts", tone: "green" },
      { title: "Total cost", value: taka(totalCost), subtitle: "campaign spend", tone: "gold" },
      { title: "Total profit", value: taka(totalProfit), subtitle: "completed revenue less cost", tone: "green" },
      { title: "Pending payments", value: pendingPayments, subtitle: "waiting approval", tone: pendingPayments ? "gold" : "green" }
    ])}
    <div class="grid metrics">
      ${metric("Total client wallet", taka(totalWallet), "Across active tenants")}
      ${metric("Delivery rate", sent ? `${((delivered / sent) * 100).toFixed(1)}%` : "0%", "All demo routes")}
      ${metric("Pending payments", pendingPayments, "Approve after bKash/Nagad check", pendingPayments ? "warn" : "good")}
      ${metric("Audiences", state.audiences.length, `${state.contacts.length} total contacts`)}
    </div>
    <div class="grid two" style="margin-top:16px">
      <section class="panel">
        <div class="between"><h2>User Accounts</h2><button class="secondary" data-view="users">Manage users</button></div>
        ${usersTable()}
      </section>
      <section class="panel">
        <h2>Route Health</h2>
        <ul class="checklist">${state.routes.map(route => `<li class="check"><span class="dot ${route.health === "Watch" ? "warn" : ""}"></span><div><strong>${route.name}</strong><p class="hint">${route.type} · ${route.uptime}% uptime · ${route.latency}</p></div></li>`).join("")}</ul>
      </section>
    </div>
    <div class="grid two report-row">
      ${liquidDonut("Traffic Mix", sent.toLocaleString(), [
        { label: "Success", value: Math.round((delivered / sent) * 100) },
        { label: "Waiting", value: pendingPayments * 12 },
        { label: "Masking", value: 36 },
        { label: "OTP", value: 28 }
      ])}
      <section class="panel report-feed">
        <div class="between"><h2>Recent order</h2><button class="secondary" data-view="orders">View all</button></div>
        <ul>${state.payments.slice(0, 4).map(payment => `<li><span>${escapeHtml(userName(payment.userId))}</span><b>${taka(payment.amount)}</b>${badge(payment.status)}</li>`).join("")}</ul>
      </section>
    </div>
  `;
}

function publicTitle() {
  const titles = {
    landing: "Siddhi SMS",
    "user-login": "User Login",
    "admin-login": "Admin Login",
    signup: "Create Account",
    forgot: "Password Reset"
  };
  return titles[state.authView] || "Siddhi SMS";
}

function publicActions() {
  return `
    <button class="secondary" data-auth="landing">Home</button>
    <button class="secondary" data-auth="user-login">Login</button>
    <button class="primary" data-auth="signup">Sign Up</button>
  `;
}

function publicView() {
  if (state.authView === "admin-login" && !isAdminLoginPath()) state.authView = "landing";
  const views = {
    landing,
    "user-login": userLogin,
    "admin-login": adminLogin,
    signup,
    forgot,
    "reset-password": resetPasswordView
  };
  return (views[state.authView] || landing)();
}

async function openResetFromUrl() {
  const token = new URLSearchParams(window.location.search).get("reset");
  if (!token) return false;
  state.resetToken = token;
  state.authView = "reset-password";
  try {
    const payload = await apiRequest(`/api/app/password-reset/verify?token=${encodeURIComponent(token)}`);
    state.resetEmail = payload.reset.email || "";
  } catch (error) {
    toast(error.message || "Reset link is invalid or expired.", "error");
  }
  window.history.replaceState({}, "", window.location.pathname);
  return true;
}

function landing() {
  return authExperience("user-login", userLoginForm(), "আপনার ব্যবসার সাথে যোগাযোগ হোক আরও সহজ");
}

function authExperience(activeTab, formMarkup, headline = "আপনার ব্যবসার সাথে যোগাযোগ হোক আরও সহজ") {
  const isAdminAuth = activeTab === "admin-login";
  return `
    <section class="auth-stage">
      <span class="auth-orbit orbit-one"></span>
      <span class="auth-orbit orbit-two"></span>
      <div class="auth-shell">
        <aside class="auth-brand-panel">
          <div class="auth-logo-wrap">
            <img src="assets/siddhi-sms-logo.png" alt="Siddhi SMS logo" />
          </div>
          <h2><span class="brand-siddhi">Siddhi</span> <span class="brand-sms">SMS</span></h2>
          <p class="auth-subtitle">স্মার্ট এসএমএস সল্যুশন</p>
          <div class="leaf-divider"></div>
          <h3>${headline}</h3>
          <p class="auth-lead">Siddhi SMS আপনার ব্যবসাকে দেয় দ্রুত, নিরাপদ ও নির্ভরযোগ্য এসএমএস সার্ভিস সমাধান।</p>
          <ul class="auth-benefits">
            <li><span>↗</span>দ্রুত ও নির্ভরযোগ্য ডেলিভারি</li>
            <li><span>♣</span>বাল্ক এসএমএস ও কাস্টমার ম্যানেজমেন্ট</li>
            <li><span>◆</span>সুরক্ষিত ও প্রাইভেসি ফোকাসড</li>
            <li><span>▥</span>রিয়েল-টাইম রিপোর্ট ও অ্যানালিটিক্স</li>
          </ul>
          <div class="device-preview" aria-hidden="true">
            <div class="preview-screen">
              <div class="preview-sidebar"></div>
              <div class="preview-content">
                <span></span><span></span><span></span>
                <strong></strong>
              </div>
            </div>
            <div class="preview-phone"></div>
            <div class="paper-plane"></div>
          </div>
        </aside>
        <div class="auth-form-panel">
          <div class="auth-card">
            <div class="auth-tabs ${isAdminAuth ? "single" : ""}">
              <button type="button" class="${activeTab === "user-login" || isAdminAuth ? "active" : ""}" data-auth="${isAdminAuth ? "admin-login" : "user-login"}">${isAdminAuth ? "অ্যাডমিন লগ ইন" : "লগ ইন"}</button>
              ${isAdminAuth ? "" : `<button type="button" class="${activeTab === "signup" ? "active" : ""}" data-auth="signup">সাইন আপ</button>`}
            </div>
            ${formMarkup}
          </div>
        </div>
      </div>
      <footer class="auth-footer">
        <span>© 2026 Siddhi SMS. সর্বস্বত্ব সংরক্ষিত।</span>
        <button type="button" data-auth="landing">গোপনীয়তা নীতি</button>
        <button type="button" data-auth="landing">শর্তাবলী</button>
        <button type="button" data-auth="forgot">সহায়তা</button>
      </footer>
    </section>
  `;
}

function userLogin() {
  return authExperience("user-login", userLoginForm());
}

function authIconInput(id, label, type, value, autocomplete, placeholder = "", icon = "✉") {
  return `
    <div class="field">
      <label for="${id}">${label}</label>
      <div class="auth-input-wrap">
        <input id="${id}" type="${type}" autocomplete="${autocomplete}" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}" />
        <span class="auth-input-icon">${icon}</span>
      </div>
    </div>
  `;
}

function authPasswordInput(id, label, value, autocomplete, visibleKey, placeholder = "") {
  const isVisible = Boolean(state.passwordVisible?.[visibleKey]);
  return `
    <div class="field">
      <label for="${id}">${label}</label>
      <div class="auth-input-wrap password-wrap">
        <input id="${id}" type="${isVisible ? "text" : "password"}" autocomplete="${autocomplete}" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}" />
        <button type="button" class="password-toggle" data-action="toggle-password" data-target="${visibleKey}" aria-label="${isVisible ? "Hide password" : "Show password"}">${isVisible ? "Hide" : "Show"}</button>
      </div>
    </div>
  `;
}

function userLoginForm() {
  return `
    <div class="auth-copy">
      <h2>স্বাগতম!</h2>
      <p>আপনার অ্যাকাউন্টে লগ ইন করুন</p>
    </div>
    <div class="form auth-form">
      ${authIconInput("login-email", "ইমেইল ঠিকানা", "email", state.loginEmail, "email", "আপনার ইমেইল লিখুন")}
      ${authPasswordInput("login-password", "পাসওয়ার্ড", state.loginPassword, "current-password", "login", "আপনার পাসওয়ার্ড লিখুন")}
      <div class="auth-options"><label class="check-label"><input id="remember-me" type="checkbox" ${state.rememberMe ? "checked" : ""} /> আমাকে মনে রাখুন</label><button type="button" class="link-button" data-auth="forgot">পাসওয়ার্ড ভুলেছেন?</button></div>
      <button type="button" class="primary auth-submit" data-action="user-login">লগ ইন করুন</button>
      <div class="auth-separator"><span>অথবা</span></div>
      <button class="secondary google-button" type="button"><span>G</span> Google দিয়ে লগ ইন করুন</button>
      <p class="auth-switch">আপনার অ্যাকাউন্ট নেই? <button type="button" data-auth="signup">সাইন আপ করুন</button></p>
    </div>
  `;
}

function adminLogin() {
  return `
    ${authExperience("admin-login", `
      <div class="auth-copy">
        <h2>অ্যাডমিন লগ ইন</h2>
        <p>প্ল্যাটফর্ম কন্ট্রোল সেন্টারে প্রবেশ করুন</p>
      </div>
      <div class="form auth-form">
        <p class="hint">Demo admin: admin@siddhisms.com / admin123</p>
        ${authIconInput("admin-email", "অ্যাডমিন ইমেইল", "email", state.adminEmail, "username")}
        ${authPasswordInput("admin-password", "পাসওয়ার্ড", state.adminPassword, "current-password", "admin")}
        <label class="check-label"><input id="remember-me" type="checkbox" ${state.rememberMe ? "checked" : ""} /> আমাকে মনে রাখুন</label>
        <button type="button" class="primary auth-submit" data-action="admin-login">অ্যাডমিন প্যানেলে যান</button>
      </div>
    `, "আপনার অপারেশন থাকুক সম্পূর্ণ নিয়ন্ত্রণে")}
  `;
}

function signup() {
  return authExperience("signup", `
    <div class="auth-copy">
      <h2>অ্যাকাউন্ট তৈরি করুন</h2>
      <p>সাইন আপের পর অ্যাডমিন অনুমোদন পেলেই লাইভ সেন্ডিং চালু হবে</p>
    </div>
    <div class="form auth-form signup-form">
      <div class="grid two">
        <div class="field"><label for="signup-name">আপনার নাম</label><input id="signup-name" autocomplete="name" value="${escapeHtml(state.signup.name)}" /></div>
        <div class="field"><label for="signup-company">কোম্পানির নাম</label><input id="signup-company" autocomplete="organization" value="${escapeHtml(state.signup.company)}" /></div>
      </div>
      <div class="grid two">
        <div class="field"><label for="signup-email">ইমেইল</label><input id="signup-email" type="email" autocomplete="email" value="${escapeHtml(state.signup.email)}" /></div>
        <div class="field"><label for="signup-phone">ফোন</label><input id="signup-phone" type="tel" autocomplete="tel" value="${escapeHtml(state.signup.phone)}" /></div>
      </div>
      <div class="grid two">
        <div class="field"><label for="signup-company-type">কোম্পানি টাইপ</label><select id="signup-company-type">${["E-commerce", "Education", "Healthcare", "ISP", "Finance", "Agency", "Other"].map(type => `<option ${state.signup.companyType === type ? "selected" : ""}>${type}</option>`).join("")}</select></div>
      </div>
      <div class="field"><label for="signup-address">ঠিকানা</label><input id="signup-address" autocomplete="street-address" value="${escapeHtml(state.signup.address)}" /></div>
      ${authPasswordInput("signup-password", "পাসওয়ার্ড", state.signup.password, "new-password", "signup")}
      <button type="button" class="primary auth-submit" data-action="signup-submit">অনুমোদনের জন্য জমা দিন</button>
      <p class="auth-switch">আগেই অ্যাকাউন্ট আছে? <button type="button" data-auth="user-login">লগ ইন করুন</button></p>
    </div>
  `);
}

function legacySignup() {
  return `
    <section class="panel auth-panel wide">
      <h2>Create Customer Account</h2>
      <p class="hint">After signup, admin must approve the account before live sending.</p>
      <div class="form">
        <div class="grid two">
          <div class="field"><label>Your name</label><input id="signup-name" value="${escapeHtml(state.signup.name)}" /></div>
          <div class="field"><label>Company name</label><input id="signup-company" value="${escapeHtml(state.signup.company)}" /></div>
        </div>
        <div class="grid two">
          <div class="field"><label>Email</label><input id="signup-email" value="${escapeHtml(state.signup.email)}" /></div>
          <div class="field"><label>Phone</label><input id="signup-phone" value="${escapeHtml(state.signup.phone)}" /></div>
        </div>
        <div class="grid two">
          <div class="field"><label>Company type</label><select id="signup-company-type">${["E-commerce", "Education", "Healthcare", "ISP", "Finance", "Agency", "Other"].map(type => `<option ${state.signup.companyType === type ? "selected" : ""}>${type}</option>`).join("")}</select></div>
        </div>
        <div class="field"><label>Address</label><input id="signup-address" value="${escapeHtml(state.signup.address)}" /></div>
        <div class="field"><label>Password</label><input id="signup-password" type="password" value="${escapeHtml(state.signup.password)}" /></div>
        <button class="primary" data-action="signup-submit">Submit for approval</button>
      </div>
    </section>
  `;
}

function forgot() {
  return authExperience("user-login", `
    <div class="auth-copy">
      <h2>পাসওয়ার্ড রিসেট</h2>
      <p>ইমেইল দিন, আমরা রিসেট অনুরোধ তৈরি করব</p>
    </div>
    <div class="form auth-form">
      ${authIconInput("forgot-email", "ইমেইল", "email", state.forgotEmail, "email")}
      <button type="button" class="primary auth-submit" data-action="forgot-submit">রিসেট অনুরোধ পাঠান</button>
      <button type="button" class="secondary" data-auth="user-login">লগ ইনে ফিরুন</button>
    </div>
  `, "নিরাপদ অ্যাক্সেস, দ্রুত পুনরুদ্ধার");
}

function resetPasswordView() {
  return authExperience("user-login", `
    <div class="auth-copy">
      <h2>Set new password</h2>
      <p>${state.resetEmail ? `Reset password for ${escapeHtml(state.resetEmail)}` : "Create a new secure password for your account"}</p>
    </div>
    <div class="form auth-form">
      ${authPasswordInput("reset-password", "New password", state.resetPassword, "new-password", "reset")}
      ${authPasswordInput("reset-password-confirm", "Confirm password", state.resetPasswordConfirm, "new-password", "resetConfirm")}
      <button type="button" class="primary auth-submit" data-action="reset-password-submit">Update password</button>
      <button type="button" class="secondary" data-auth="user-login">Back to login</button>
    </div>
  `, "নিরাপদ পাসওয়ার্ড, নিরাপদ অ্যাক্সেস");
}

function userDashboard() {
  const user = currentUser();
  const userPending = state.payments.filter(payment => payment.userId === user.id && payment.status === "Pending").length;
  const delivered = state.campaigns.reduce((sum, item) => sum + item.delivered, 0);
  const sent = state.campaigns.reduce((sum, item) => sum + item.sent, 0);
  return `
    ${liquidAreaChart("Wallet & Delivery", taka(user.balance), `${user.plan} package`, [
      { title: "Wallet", value: taka(user.balance), subtitle: "approved balance", tone: "green" },
      { title: "Delivered", value: delivered.toLocaleString(), subtitle: "campaign traffic", tone: "gold" },
      { title: "Contacts", value: state.contacts.length, subtitle: "available audience", tone: "green" },
      { title: "Pending", value: userPending, subtitle: "top-up request", tone: userPending ? "gold" : "green" }
    ])}
    <div class="grid metrics">
      ${metric("Wallet balance", taka(user.balance), `${user.plan} package`)}
      ${metric("Account", user.accountStatus, "Admin approval status", user.accountStatus === "Approved" ? "good" : "warn")}
      ${metric("Masking", user.maskingStatus, "Masking sender approval", user.maskingStatus === "Approved" ? "good" : "warn")}
      ${metric("Audiences", state.audiences.length, `${state.contacts.length} contacts available`)}
      ${metric("Pending top-up", userPending, "Admin approval required", userPending ? "warn" : "good")}
    </div>
    <div class="grid two" style="margin-top:16px">
      <section class="panel">
        <div class="between"><h2>Recent Campaigns</h2><button class="secondary" data-view="campaigns">Create campaign</button></div>
        ${campaignTable()}
      </section>
      <section class="panel">
        <h2>Next Steps</h2>
        <ul class="checklist">
          <li class="check"><span class="dot"></span><div><strong>Create audience</strong><p class="hint">Build New Customer, Student, Teacher or custom lists.</p></div></li>
          <li class="check"><span class="dot"></span><div><strong>Buy package</strong><p class="hint">Package price is added to wallet after admin completion.</p></div></li>
          <li class="check"><span class="dot"></span><div><strong>Send message</strong><p class="hint">Select audience from Quick Send or Campaigns.</p></div></li>
        </ul>
      </section>
    </div>
    <div class="grid two report-row">
      ${liquidDonut("Campaign Status", sent.toLocaleString(), [
        { label: "Success", value: Math.round((delivered / sent) * 100) },
        { label: "Waiting", value: 32 },
        { label: "Processing", value: 24 },
        { label: "Review", value: userPending ? 18 : 8 }
      ])}
      <section class="panel report-feed">
        <div class="between"><h2>Recent package orders</h2><button class="secondary" data-view="billing">Billing</button></div>
        <ul>${state.payments.filter(payment => payment.userId === user.id).slice(0, 4).map(payment => `<li><span>${escapeHtml(packageName(payment.packageId))}</span><b>${taka(payment.amount)}</b>${badge(payment.status)}</li>`).join("") || `<li><span>No package order yet</span><b>${taka(0)}</b>${badge("Ready")}</li>`}</ul>
      </section>
    </div>
  `;
}

function profile() {
  const user = currentUser();
  return `
    <div class="grid two">
      <section class="panel">
        <div class="profile-head">
          <span class="profile-avatar">${escapeHtml(user.avatar || initials(user.company))}</span>
          <div><h2>${escapeHtml(user.company)}</h2><p class="hint">${escapeHtml(user.name)} · ${escapeHtml(user.companyType)}</p></div>
        </div>
        <div class="form">
          <div class="grid two">
            <div class="field"><label>Name</label><input id="profile-name" value="${escapeHtml(user.name)}" /></div>
            <div class="field"><label>Company</label><input id="profile-company" value="${escapeHtml(user.company)}" /></div>
          </div>
          <div class="grid two">
            <div class="field"><label>Email</label><input id="profile-email" value="${escapeHtml(user.email)}" /></div>
            <div class="field"><label>Phone</label><input id="profile-phone" value="${escapeHtml(user.phone)}" /></div>
          </div>
          <div class="grid two">
            <div class="field"><label>Company type</label><select id="profile-company-type">${["E-commerce", "Education", "Healthcare", "ISP", "Finance", "Agency", "Other"].map(type => `<option ${user.companyType === type ? "selected" : ""}>${type}</option>`).join("")}</select></div>
            <div class="field"><label>Avatar initials</label><input id="profile-avatar" maxlength="2" value="${escapeHtml(user.avatar)}" /></div>
          </div>
          <div class="field"><label>Address</label><input id="profile-address" value="${escapeHtml(user.address)}" /></div>
          <button class="primary" data-action="save-profile">Save profile</button>
        </div>
      </section>
      <section class="panel">
        <h2>Approval Status</h2>
        <ul class="checklist">
          <li class="check"><span class="dot ${user.accountStatus === "Approved" ? "" : "warn"}"></span><div><strong>Account</strong><p class="hint">${user.accountStatus}</p></div></li>
          <li class="check"><span class="dot ${user.maskingStatus === "Approved" ? "" : "warn"}"></span><div><strong>Masking</strong><p class="hint">${user.maskingStatus}</p></div></li>
          <li class="check"><span class="dot"></span><div><strong>Wallet</strong><p class="hint">${taka(user.balance)}</p></div></li>
        </ul>
      </section>
    </div>
  `;
}

function masking() {
  const user = currentUser();
  const request = user.maskingRequest || {
    companyName: user.company || "",
    companyType: user.companyType || "E-commerce",
    otherCompanyType: "",
    binTax: user.binTax || "",
    website: "",
    email: user.email || "",
    phone: user.phone || "",
    documents: [],
    note: ""
  };
  return `
    <div class="grid two">
      <section class="panel">
        <h2>Masking Approval Request</h2>
        <p class="hint">Submit company information and required documents. Admin approves before Masking SMS is enabled.</p>
        <div class="form">
          <div class="field"><label>Company Name *</label><input id="mask-company-name" value="${escapeHtml(request.companyName)}" placeholder="Company Ltd." required /></div>
          <div class="grid two">
            <div class="field"><label>Company type *</label><select id="mask-company-type">${companyTypeOptions(request.companyType)}</select></div>
            <div class="field"><label>Other company type</label><input id="mask-company-type-other" value="${escapeHtml(request.otherCompanyType)}" ${request.companyType === "Other" ? "" : "disabled"} placeholder="Type your business category" /></div>
          </div>
          <div class="field"><label>BIN / TIN / Tax info *</label><input id="mask-bin-tax" value="${escapeHtml(request.binTax)}" placeholder="BIN-XXXX, TIN-XXXX" required /></div>
          <div class="field"><label>Company website</label><input id="mask-website" value="${escapeHtml(request.website)}" placeholder="https://example.com" /></div>
          <div class="grid two">
            <div class="field"><label>Company email *</label><input id="mask-email" value="${escapeHtml(request.email)}" placeholder="company@example.com" required /></div>
            <div class="field"><label>Company phone *</label><input id="mask-phone" value="${escapeHtml(request.phone)}" placeholder="017XXXXXXXX" required /></div>
          </div>
          <div class="field">
            <label>Company documents *</label>
            <label class="file-drop" for="mask-documents">
              <strong>Upload company documents</strong>
              <span>${request.documents?.length ? request.documents.map(documentDisplayName).map(escapeHtml).join(", ") : "No document selected yet"}</span>
            </label>
            <input id="mask-documents" class="file-input-hidden" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
            <span class="hint">Upload trade license, BIN/TIN certificate, company authorization or related documents.</span>
          </div>
          <button class="primary" data-action="submit-masking">Submit masking approval</button>
        </div>
      </section>
      <section class="panel">
        <h2>Current Status</h2>
        <ul class="checklist">
          <li class="check"><span class="dot ${user.maskingStatus === "Approved" ? "" : "warn"}"></span><div><strong>${user.maskingStatus}</strong><p class="hint">${user.maskingStatus === "Approved" ? "Masking SMS is enabled for this account." : "Admin approval required before using masking SMS."}</p></div></li>
          <li class="check"><span class="dot"></span><div><strong>Live masking rate</strong><p class="hint">${taka(state.platformRates.masking)} per segment/recipient</p></div></li>
        </ul>
      </section>
    </div>
  `;
}

function approvals() {
  const maskingRequests = sortedAdminUsers().filter(user => user.maskingRequest || user.maskingStatus !== "Not applied");
  const pendingCount = maskingRequests.filter(user => user.maskingStatus === "Pending").length;
  return `
    <section class="panel admin-panel">
      <div class="panel-head">
        <div><h2>Masking Approval Requests</h2><p class="hint">Review company identity, BIN/TIN and submitted documentation before enabling Masking SMS.</p></div>
        ${badge(`${pendingCount} pending`)}
      </div>
      ${maskingApprovalTable(maskingRequests)}
    </section>
  `;
}

function approvalUserTable(rows, type) {
  if (!rows.length) return `<p class="hint">No pending ${type} approvals.</p>`;
  return `<table><thead><tr><th>Company</th><th>Contact</th><th>Docs</th><th>Action</th></tr></thead><tbody>
    ${rows.map(user => `<tr>
      <td><strong>${escapeHtml(user.company)}</strong><p class="hint">${escapeHtml(user.companyType)} · ${escapeHtml(user.address)}</p></td>
      <td>${escapeHtml(user.name)}<p class="hint">${escapeHtml(user.email)} · ${escapeHtml(user.phone)}</p></td>
      <td>${escapeHtml(user.binTax || "No BIN/TIN")}<p class="hint">${escapeHtml(user.docs || "No docs")}</p></td>
      <td><button class="primary" data-action="${type === "account" ? "approve-account" : "approve-masking"}" data-id="${user.id}">Approve</button></td>
    </tr>`).join("")}
  </tbody></table>`;
}

function maskingApprovalCards(rows) {
  if (!rows.length) return `<p class="hint">No pending masking approvals.</p>`;
  return `<div class="package-list">${rows.map(user => `
    <article class="package-card">
      <div class="between">
        <div><h3>${escapeHtml(user.company)}</h3><p class="hint">${escapeHtml(user.companyType)} · ${escapeHtml(user.address)}</p></div>
        ${badge(user.maskingStatus)}
      </div>
      ${maskingRequestDetails(user)}
      <div class="row"><button class="secondary" data-action="view-masking" data-id="${user.id}">View</button><button class="primary" data-action="approve-masking" data-id="${user.id}">Approve masking</button><button class="danger" data-action="reject-masking" data-id="${user.id}">Reject</button></div>
    </article>
  `).join("")}</div>`;
}

function maskingApprovalTable(rows) {
  if (!rows.length) return `<div class="empty-state">No masking approval requests found.</div>`;
  return `
    <div class="table-shell">
      <table class="data-table masking-table">
        <thead><tr><th>User</th><th>Company</th><th>Company phone</th><th>Company email</th><th>BIN/TIN</th><th>Action</th></tr></thead>
        <tbody>${rows.map(user => {
          const request = user.maskingRequest || {};
          return `<tr>
            <td><strong>${escapeHtml(user.name)}</strong><span class="cell-sub">${escapeHtml(user.accountStatus || "")}</span></td>
            <td><strong>${escapeHtml(request.companyName || user.company)}</strong><span class="cell-sub">${escapeHtml(request.companyType || user.companyType || "Not submitted")} · ${badge(user.maskingStatus)}</span></td>
            <td><span class="cell-clip">${escapeHtml(request.phone || "Not submitted")}</span></td>
            <td><span class="cell-clip">${escapeHtml(request.email || "Not submitted")}</span></td>
            <td><span class="cell-clip">${escapeHtml(request.binTax || user.binTax || "Not submitted")}</span></td>
            <td>
              <div class="user-actions">
                <button class="secondary" data-action="view-masking" data-id="${user.id}">View</button>
                <details class="action-menu">
                  <summary>Edit</summary>
                  <div class="action-menu-panel">
                    <button class="primary" data-action="approve-masking" data-id="${user.id}">Approve masking</button>
                    <button class="danger" data-action="reject-masking" data-id="${user.id}">Reject</button>
                  </div>
                </details>
              </div>
            </td>
          </tr>`;
        }).join("")}</tbody>
      </table>
    </div>
  `;
}

function maskingRequestDetails(user) {
  const request = user.maskingRequest || {};
  return `
      <ul class="checklist">
        <li class="check"><span class="dot"></span><div><strong>Company</strong><p class="hint">${escapeHtml(request.companyName || user.company)} · ${escapeHtml(request.companyType || user.companyType)}${request.otherCompanyType ? ` (${escapeHtml(request.otherCompanyType)})` : ""}</p></div></li>
        <li class="check"><span class="dot"></span><div><strong>Contact</strong><p class="hint">${escapeHtml(request.email || user.email)} · ${escapeHtml(request.phone || user.phone)} · ${escapeHtml(request.website || "No website")}</p></div></li>
        <li class="check"><span class="dot"></span><div><strong>BIN/TIN</strong><p class="hint">${escapeHtml(request.binTax || "Not submitted")}</p></div></li>
        <li class="check"><span class="dot"></span><div><strong>Documents</strong><p class="hint">${request.documents?.length ? request.documents.map(escapeHtml).join(", ") : "No files uploaded"}</p></div></li>
      </ul>
  `;
}

function users() {
  const sortedUsers = sortedAdminUsers();
  const query = state.userSearch.trim().toLowerCase();
  const visibleUsers = query
    ? sortedUsers.filter(user => [user.name, user.email, user.company, user.phone].some(value => String(value || "").toLowerCase().includes(query)))
    : sortedUsers;
  const pendingAccounts = sortedUsers.filter(user => user.accountStatus !== "Approved");
  return `
    <div class="users-page-stack">
      <section class="panel admin-panel users-control-panel">
        <div class="panel-head">
          <div><h2>Users & Accounts</h2><p class="hint">Customer profiles, approval status, active plans, wallet balance and account controls.</p></div>
          ${badge(`${visibleUsers.length} shown`)}
        </div>
        <div class="user-search-row">
          <div>
            <label for="user-search">Search users</label>
            <input id="user-search" class="user-search-input" value="${escapeHtml(state.userSearch)}" placeholder="Search by name, email, company or phone" />
          </div>
          <p class="hint">Newest accounts appear first so fresh signups are easy to review.</p>
        </div>
        ${usersTable(visibleUsers)}
      </section>
      <section class="panel admin-panel">
        <div class="panel-head"><div><h2>Account Approvals</h2><p class="hint">Review new signups before allowing live sending.</p></div>${badge(`${pendingAccounts.length} pending`)}</div>
        <p class="hint">New registered users appear here first. View their profile details and approve after checking the information.</p>
        ${accountApprovalCards(pendingAccounts)}
      </section>
    </div>
  `;
}

function sortedAdminUsers() {
  return [...state.users].sort((a, b) => {
    const bTime = Date.parse(b.createdAt || "") || 0;
    const aTime = Date.parse(a.createdAt || "") || 0;
    if (bTime !== aTime) return bTime - aTime;
    return String(b.id || "").localeCompare(String(a.id || ""));
  });
}

function usersTable(rows = state.users) {
  if (!rows.length) {
    return `<div class="empty-state">No users match your search.</div>`;
  }
  return `
    <div class="table-shell">
      <table class="data-table users-table">
        <thead><tr><th>User</th><th>Email</th><th>Phone</th><th>Plan</th><th>Balance</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>${rows.map(user => `<tr>
          <td><strong>${escapeHtml(user.name)}</strong><span class="cell-sub">${escapeHtml(user.company)}</span></td>
          <td><span class="cell-clip">${escapeHtml(user.email)}</span></td>
          <td><span class="cell-clip">${escapeHtml(user.phone)}</span></td>
          <td>${escapeHtml(user.plan)}</td>
          <td>${taka(user.balance)}</td>
          <td>${badge(user.status)}</td>
          <td>
            <div class="user-actions">
              <button class="secondary" data-action="view-account" data-id="${user.id}">View</button>
              <details class="action-menu">
                <summary>Edit</summary>
                <div class="action-menu-panel">
                  ${user.status === "Suspended" ? `<button class="primary" data-action="activate-account" data-id="${user.id}">Activate</button>` : `<button class="secondary" data-action="deactivate-account" data-id="${user.id}">Deactivate</button>`}
                  <button class="secondary" data-action="send-reset" data-id="${user.id}">Reset link</button>
                  <button class="danger" data-action="delete-account" data-id="${user.id}">Delete</button>
                </div>
              </details>
            </div>
          </td>
        </tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function adminProfile() {
  return `
    <section class="panel admin-panel admin-profile-panel">
      <div class="panel-head">
        <div><h2>Admin Account Settings</h2><p class="hint">Change the admin profile email, contact details and password used for the admin portal.</p></div>
        ${badge("Secure")}
      </div>
      ${adminAccountSettings()}
    </section>
  `;
}

function userInfoRows(user) {
  const request = user.maskingRequest || {};
  return [
    ["User", user.name],
    ["Company", user.company],
    ["Email", user.email],
    ["Phone", user.phone],
    ["Address", user.address || "Not submitted"],
    ["Company type", user.companyType || "Not submitted"],
    ["Plan", user.plan],
    ["Wallet balance", taka(user.balance)],
    ["Account status", user.accountStatus],
    ["Login status", user.status],
    ["Masking status", user.maskingStatus],
    ["BIN / TIN", user.binTax || "Not submitted"],
    ["Documents", user.docs || "Not submitted"],
    ["Created", user.createdAt ? new Date(user.createdAt).toLocaleString("en-BD") : "Not available"],
    ["Masking company", request.companyName || "Not applied"],
    ["Masking contact", request.email || request.phone ? `${request.email || user.email} · ${request.phone || user.phone}` : "Not applied"],
    ["Admin note", request.note || "No note"]
  ];
}

function userDetailModal(user) {
  return `
    <div class="modal-backdrop" role="presentation">
      <section class="detail-modal" role="dialog" aria-modal="true" aria-labelledby="user-detail-title">
        <button class="modal-close" data-action="close-modal" aria-label="Close popup">×</button>
        <div class="modal-head">
          <div>
            <p class="eyebrow">Account Profile</p>
            <h2 id="user-detail-title">${escapeHtml(user.company || user.name)}</h2>
            <p class="hint">${escapeHtml(user.name)} · ${escapeHtml(user.email)}</p>
          </div>
          ${badge(user.status)}
        </div>
        <div class="modal-summary-grid">
          <span><small>Plan</small><strong>${escapeHtml(user.plan)}</strong></span>
          <span><small>Balance</small><strong>${taka(user.balance)}</strong></span>
          <span><small>Phone</small><strong>${escapeHtml(user.phone)}</strong></span>
        </div>
        <div class="modal-table-wrap">
          <table class="detail-table">
            <tbody>
              ${userInfoRows(user).map(([label, value]) => `
                <tr>
                  <th>${escapeHtml(label)}</th>
                  <td>${escapeHtml(value)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function requestDocuments(user) {
  const docs = user.maskingRequest?.documents;
  if (Array.isArray(docs) && docs.length) return docs;
  return String(user.docs || "")
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);
}

function documentDisplayName(documentValue) {
  return typeof documentValue === "object" && documentValue !== null ? documentValue.name || documentValue.fileName || "Submitted document" : String(documentValue || "");
}

function documentStoredUrl(documentValue) {
  if (typeof documentValue === "object" && documentValue !== null) return documentValue.url || documentValue.dataUrl || documentValue.publicUrl || "";
  return "";
}

function isOpenableDocument(value) {
  return /^(https?:|blob:|data:)/i.test(String(value || ""));
}

function documentUrlFor(user, documentValue) {
  const documentName = documentDisplayName(documentValue);
  const storedUrl = documentStoredUrl(documentValue);
  return storedUrl || state.documentUrls?.[user.id]?.[documentName] || (isOpenableDocument(documentName) ? documentName : "");
}

function documentLinks(user) {
  const docs = requestDocuments(user);
  if (!docs.length) return "No documents uploaded";
  return docs.map(documentValue => {
    const documentName = documentDisplayName(documentValue);
    const directUrl = typeof documentValue === "string" && isOpenableDocument(documentValue) ? documentUrlFor(user, documentValue) : "";
    const documentId = typeof documentValue === "object" && documentValue !== null ? documentValue.id || "" : "";
    return `<button class="document-link" data-action="open-document" data-id="${user.id}" data-document-id="${escapeHtml(documentId)}" data-doc="${escapeHtml(documentName)}" data-url="${escapeHtml(directUrl)}">View Documents</button><span class="document-name">${escapeHtml(documentName)}</span>`;
  }).join("");
}

function maskingInfoRows(user) {
  const request = user.maskingRequest || {};
  return [
    ["User", escapeHtml(user.name)],
    ["Company", escapeHtml(request.companyName || user.company)],
    ["Company type", escapeHtml(request.companyType || user.companyType || "Not submitted")],
    ["Company phone", escapeHtml(request.phone || "Not submitted")],
    ["Company email", escapeHtml(request.email || "Not submitted")],
    ["Website", escapeHtml(request.website || "No website submitted")],
    ["Address", escapeHtml(user.address || "Not submitted")],
    ["BIN / TIN", escapeHtml(request.binTax || user.binTax || "Not submitted")],
    ["Masking status", badge(user.maskingStatus)],
    ["Documents", documentLinks(user)],
    ["Admin note", escapeHtml(request.note || "No note")]
  ];
}

function maskingDetailModal(user) {
  const request = user.maskingRequest || {};
  return `
    <div class="modal-backdrop" role="presentation">
      <section class="detail-modal" role="dialog" aria-modal="true" aria-labelledby="masking-detail-title">
        <button class="modal-close" data-action="close-modal" aria-label="Close popup">×</button>
        <div class="modal-head">
          <div>
            <p class="eyebrow">Masking Approval Request</p>
            <h2 id="masking-detail-title">${escapeHtml(request.companyName || user.company)}</h2>
            <p class="hint">${escapeHtml(user.name)} · ${escapeHtml(request.email || "No company email")}</p>
          </div>
          ${badge(user.maskingStatus)}
        </div>
        <div class="modal-summary-grid">
          <span><small>Company phone</small><strong>${escapeHtml(request.phone || "Missing")}</strong></span>
          <span><small>BIN/TIN</small><strong>${escapeHtml(request.binTax || user.binTax || "Missing")}</strong></span>
          <span><small>Documents</small><strong>${requestDocuments(user).length} file(s)</strong></span>
        </div>
        <div class="modal-table-wrap">
          <table class="detail-table">
            <tbody>
              ${maskingInfoRows(user).map(([label, value]) => `
                <tr>
                  <th>${escapeHtml(label)}</th>
                  <td>${value}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function renderModal() {
  let host = document.querySelector("#modal-root");
  if (!host) {
    host = document.createElement("div");
    host.id = "modal-root";
    document.body.appendChild(host);
  }
  if (!state.modal) {
    host.innerHTML = "";
    return;
  }
  if (state.modal.type === "user") {
    const user = state.users.find(item => item.id === state.modal.id);
    host.innerHTML = user ? userDetailModal(user) : "";
  }
  if (state.modal.type === "masking") {
    const user = state.users.find(item => item.id === state.modal.id);
    host.innerHTML = user ? maskingDetailModal(user) : "";
  }
}

function adminAccountSettings() {
  const profile = state.adminProfile || {};
  return `
    <div class="form admin-settings-form">
      <div class="grid two">
        <div class="field"><label>Admin name</label><input id="admin-profile-name" value="${escapeHtml(profile.name || "")}" /></div>
        <div class="field"><label>Company</label><input id="admin-profile-company" value="${escapeHtml(profile.company || "")}" /></div>
      </div>
      <div class="grid two">
        <div class="field"><label>Admin email</label><input id="admin-profile-email" value="${escapeHtml(profile.email || "")}" /></div>
        <div class="field"><label>Phone</label><input id="admin-profile-phone" value="${escapeHtml(profile.phone || "")}" /></div>
      </div>
      <div class="grid two">
        <div class="field"><label>New password</label><input id="admin-profile-password" type="password" value="${escapeHtml(profile.newPassword || "")}" placeholder="Leave blank to keep current password" /></div>
        <div class="field"><label>Confirm new password</label><input id="admin-profile-confirm" type="password" value="${escapeHtml(profile.confirmPassword || "")}" /></div>
      </div>
      <div class="button-row"><button class="primary" data-action="save-admin-profile">Save admin account</button></div>
    </div>
  `;
}

function accountApprovalCards(rows) {
  if (!rows.length) return `<p class="hint">No pending account approvals.</p>`;
  return `<div class="package-list">${rows.map(user => `
    <article class="package-card">
      <div class="between">
        <div><h3>${escapeHtml(user.company)}</h3><p class="hint">${escapeHtml(user.name)} · ${escapeHtml(user.companyType)}</p></div>
        ${badge(user.accountStatus)}
      </div>
      <div class="package-stats approval-stats">
        <span><small>Email</small><strong>${escapeHtml(user.email)}</strong></span>
        <span><small>Phone</small><strong>${escapeHtml(user.phone)}</strong></span>
        <span><small>Balance</small><strong>${taka(user.balance)}</strong></span>
      </div>
      <p class="hint">${escapeHtml(user.address || "No address submitted")}</p>
      <div class="button-row"><button class="secondary" data-action="view-account" data-id="${user.id}">View</button><button class="primary" data-action="approve-account" data-id="${user.id}">Approve account</button></div>
    </article>
  `).join("")}</div>`;
}

function quick() {
  if (!userCanUseMasking() && state.quickType === "masking") state.quickType = "transactional";
  const selectedContacts = state.quickMode === "audience" ? optedInContacts(state.quickAudienceId) : [];
  const recipients = state.quickMode === "audience" ? selectedContacts.length : 1;
  const info = smsInfo(state.quickText, state.quickType);
  const phoneOk = /^01[3-9]\d{8}$/.test(state.quickPhone);
  const senderOk = /^[A-Za-z0-9 ]{1,11}$/.test(state.quickSenderId);
  const wallet = state.mode === "admin" ? state.balance : currentUser().balance;
  const cost = state.quickChannel === "sms" ? info.cost * recipients : 0;
  return `
    <div class="grid two">
      <section class="panel">
        <h2>Quick Send</h2>
        <div class="form">
          <div class="grid three">
            <div class="field"><label>Send mode</label><select id="quick-mode"><option value="single" ${state.quickMode === "single" ? "selected" : ""}>Single recipient</option><option value="audience" ${state.quickMode === "audience" ? "selected" : ""}>Audience list</option></select></div>
            <div class="field"><label>Channel</label><select id="quick-channel"><option value="sms" ${state.quickChannel === "sms" ? "selected" : ""}>SMS</option><option value="email" ${state.quickChannel === "email" ? "selected" : ""}>Email</option></select></div>
            <div class="field"><label>SMS type</label><select id="quick-type">${smsTypeOptions(state.quickType)}</select>${userCanUseMasking() ? "" : `<span class="hint">Masking SMS is locked until admin approves your masking request.</span>`}</div>
          </div>
          ${state.quickMode === "single" ? `
            <div class="grid two">
              <div class="field"><label>Recipient number</label><input id="quick-phone" value="${escapeHtml(state.quickPhone)}" maxlength="11" placeholder="017XXXXXXXX" /><span class="hint">${phoneOk ? "Valid Bangladesh mobile number format." : "Use 11 digits starting with 013-019."}</span></div>
              <div class="field"><label>Sender ID</label><input id="quick-sender" value="${escapeHtml(state.quickSenderId)}" maxlength="11" /><span class="hint">${senderOk ? "Approval-friendly sender format." : "Maximum 11 alphanumeric characters."}</span></div>
            </div>
          ` : `
            <div class="grid two">
              <div class="field"><label>Audience</label><select id="quick-audience">${audienceOptions(state.quickAudienceId)}</select><span class="hint">${selectedContacts.length} opted-in recipient(s) selected.</span></div>
              <div class="field"><label>Sender ID</label><input id="quick-sender" value="${escapeHtml(state.quickSenderId)}" maxlength="11" /></div>
            </div>
          `}
          ${state.quickChannel === "email" ? `<div class="field"><label>Email subject</label><input id="quick-email-subject" value="${escapeHtml(state.quickEmailSubject)}" /></div>` : ""}
          <div class="field">
            <label>Message</label>
            <textarea id="quick-text">${escapeHtml(state.quickText)}</textarea>
            <span class="hint" id="quick-hint">${state.quickChannel === "sms" ? formatSmsHint(info, recipients) : "Email demo mode · no SMS wallet cost deducted"}</span>
          </div>
          ${composerEnhancements("quick", state.quickText, state.quickMode === "audience" ? selectedContacts[0] : { name: "Customer", phone: state.quickPhone, email: "customer@example.com" })}
          <div class="row">
            <button class="primary" data-action="send-quick">Send ${state.quickChannel === "sms" ? "SMS" : "email"}</button>
            <button class="secondary" data-action="quick-otp">Use OTP template</button>
            <button class="secondary" data-action="quick-due">Use due reminder</button>
          </div>
        </div>
      </section>
      <section class="panel">
        <h2>Send Summary</h2>
        <ul class="checklist">
          <li class="check"><span class="dot"></span><div><strong>Recipients</strong><p class="hint">${state.quickMode === "audience" ? `${selectedContacts.length} from ${audienceName(state.quickAudienceId)}` : state.quickPhone}</p></div></li>
          <li class="check"><span class="dot ${senderOk ? "" : "bad"}"></span><div><strong>Sender</strong><p class="hint">${escapeHtml(state.quickSenderId)}</p></div></li>
          <li class="check"><span class="dot"></span><div><strong>Cost</strong><p class="hint">${state.quickChannel === "sms" ? `${taka(cost)} · ${rateExplain(state.quickType, recipients, info.segments)}` : "Email demo, no charge"}</p></div></li>
          <li class="check"><span class="dot ${wallet - cost >= 0 ? "" : "bad"}"></span><div><strong>Wallet after send</strong><p class="hint">${wallet - cost >= 0 ? taka(wallet - cost) : "Insufficient balance"}</p></div></li>
        </ul>
      </section>
    </div>
  `;
}

function campaigns() {
  if (!userCanUseMasking() && state.campaignType === "masking") state.campaignType = "transactional";
  const recipients = optedInContacts(state.campaignAudienceId).length;
  const info = smsInfo(state.smsText, state.campaignType);
  return `
    <div class="grid two">
      <section class="panel">
        <h2>Create Campaign</h2>
        <div class="form">
          <div class="grid three">
            <div class="field"><label>Campaign type</label><select id="campaign-type">${smsTypeOptions(state.campaignType)}</select>${userCanUseMasking() ? "" : `<span class="hint">Masking campaigns are locked until admin approval.</span>`}</div>
            <div class="field"><label>Sender ID</label><input id="sender-id" value="${escapeHtml(state.senderId)}" maxlength="11" /></div>
            <div class="field"><label>Audience</label><select id="campaign-audience">${audienceOptions(state.campaignAudienceId)}</select><span class="hint">${recipients} opted-in recipient(s)</span></div>
          </div>
          <div class="field">
            <label>Message</label>
            <textarea id="sms-text">${escapeHtml(state.smsText)}</textarea>
            <span class="hint" id="sms-hint">${formatSmsHint(info, recipients)}</span>
          </div>
          ${composerEnhancements("campaign", state.smsText, optedInContacts(state.campaignAudienceId)[0])}
          <div class="row">
            <button class="primary" data-action="send-campaign">Queue campaign</button>
            <button class="secondary" data-action="ai-copy">Improve Bangla copy</button>
          </div>
        </div>
      </section>
      <section class="panel">
        <h2>Preflight Checks</h2>
        <ul class="checklist">${preflight(recipients).map(item => `<li class="check"><span class="dot ${item.level}"></span><div><strong>${item.title}</strong><p class="hint">${item.body}</p></div></li>`).join("")}</ul>
        <div class="check" style="margin-top:10px"><span class="dot"></span><div><strong>Live rate calculation</strong><p class="hint">${rateExplain(state.campaignType, recipients, info.segments)} · total ${taka(info.cost * recipients)}</p></div></div>
      </section>
    </div>
    <section class="panel" style="margin-top:16px"><h2>Campaign History</h2>${campaignTable()}</section>
  `;
}

function preflight(recipients) {
  const info = smsInfo(state.smsText, state.campaignType);
  const isPromo = state.campaignType === "promotional";
  const senderOk = /^[A-Za-z0-9 ]{1,11}$/.test(state.senderId);
  return [
    { level: recipients ? "" : "bad", title: "Audience recipients", body: recipients ? `${recipients} opted-in contacts ready.` : "No opted-in contact found in this audience." },
    { level: senderOk ? "" : "bad", title: "Sender ID format", body: senderOk ? "Maximum 11 alphanumeric characters." : "Sender ID needs approval-friendly alphanumeric text." },
    { level: isPromo && !info.hasBangla ? "warn" : "", title: "Bangla promotional copy", body: isPromo ? "Promotional campaigns should use Bangla copy for local compliance." : "Not required for this campaign type." },
    { level: "", title: "DND suppression", body: "DND contacts are excluded before cost calculation." }
  ];
}

function campaignTable() {
  return `
    <table>
      <thead><tr><th>Campaign</th><th>Type</th><th>Audience</th><th>Sent</th><th>Delivered</th><th>Status</th></tr></thead>
      <tbody>${state.campaigns.map(c => `<tr><td>${escapeHtml(c.name)}</td><td>${escapeHtml(c.type)}</td><td>${escapeHtml(audienceName(c.audienceId))}</td><td>${c.sent.toLocaleString()}</td><td>${c.delivered.toLocaleString()}</td><td>${badge(c.status)}</td></tr>`).join("")}</tbody>
    </table>
  `;
}

function contacts() {
  const selectedAudience = state.audiences.find(audience => audience.id === state.selectedAudienceId) || state.audiences[0];
  if (selectedAudience && state.selectedAudienceId !== selectedAudience.id) state.selectedAudienceId = selectedAudience.id;
  const selectedContacts = selectedAudience ? audienceContacts(selectedAudience.id) : [];
  const opted = selectedAudience ? optedInContacts(selectedAudience.id).length : 0;
  return `
    <div class="grid two">
      <section class="panel">
        <div class="between"><h2>Audience Builder</h2><button class="secondary" data-action="seed-audiences">Add sample audience</button></div>
        <div class="form">
          <div class="field"><label>Create audience</label><div class="row"><input id="new-audience-name" value="${escapeHtml(state.newAudienceName)}" placeholder="Example: VIP Customers" /><button class="primary" data-action="create-audience">Create</button></div></div>
        </div>
        <div class="audience-grid" style="margin-top:16px">${state.audiences.map(audienceCard).join("")}</div>
      </section>
      <section class="panel">
        <h2>Import Contacts</h2>
        <div class="form">
          <div class="field"><label>Audience</label><select id="manual-audience">${audienceOptions(state.manualContact.audienceId)}</select></div>
          <div class="tabs import-tabs">
            <span class="tab active">Single import</span>
            <span class="tab active">Google Sheet upload</span>
          </div>
          <h3>Single import</h3>
          <div class="grid two">
            <div class="field"><label>Name</label><input id="manual-name" value="${escapeHtml(state.manualContact.name)}" placeholder="Customer name" /></div>
            <div class="field"><label>Phone</label><input id="manual-phone" value="${escapeHtml(state.manualContact.phone)}" placeholder="017XXXXXXXX" /></div>
          </div>
          <div class="field"><label>Email</label><input id="manual-email" value="${escapeHtml(state.manualContact.email)}" placeholder="name@example.com" /></div>
          <button class="primary" data-action="add-manual-contact">Add manual contact</button>
          <h3>Google Sheet upload</h3>
          <div class="field">
            <label>Upload Google Sheet export</label>
            <label class="file-drop" for="google-sheet-file">
              <strong>Choose Google Sheet CSV/XLSX</strong>
              <span>${state.googleSheetFileName ? escapeHtml(state.googleSheetFileName) : "No file selected yet"}</span>
            </label>
            <input id="google-sheet-file" class="file-input-hidden" type="file" accept=".csv,.tsv,.xlsx,text/csv,text/tab-separated-values,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
            <span class="hint">Upload a CSV or XLSX export with columns: name, phone, email.</span>
          </div>
          <div class="check"><span class="dot"></span><div><strong>Loaded file</strong><p class="hint">${state.googleSheetFileName ? `${escapeHtml(state.googleSheetFileName)} · ${state.googleSheetRows.length} valid contact(s) ready` : "No Google Sheet file loaded yet."}</p></div></div>
          <button class="secondary" data-action="import-google-sheet">Import Google Sheet contacts</button>
        </div>
      </section>
    </div>
    ${selectedAudience ? `
    <section class="panel audience-detail" style="margin-top:16px">
      <div class="between">
        <div>
          <p class="eyebrow">Audience Detail</p>
          <h2>${escapeHtml(selectedAudience.name)}</h2>
          <p class="hint">${escapeHtml(selectedAudience.description)} · ${selectedContacts.length} contacts · ${opted} opted-in</p>
        </div>
        <div class="row">
          <button class="secondary" data-action="edit-audience" data-id="${selectedAudience.id}">Edit audience</button>
          <button class="secondary" data-action="clean-audience-duplicates" data-id="${selectedAudience.id}">Clean duplicates</button>
          <button class="danger" data-action="delete-audience" data-id="${selectedAudience.id}">Delete audience</button>
        </div>
      </div>
      ${state.editingAudienceId === selectedAudience.id ? `
        <div class="form inline-editor">
          <div class="grid two">
            <div class="field"><label>Audience name</label><input id="audience-edit-name" value="${escapeHtml(state.audienceDraft.name)}" /></div>
            <div class="field"><label>Description</label><input id="audience-edit-description" value="${escapeHtml(state.audienceDraft.description)}" /></div>
          </div>
          <div class="row"><button class="primary" data-action="save-audience" data-id="${selectedAudience.id}">Save audience</button><button class="secondary" data-action="cancel-audience-edit">Cancel</button></div>
        </div>
      ` : ""}
      <table>
        <thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Actions</th></tr></thead>
        <tbody>${selectedContacts.length ? selectedContacts.map(contactRow).join("") : `<tr><td colspan="4">No contacts in this audience yet.</td></tr>`}</tbody>
      </table>
    </section>
    ` : ""}
    <section class="panel" style="margin-top:16px">
      <div class="between"><h2>All Contacts</h2><button class="secondary" data-action="clean-list">Clean all duplicates</button></div>
      <table>
        <thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Audience</th><th>Operator</th><th>Consent</th></tr></thead>
        <tbody>${state.contacts.map(c => `<tr><td>${escapeHtml(c.name)}</td><td>${escapeHtml(c.phone)}</td><td>${escapeHtml(c.email)}</td><td>${escapeHtml(audienceName(c.audienceId))}</td><td>${escapeHtml(c.operator)}</td><td>${badge(c.consent)}</td></tr>`).join("")}</tbody>
      </table>
    </section>
  `;
}

function audienceCard(audience) {
  const total = audienceContacts(audience.id).length;
  const opted = optedInContacts(audience.id).length;
  const active = state.selectedAudienceId === audience.id ? "active" : "";
  return `<article class="audience-card ${active}">
    <button class="audience-open" data-action="view-audience" data-id="${audience.id}">
      <span>${escapeHtml(audience.name)}</span>
      <strong>${total}</strong>
      <small>${escapeHtml(audience.description)}</small>
      <em>${opted} opted-in · ${total - opted} blocked/DND</em>
    </button>
    <div class="row">
      <button class="secondary" data-action="select-audience-campaign" data-id="${audience.id}">Campaign</button>
      <button class="secondary" data-action="select-audience-quick" data-id="${audience.id}">Quick</button>
      <button class="secondary" data-action="edit-audience" data-id="${audience.id}">Edit</button>
      <button class="danger" data-action="delete-audience" data-id="${audience.id}">Delete</button>
    </div>
  </article>`;
}

function contactRow(contact) {
  if (state.editingContactId === contact.id) {
    return `<tr>
      <td data-label="Name"><input id="contact-edit-name" value="${escapeHtml(state.contactDraft.name)}" /></td>
      <td data-label="Phone"><input id="contact-edit-phone" value="${escapeHtml(state.contactDraft.phone)}" maxlength="11" /></td>
      <td data-label="Email"><input id="contact-edit-email" value="${escapeHtml(state.contactDraft.email)}" /></td>
      <td data-label="Actions"><div class="row"><button class="primary" data-action="save-contact" data-id="${contact.id}">Save</button><button class="secondary" data-action="cancel-contact-edit">Cancel</button></div></td>
    </tr>`;
  }
  return `<tr>
    <td data-label="Name">${escapeHtml(contact.name)}</td>
    <td data-label="Phone">${escapeHtml(contact.phone)}</td>
    <td data-label="Email">${escapeHtml(contact.email)}</td>
    <td data-label="Actions"><div class="row"><button class="secondary" data-action="edit-contact" data-id="${contact.id}">Edit</button><button class="danger" data-action="delete-contact" data-id="${contact.id}">Delete</button></div></td>
  </tr>`;
}

function packages() {
  if (state.mode === "user") return userPackages();
  return `
    <div class="grid two">
      <section class="panel">
        <h2>SMS Rate Setup</h2>
        <p class="hint">These live rates automatically appear in every user's Billing screen and are used for send-cost calculation.</p>
        <div class="form">
          <div class="grid three">
            <div class="field"><label>Non-masking rate</label><input id="rate-nonmasking" inputmode="decimal" value="${state.rateDraft.nonMasking}" /></div>
            <div class="field"><label>Masking rate</label><input id="rate-masking" inputmode="decimal" value="${state.rateDraft.masking}" /></div>
            <div class="field"><label>OTP rate</label><input id="rate-otp" inputmode="decimal" value="${state.rateDraft.otp}" /></div>
          </div>
          <button class="primary" data-action="save-rates">Publish rates</button>
        </div>
      </section>
      <section class="panel">
        <h2>Current Published Rates</h2>
        <ul class="checklist">
          <li class="check"><span class="dot"></span><div><strong>Non-masking</strong><p class="hint">${taka(state.platformRates.nonMasking)} per message</p></div></li>
          <li class="check"><span class="dot"></span><div><strong>Masking</strong><p class="hint">${taka(state.platformRates.masking)} per message</p></div></li>
          <li class="check"><span class="dot"></span><div><strong>OTP</strong><p class="hint">${taka(state.platformRates.otp)} per message</p></div></li>
        </ul>
      </section>
    </div>
    <div class="grid two" style="margin-top:16px">
      <section class="panel">
        <h2>Package Setup</h2>
        <div class="form">
          <div class="grid two">
            <div class="field"><label>Package name</label><input id="package-name" value="${escapeHtml(state.packageDraft.name)}" /></div>
            <div class="field"><label>Package type</label><select id="package-type">${packageTypeOptions(state.packageDraft.type)}</select><span class="hint">Selected type uses live ${packageTypeLabel(state.packageDraft.type)} rate: ${taka(packageRateForType(state.packageDraft.type))}</span></div>
          </div>
          <div class="grid two">
            <div class="field"><label>Price</label><input id="package-price" inputmode="numeric" value="${state.packageDraft.price}" /></div>
          </div>
          <div class="field"><label>Rate per SMS</label><input id="package-rate" inputmode="decimal" value="${state.packageDraft.rate}" /><span class="hint">Auto-filled from admin published ${packageTypeLabel(state.packageDraft.type)} rate. You can override for this package.</span></div>
          <button class="primary" data-action="create-package">Publish package</button>
        </div>
      </section>
      <section class="panel"><h2>Published Packages</h2>${packageTable(true)}</section>
    </div>
  `;
}

function userPackages() {
  return `
    <section class="panel">
      <h2>Buy SMS Package</h2>
      <p class="hint">Submit bKash/Nagad transaction ID. Admin approves the payment and credits your wallet.</p>
      <div class="grid three">${state.packages.map(pkg => {
        const locked = state.mode === "user" && pkg.type === "masking" && currentUser().maskingStatus !== "Approved";
        return `
        <article class="panel">
          <h2>${escapeHtml(pkg.name)}</h2>
          <p class="hint">Adds ${taka(pkg.price)} to wallet after admin completion</p>
          <p>${badge(packageTypeLabel(pkg.type))}</p>
          <h1>${taka(pkg.price)}</h1>
          <p class="hint">${taka(pkg.rate)} per SMS</p>
          ${locked ? `<p class="hint">Masking approval required before buying this package.</p>` : ""}
          <div class="row"><button class="primary" data-action="buy-package" data-id="${pkg.id}" data-method="bKash" ${locked ? "disabled" : ""}>Pay bKash</button><button class="secondary" data-action="buy-package" data-id="${pkg.id}" data-method="Nagad" ${locked ? "disabled" : ""}>Pay Nagad</button></div>
        </article>
      `;
      }).join("")}</div>
    </section>
  `;
}

function packageTable(includeStatus = false) {
  return `<div class="package-list">${state.packages.map(pkg => {
    if (state.editingPackageId === pkg.id) {
      return `<article class="package-card editing">
        <div class="form">
          <div class="grid two">
            <div class="field"><label>Name</label><input id="package-edit-name" value="${escapeHtml(state.packageEditDraft.name)}" /></div>
            <div class="field"><label>Type</label><select id="package-edit-type">${packageTypeOptions(state.packageEditDraft.type)}</select></div>
          </div>
          <div class="grid two">
            <div class="field"><label>Price</label><input id="package-edit-price" inputmode="numeric" value="${state.packageEditDraft.price}" /></div>
            <div class="field"><label>Rate</label><input id="package-edit-rate" inputmode="decimal" value="${state.packageEditDraft.rate}" /></div>
          </div>
          ${includeStatus ? `<div class="row"><button class="primary" data-action="save-package" data-id="${pkg.id}">Save package</button><button class="secondary" data-action="cancel-package-edit">Cancel</button></div>` : ""}
        </div>
      </article>`;
    }
    return `<article class="package-card">
      <div>
        <h3>${escapeHtml(pkg.name)}</h3>
        <div class="row">${badge(pkg.status)} ${badge(packageTypeLabel(pkg.type))}</div>
      </div>
      <div class="package-stats">
        <span><small>Wallet credit</small><strong>${taka(pkg.price)}</strong></span>
        <span><small>Rate</small><strong>${taka(pkg.rate)}</strong></span>
        <span><small>Billing type</small><strong>${packageTypeLabel(pkg.type)}</strong></span>
      </div>
      ${includeStatus ? `<div class="row"><button class="secondary" data-action="edit-package" data-id="${pkg.id}">Edit</button><button class="danger" data-action="delete-package" data-id="${pkg.id}">Delete</button></div>` : ""}
    </article>`;
  }).join("")}</div>`;
}

function payments() {
  const pending = state.payments.filter(payment => payment.status === "Pending").length;
  const completed = state.payments.filter(payment => payment.status === "Completed").length;
  return `
    <div class="grid metrics">
      ${metric("Pending review", pending, "Manual or webhook verification", pending ? "warn" : "good")}
      ${metric("Completed orders", completed, "Wallet credited once")}
      ${metric("bKash", state.gatewaySettings.bkash, "Add merchant credentials in server env", "warn")}
      ${metric("Nagad", state.gatewaySettings.nagad, "Add merchant credentials in server env", "warn")}
    </div>
    <div class="grid two" style="margin-top:16px">
      <section class="panel">
        <h2>Payment Approval</h2>
        <table>
          <thead><tr><th>User</th><th>Package</th><th>Method</th><th>TRX ID</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>${state.payments.map(payment => {
            const user = state.users.find(item => item.id === payment.userId);
            const pkg = state.packages.find(item => item.id === payment.packageId);
            return `<tr><td>${escapeHtml(user?.name)}</td><td>${escapeHtml(pkg?.name)}</td><td>${payment.method}</td><td>${escapeHtml(payment.trx)}</td><td>${taka(payment.amount)}</td><td>${badge(payment.status)}</td><td>${payment.status === "Pending" ? `<button class="primary" data-action="approve-payment" data-id="${payment.id}">Complete</button>` : "Credited"}</td></tr>`;
          }).join("")}</tbody>
        </table>
      </section>
      <section class="panel">
        <h2>Gateway Setup</h2>
        <ul class="checklist">
          <li class="check"><span class="dot warn"></span><div><strong>bKash Tokenized Checkout</strong><p class="hint">Set BKASH_APP_KEY, BKASH_APP_SECRET, BKASH_USERNAME and BKASH_PASSWORD in server environment.</p></div></li>
          <li class="check"><span class="dot warn"></span><div><strong>Nagad merchant checkout</strong><p class="hint">Set NAGAD_MERCHANT_ID, NAGAD_PUBLIC_KEY and NAGAD_PRIVATE_KEY after merchant onboarding.</p></div></li>
          <li class="check"><span class="dot"></span><div><strong>Manual fallback</strong><p class="hint">Customers can submit TRX IDs; admin completes the order after checking payment.</p></div></li>
        </ul>
      </section>
    </div>
  `;
}

function orders() {
  const activeOrders = state.payments.filter(payment => ["Pending", "Processing"].includes(payment.status));
  const completed = state.payments.filter(payment => !["Pending", "Processing"].includes(payment.status));
  const selectedOrder = state.payments.find(payment => payment.id === state.selectedOrderId) || activeOrders[0] || state.payments[0];
  if (selectedOrder && state.selectedOrderId !== selectedOrder.id) state.selectedOrderId = selectedOrder.id;
  return `
    <div class="admin-split orders-layout">
      <section class="panel admin-panel">
        <div class="panel-head"><div><h2>New Orders</h2><p class="hint">Approve after matching the customer transaction with received money.</p></div>${badge(`${activeOrders.length} active`)}</div>
        <p class="hint">When a customer buys a package, it appears here. Approve only after you verify the bKash/Nagad transaction and received money.</p>
        ${orderTable(activeOrders, true)}
      </section>
      <section class="panel admin-panel detail-panel">
        <div class="panel-head"><div><h2>Order Details</h2><p class="hint">Selected payment request and wallet-credit status.</p></div></div>
        ${selectedOrder ? orderDetails(selectedOrder) : `<p class="hint">Select an order to view details.</p>`}
      </section>
    </div>
    <section class="panel admin-panel" style="margin-top:16px">
      <div class="panel-head"><div><h2>Processed Orders</h2><p class="hint">Completed, cancelled, and already reviewed package orders.</p></div>${badge(`${completed.length} processed`)}</div>
      ${orderTable(completed, true)}
    </section>
  `;
}

function orderTable(rows, actionable) {
  if (!rows.length) return `<p class="hint">No orders found.</p>`;
  return `
    <div class="table-shell">
      <table class="data-table order-table">
        <thead><tr><th>Customer</th><th>Package</th><th>Type</th><th>Payment</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>${rows.map(payment => {
        const user = state.users.find(item => item.id === payment.userId);
        const pkg = state.packages.find(item => item.id === payment.packageId);
        return `<tr>
          <td><strong>${escapeHtml(user?.name || "Unknown")}</strong><span class="cell-sub">${escapeHtml(user?.email || user?.company || "")}</span></td>
          <td><strong>${escapeHtml(pkg?.name || "Deleted package")}</strong><span class="cell-sub">${escapeHtml(payment.id)}</span></td>
          <td>${pkg ? badge(packageTypeLabel(pkg.type)) : badge("Unknown")}</td>
          <td><strong>${escapeHtml(payment.method)}</strong><span class="cell-sub">TRX ${escapeHtml(payment.trx)}</span></td>
          <td>${taka(payment.amount)}</td>
          <td>${badge(payment.status)}</td>
          <td><div class="action-stack"><button class="secondary" data-action="view-order" data-id="${payment.id}">View</button><button class="secondary" data-action="edit-order" data-id="${payment.id}">Edit</button>${["Pending", "Processing"].includes(payment.status) ? `<button class="primary" data-action="approve-payment" data-id="${payment.id}">Complete</button>` : ""}</div></td>
        </tr>`;
      }).join("")}</tbody>
      </table>
    </div>
  `;
}

function orderDetails(payment) {
  const user = state.users.find(item => item.id === payment.userId);
  const pkg = state.packages.find(item => item.id === payment.packageId);
  const willCredit = payment.status === "Completed" && !payment.credited;
  return `
    <div class="order-detail-card">
      <div class="between">
        <div><strong>${escapeHtml(payment.id)}</strong><p class="hint">${escapeHtml(user?.company || "Unknown customer")}</p></div>
        ${badge(payment.status)}
      </div>
      ${state.editingOrderId === payment.id ? `
        <div class="form inline-editor">
          <div class="grid two">
            <div class="field"><label>Status</label><select id="order-edit-status">${orderStatusOptions(state.orderDraft.status)}</select></div>
            <div class="field"><label>Method</label><select id="order-edit-method">${paymentMethodOptions(state.orderDraft.method)}</select></div>
          </div>
          <div class="grid two">
            <div class="field"><label>TRX ID</label><input id="order-edit-trx" value="${escapeHtml(state.orderDraft.trx)}" /></div>
            <div class="field"><label>Amount</label><input id="order-edit-amount" inputmode="numeric" value="${state.orderDraft.amount}" /></div>
          </div>
          <div class="field"><label>Admin note</label><input id="order-edit-note" value="${escapeHtml(state.orderDraft.note || "")}" /></div>
        <div class="button-row"><button class="primary" data-action="save-order" data-id="${payment.id}">Save order</button><button class="secondary" data-action="cancel-order-edit">Cancel</button></div>
      </div>
    ` : `
        <ul class="checklist order-info-list">
          <li class="check"><span class="dot"></span><div><strong>Customer</strong><p class="hint">${escapeHtml(user?.name)} · ${escapeHtml(user?.email)} · ${escapeHtml(user?.phone)}</p></div></li>
          <li class="check"><span class="dot"></span><div><strong>Package</strong><p class="hint">${escapeHtml(pkg?.name || "Deleted package")} · ${pkg ? packageTypeLabel(pkg.type) : "Unknown"} · wallet credit ${pkg ? taka(pkg.price) : taka(0)}</p></div></li>
          <li class="check"><span class="dot"></span><div><strong>Payment</strong><p class="hint">${escapeHtml(payment.method)} · TRX ${escapeHtml(payment.trx)} · ${taka(payment.amount)}</p></div></li>
          <li class="check"><span class="dot ${payment.credited ? "" : "warn"}"></span><div><strong>Wallet credit</strong><p class="hint">${payment.credited ? "Already credited to customer wallet." : willCredit ? "Will credit when status is completed." : "Not credited yet."}</p></div></li>
          <li class="check"><span class="dot"></span><div><strong>Admin note</strong><p class="hint">${escapeHtml(payment.note || "No note")}</p></div></li>
        </ul>
        <div class="button-row" style="margin-top:14px"><button class="secondary" data-action="edit-order" data-id="${payment.id}">Edit order</button>${!payment.credited ? `<button class="primary" data-action="approve-payment" data-id="${payment.id}">Complete and credit</button>` : ""}</div>
      `}
    </div>
  `;
}

function billing() {
  const user = currentUser();
  return `
    <div class="grid metrics">
      ${metric(state.mode === "admin" ? "Platform invoices" : "Wallet balance", state.mode === "admin" ? state.invoices.length : taka(user.balance), state.mode === "admin" ? "Admin billing records" : "Approved SMS balance")}
      ${metric("Non-masking rate", taka(state.platformRates.nonMasking), "Admin published live rate")}
      ${metric("Masking rate", taka(state.platformRates.masking), "Admin published live rate")}
      ${metric("OTP rate", taka(state.platformRates.otp), "Priority route live rate")}
    </div>
    <section class="panel" style="margin-top:16px">
      <h2>${state.mode === "admin" ? "Invoices" : "My payment requests"}</h2>
      ${state.mode === "admin" ? invoiceTable() : userPaymentTable()}
    </section>
  `;
}

function invoiceTable() {
  return `<table><thead><tr><th>Invoice</th><th>Client</th><th>Amount</th><th>Status</th></tr></thead><tbody>${state.invoices.map(i => `<tr><td>${i.id}</td><td>${escapeHtml(i.client)}</td><td>${taka(i.amount)}</td><td>${badge(i.status)}</td></tr>`).join("")}</tbody></table>`;
}

function userPaymentTable() {
  const rows = state.payments.filter(payment => payment.userId === currentUser().id);
  return `<table><thead><tr><th>Package</th><th>Method</th><th>TRX ID</th><th>Amount</th><th>Status</th></tr></thead><tbody>${rows.map(payment => `<tr><td>${escapeHtml(state.packages.find(pkg => pkg.id === payment.packageId)?.name)}</td><td>${payment.method}</td><td>${escapeHtml(payment.trx)}</td><td>${taka(payment.amount)}</td><td>${badge(payment.status)}</td></tr>`).join("")}</tbody></table>`;
}

function otp() {
  const isAdmin = state.mode === "admin";
  return `
    <div class="grid two">
      <section class="panel">
        <h2>${isAdmin ? "Live API Server" : "REST API"}</h2>
        <p class="hint">${isAdmin ? "Run node server.js to serve the website and enable these API endpoints." : "Use this endpoint after admin approves your account and generates an API key."}</p>
        <pre class="code">POST ${state.gatewaySettings.apiBase}/messages/send
Authorization: Bearer sk_live_demo_2026
Content-Type: application/json

{
  "userId": "${currentUser().id}",
  "audience_id": "${state.quickAudienceId}",
  "type": "transactional",
  "sender_id": "DHAKASHOP",
  "message": "Your message text",
  "callback_url": "https://example.com/sms/dlr"
}</pre>
        <div class="row" style="margin-top:14px"><button class="primary" data-action="generate-key">Generate API key</button><button class="secondary" data-action="copy-docs">Copy docs link</button></div>
      </section>
      <section class="panel">
        <h2>${isAdmin ? "Production Checklist" : "Security Controls"}</h2>
        <ul class="checklist">
          <li class="check"><span class="dot"></span><div><strong>API authentication</strong><p class="hint">Bearer key for customers, x-admin-key for admin operations.</p></div></li>
          <li class="check"><span class="dot"></span><div><strong>Webhook signature</strong><p class="hint">Payment webhook uses x-webhook-secret before crediting wallet.</p></div></li>
          <li class="check"><span class="dot warn"></span><div><strong>Live credentials</strong><p class="hint">Add SMS gateway and payment merchant secrets only on the server, never inside browser JavaScript.</p></div></li>
        </ul>
      </section>
    </div>
    ${isAdmin ? `<section class="panel" style="margin-top:16px">
      <h2>Available Server Routes</h2>
      <div class="api-grid">
        ${["GET /api/health", "GET /api/packages", "POST /api/auth/signup", "POST /api/orders", "POST /api/admin/orders/:id/complete", "POST /api/messages/send", "POST /api/payments/webhook"].map(route => `<code>${route}</code>`).join("")}
      </div>
    </section>` : ""}
  `;
}

function compliance() {
  return `
    <div class="grid two">
      <section class="panel">
        <h2>Compliance Center</h2>
        <ul class="checklist">
          <li class="check"><span class="dot"></span><div><strong>Bangla promotional enforcement</strong><p class="hint">Warn or block promotional messages without Bangla content.</p></div></li>
          <li class="check"><span class="dot"></span><div><strong>DND suppression</strong><p class="hint">Suppression lists apply before campaign cost calculation.</p></div></li>
          <li class="check"><span class="dot"></span><div><strong>Consent ledger</strong><p class="hint">Tracks import source, opt-in timestamp and unsubscribe status.</p></div></li>
          <li class="check"><span class="dot warn"></span><div><strong>Manual payment approval</strong><p class="hint">bKash/Nagad TRX is credited only after admin approval.</p></div></li>
        </ul>
      </section>
      <section class="panel">
        <h2>Risk Queue</h2>
        <table><thead><tr><th>Item</th><th>Risk</th><th>Action</th></tr></thead><tbody>
          <tr><td>Loan promo import</td><td>${badge("High")}</td><td><button class="danger">Hold</button></td></tr>
          <tr><td>New sender: MEDIBD</td><td>${badge("Pending")}</td><td><button class="secondary">Review</button></td></tr>
        </tbody></table>
      </section>
    </div>
  `;
}

function render() {
  document.body.classList.toggle("public", !isLoggedIn());
  if (!isLoggedIn()) {
    syncAuthViewFromPath();
    renderModeSwitch();
    renderNav();
    document.querySelector("#page-title").textContent = publicTitle();
    document.querySelector(".top-actions").innerHTML = isAdminLoginPath() ? "" : publicActions();
    document.querySelector("#view").innerHTML = publicView();
    renderModal();
    return;
  }
  if (state.sessionRole !== "admin") state.mode = "user";
  document.querySelector(".top-actions").innerHTML = `<span class="badge info">${state.sessionRole === "admin" ? "Admin Portal" : "User Portal"}</span><button class="icon-button" title="Notifications">!</button><button class="primary" data-action="new-campaign">Quick SMS</button><button class="secondary" data-action="logout">Logout</button>`;
  if (!navItems().some(([key]) => key === state.active)) state.active = "dashboard";
  renderModeSwitch();
  renderNav();
  document.querySelector("#page-title").textContent = titleFor(state.active);
  const views = { dashboard, profile, masking, approvals, users, packages, orders, payments, quick, campaigns, contacts, billing, otp, compliance, "admin-profile": adminProfile };
  document.querySelector("#view").innerHTML = views[state.active]();
  renderModal();
}

function toast(message, type = "info") {
  const el = document.querySelector("#toast");
  el.textContent = message;
  el.className = `toast show ${type}`;
  window.setTimeout(() => el.classList.remove("show"), 3200);
}

function deductWallet(amount) {
  if (state.mode === "admin") state.balance = Math.max(0, state.balance - amount);
  else currentUser().balance = Math.max(0, currentUser().balance - amount);
}

function creditOrder(payment) {
  if (!payment) return false;
  const pkg = state.packages.find(item => item.id === payment.packageId);
  const user = state.users.find(item => item.id === payment.userId);
  if (!pkg || !user) return false;
  if (!payment.credited) {
    user.balance += Number(payment.amount || pkg.price);
    user.plan = pkg.name;
    user.status = "Active";
    payment.credited = true;
  }
  return true;
}

function parseContactSheet(text, audienceId) {
  const rows = String(text || "").split(/\r?\n/).filter(Boolean).map(row => {
    const delimiter = row.includes("\t") ? "\t" : ",";
    return row.split(delimiter).map(cell => String(cell || "").trim().replace(/^"|"$/g, ""));
  });
  return parseContactRows(rows, audienceId);
}

function parseContactRows(rows, audienceId) {
  const cleanRows = rows.map(row => row.map(cell => String(cell || "").trim())).filter(row => row.some(Boolean));
  const headers = cleanRows[0]?.map(cell => cell.toLowerCase()) || [];
  const hasHeader = headers.some(cell => ["name", "phone", "mobile", "email"].includes(cell));
  const body = hasHeader ? cleanRows.slice(1) : cleanRows;
  const column = key => {
    const candidates = {
      name: ["name", "customer", "customer name", "full name"],
      phone: ["phone", "mobile", "number", "phone number", "mobile number"],
      email: ["email", "email address"]
    }[key];
    const index = headers.findIndex(header => candidates.includes(header));
    return index >= 0 ? index : { name: 0, phone: 1, email: 2 }[key];
  };
  const nameIndex = column("name");
  const phoneIndex = column("phone");
  const emailIndex = column("email");
  return body.map(row => {
    const name = row[nameIndex];
    const rawPhone = row[phoneIndex];
    const email = row[emailIndex];
    const phone = normalizeBdPhone(rawPhone);
    if (!name || !/^01[3-9]\d{8}$/.test(phone)) return null;
    return { id: `c${Date.now()}${Math.random()}`, name, phone, email, audienceId, consent: "Opted in", operator: operatorFromPhone(phone) };
  }).filter(Boolean);
}

async function parseXlsxContacts(file, audienceId) {
  const entries = await unzipXlsx(await file.arrayBuffer());
  const sheetXml = await zipText(entries, "xl/worksheets/sheet1.xml");
  if (!sheetXml) throw new Error("Could not find first worksheet in XLSX.");
  const sharedXml = await zipText(entries, "xl/sharedStrings.xml");
  const sharedStrings = sharedXml ? Array.from(new DOMParser().parseFromString(sharedXml, "application/xml").querySelectorAll("si")).map(si => si.textContent || "") : [];
  const sheet = new DOMParser().parseFromString(sheetXml, "application/xml");
  const rows = Array.from(sheet.querySelectorAll("sheetData row")).map(row => {
    const cells = [];
    row.querySelectorAll("c").forEach(cell => {
      const ref = cell.getAttribute("r") || "";
      const letters = ref.replace(/\d/g, "") || "A";
      const index = letters.split("").reduce((sum, char) => sum * 26 + char.charCodeAt(0) - 64, 0) - 1;
      const type = cell.getAttribute("t");
      const raw = cell.querySelector("v")?.textContent || cell.textContent || "";
      cells[index] = type === "s" ? sharedStrings[Number(raw)] || "" : raw;
    });
    return cells;
  });
  return parseContactRows(rows, audienceId);
}

async function zipText(entries, name) {
  const entry = entries.find(item => item.name === name);
  return entry ? new TextDecoder().decode(await inflateZipEntry(entry)) : "";
}

async function unzipXlsx(buffer) {
  const view = new DataView(buffer);
  let eocd = -1;
  for (let offset = view.byteLength - 22; offset >= 0; offset--) {
    if (view.getUint32(offset, true) === 0x06054b50) {
      eocd = offset;
      break;
    }
  }
  if (eocd < 0) throw new Error("Invalid XLSX file.");
  const entryCount = view.getUint16(eocd + 10, true);
  let offset = view.getUint32(eocd + 16, true);
  const decoder = new TextDecoder();
  const entries = [];
  for (let i = 0; i < entryCount; i++) {
    if (view.getUint32(offset, true) !== 0x02014b50) break;
    const method = view.getUint16(offset + 10, true);
    const compressedSize = view.getUint32(offset + 20, true);
    const fileNameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const localOffset = view.getUint32(offset + 42, true);
    const name = decoder.decode(new Uint8Array(buffer, offset + 46, fileNameLength));
    const localNameLength = view.getUint16(localOffset + 26, true);
    const localExtraLength = view.getUint16(localOffset + 28, true);
    const dataStart = localOffset + 30 + localNameLength + localExtraLength;
    entries.push({ name, method, bytes: buffer.slice(dataStart, dataStart + compressedSize) });
    offset += 46 + fileNameLength + extraLength + commentLength;
  }
  return entries;
}

async function inflateZipEntry(entry) {
  if (entry.method === 0) return entry.bytes;
  if (entry.method !== 8 || typeof DecompressionStream === "undefined") throw new Error("This browser cannot read compressed XLSX files.");
  const stream = new Blob([entry.bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return await new Response(stream).arrayBuffer();
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`Could not read ${file.name}`));
    reader.readAsDataURL(file);
  });
}

async function uploadMaskingDocument(file, userId) {
  const dataUrl = await fileToDataUrl(file);
  const payload = await apiRequest("/api/app/masking-document", {
    method: "POST",
    body: JSON.stringify({
      userId,
      maskingRequestId: `mr-${userId}`,
      fileName: file.name,
      fileType: file.type || "application/octet-stream",
      size: file.size,
      dataUrl
    })
  });
  return payload.document;
}

document.addEventListener("click", async event => {
  const auth = event.target.closest("[data-auth]")?.dataset.auth;
  if (auth) {
    if (auth === "admin-login" && !isAdminLoginPath()) return;
    if (isAdminLoginPath() && auth !== "admin-login" && auth !== "forgot") {
      window.history.pushState({}, "", "/");
    }
    state.authView = auth;
    render();
    return;
  }

  const mode = event.target.closest("[data-mode]")?.dataset.mode;
  if (mode) {
    if (state.sessionRole !== "admin") return;
    state.mode = mode;
    state.active = "dashboard";
    render();
    return;
  }

  const view = event.target.closest("[data-view]")?.dataset.view;
  if (view) {
    state.active = view;
    state.modal = null;
    render();
    return;
  }

  const button = event.target.closest("[data-action]");
  const action = button?.dataset.action;
  if (!action) return;
  let shouldPersist = true;

  if (action === "close-modal") {
    shouldPersist = false;
    state.modal = null;
    render();
    return;
  }

  if (action === "logout") {
    shouldPersist = false;
    clearSession();
    state.sessionRole = null;
    state.authView = isAdminLoginPath() ? "admin-login" : "landing";
    render();
    return;
  }

  if (action === "toggle-password") {
    shouldPersist = false;
    const target = button.dataset.target;
    if (target && state.passwordVisible && Object.hasOwn(state.passwordVisible, target)) {
      state.passwordVisible[target] = !state.passwordVisible[target];
      render();
    }
    return;
  }

  if (action === "user-login") {
    shouldPersist = false;
    try {
      const payload = await apiRequest("/api/app/login", {
        method: "POST",
        body: JSON.stringify({ email: state.loginEmail, password: state.loginPassword, role: "user" })
      });
      state.sessionRole = payload.session.role;
      state.mode = "user";
      state.currentUserId = payload.session.userId;
      await loadRemoteState(state.sessionRole, state.currentUserId);
      saveSession();
      state.active = "dashboard";
      toast(`Welcome ${currentUser().company}.`);
      render();
    } catch (error) {
      toast(error.message || "Invalid user login.", "error");
    }
    return;
  }

  if (action === "admin-login") {
    shouldPersist = false;
    try {
      const payload = await apiRequest("/api/app/login", {
        method: "POST",
        body: JSON.stringify({ email: state.adminEmail, password: state.adminPassword, role: "admin" })
      });
      state.sessionRole = payload.session.role;
      state.mode = "admin";
      state.currentUserId = payload.session.userId;
      await loadRemoteState(state.sessionRole, state.currentUserId);
      saveSession();
      state.active = "dashboard";
      toast("Admin portal opened.");
      render();
    } catch (error) {
      toast(error.message || "Invalid admin login.", "error");
    }
    return;
  }

  if (action === "signup-submit") {
    const form = state.signup;
    if (!form.name.trim() || !form.company.trim() || !form.email.trim() || !form.phone.trim() || !form.password.trim()) toast("Name, company, email, phone and password required.");
    else {
      shouldPersist = false;
      try {
        const payload = await apiRequest("/api/app/signup", {
          method: "POST",
          body: JSON.stringify(form)
        });
        state.currentUserId = payload.session.userId;
        state.sessionRole = "user";
        state.mode = "user";
        await loadRemoteState(state.sessionRole, state.currentUserId);
        saveSession();
        state.active = "dashboard";
        state.signup = { name: "", company: "", email: "", phone: "", address: "", companyType: "E-commerce", password: "", avatar: "" };
        toast("Account created and sent for admin approval.");
        render();
      } catch (error) {
        toast(error.message || "Signup failed.", "error");
      }
      return;
    }
  }

  if (action === "forgot-submit") {
    const user = state.users.find(item => item.email.toLowerCase() === state.forgotEmail.toLowerCase());
    toast(user ? "Password reset request created. Admin can send reset email." : "Email not found.");
  }

  if (action === "reset-password-submit") {
    shouldPersist = false;
    if (!state.resetPassword || state.resetPassword.length < 6) toast("Password must be at least 6 characters.", "error");
    else if (state.resetPassword !== state.resetPasswordConfirm) toast("Passwords do not match.", "error");
    else {
      try {
        await apiRequest("/api/app/password-reset/complete", {
          method: "POST",
          body: JSON.stringify({ token: state.resetToken, password: state.resetPassword })
        });
        state.resetToken = "";
        state.resetEmail = "";
        state.resetPassword = "";
        state.resetPasswordConfirm = "";
        state.authView = "user-login";
        toast("Password updated successfully. Please log in with your new password.", "success");
      } catch (error) {
        toast(error.message || "Password reset failed.", "error");
      }
    }
  }

  if (action === "new-campaign") state.active = "quick";

  if (action === "save-profile") {
    const user = currentUser();
    user.accountStatus = user.accountStatus === "Approved" ? "Approved" : "Pending";
    user.status = user.accountStatus === "Approved" ? "Active" : "Pending approval";
    toast("Profile saved. Admin approval is required for unapproved accounts.");
  }

  if (action === "submit-masking") {
    const user = currentUser();
    const request = user.maskingRequest || {};
    const companyTypeOk = request.companyType !== "Other" || request.otherCompanyType?.trim();
    if (!request.companyName?.trim()) toast("Company name is required.", "error");
    else if (!request.companyType || !companyTypeOk) toast("Company type is required. If Other, type the company type.", "error");
    else if (!request.binTax?.trim()) toast("BIN / TIN / Tax info is required.", "error");
    else if (!request.email?.trim()) toast("Company email is required.", "error");
    else if (!request.phone?.trim()) toast("Company phone is required.", "error");
    else if (!request.documents?.length) toast("Company document upload is required.", "error");
    else {
      user.company = request.companyName.trim();
      user.companyType = request.companyType === "Other" ? request.otherCompanyType.trim() : request.companyType;
      user.email = request.email.trim();
      user.phone = request.phone.trim();
      user.binTax = request.binTax.trim();
      user.docs = request.documents.map(documentDisplayName).join(", ");
      user.maskingStatus = "Pending";
      request.note = "Submitted for admin review";
      toast("Masking approval request submitted successfully.", "success");
    }
  }

  if (action === "approve-account") {
    const user = state.users.find(item => item.id === button.dataset.id);
    if (user) {
      shouldPersist = false;
      try {
        await apiRequest(`/api/admin/users/${encodeURIComponent(user.id)}/activate`, { method: "POST" });
        await loadRemoteState(state.sessionRole, state.currentUserId);
        toast(`${user.company} account approved and activated.`, "success");
      } catch (error) {
        toast(error.message || "Could not approve account.", "error");
      }
    }
  }

  if (action === "activate-account" || action === "deactivate-account") {
    const user = state.users.find(item => item.id === button.dataset.id);
    if (user) {
      shouldPersist = false;
      const apiAction = action === "activate-account" ? "activate" : "deactivate";
      const confirmText = action === "deactivate-account"
        ? `Deactivate ${user.company}? The user will be blocked from login until an admin activates the account.`
        : `Activate ${user.company}? The user will regain access to the portal.`;
      if (window.confirm(confirmText)) {
        try {
          await apiRequest(`/api/admin/users/${encodeURIComponent(user.id)}/${apiAction}`, { method: "POST" });
          await loadRemoteState(state.sessionRole, state.currentUserId);
          toast(action === "activate-account" ? `${user.company} is active again.` : `${user.company} has been suspended.`, action === "activate-account" ? "success" : "error");
        } catch (error) {
          toast(error.message || "Could not update account status.", "error");
        }
      }
    }
  }

  if (action === "delete-account") {
    const user = state.users.find(item => item.id === button.dataset.id);
    if (user) {
      shouldPersist = false;
      if (window.confirm(`Permanently delete ${user.company}? This removes their profile and related demo data.`)) {
        try {
          await apiRequest(`/api/admin/users/${encodeURIComponent(user.id)}`, { method: "DELETE" });
          await loadRemoteState(state.sessionRole, state.currentUserId);
          toast(`${user.company} was deleted.`, "success");
        } catch (error) {
          toast(error.message || "Could not delete account.", "error");
        }
      }
    }
  }

  if (action === "view-account") {
    const user = state.users.find(item => item.id === button.dataset.id);
    if (user) {
      shouldPersist = false;
      state.modal = { type: "user", id: user.id };
    }
  }

  if (action === "view-masking") {
    const user = state.users.find(item => item.id === button.dataset.id);
    if (user) {
      shouldPersist = false;
      state.modal = { type: "masking", id: user.id };
    }
  }

  if (action === "open-document") {
    shouldPersist = false;
    const user = state.users.find(item => item.id === button.dataset.id);
    const documentName = button.dataset.doc || "";
    const documentId = button.dataset.documentId || "";
    const directUrl = button.dataset.url || (user ? documentUrlFor(user, documentName) : "");
    const opened = window.open("about:blank", "_blank");
    const openUrl = value => {
      const absoluteUrl = new URL(value, window.location.origin).href;
      if (opened) opened.location.href = absoluteUrl;
      else window.location.href = absoluteUrl;
    };
    if (directUrl) openUrl(directUrl);
    else if (user && (documentId || documentName)) {
      try {
        const params = new URLSearchParams({
          userId: user.id,
          fileName: documentName,
          documentId,
          role: state.sessionRole || state.mode,
          viewerId: state.currentUserId || ""
        });
        const payload = await apiRequest(`/api/app/masking-document/resolve?${params.toString()}`);
        openUrl(payload.url);
      } catch (error) {
        if (opened) opened.close();
        toast(error.message || "Saved document file not found. Please upload this document again.", "error");
      }
    } else {
      if (opened) opened.close();
      toast("Document file not found.", "error");
    }
    return;
  }

  if (action === "approve-masking") {
    const user = state.users.find(item => item.id === button.dataset.id);
    if (user) {
      user.maskingStatus = "Approved";
      if (user.maskingRequest) user.maskingRequest.note = "Approved by admin";
      toast(`${user.company} masking approved. Masking SMS is now enabled.`, "success");
    }
  }

  if (action === "reject-masking") {
    const user = state.users.find(item => item.id === button.dataset.id);
    if (user) {
      user.maskingStatus = "Rejected";
      if (user.maskingRequest) user.maskingRequest.note = "Rejected by admin";
      toast(`${user.company} masking request rejected. Masking SMS remains disabled.`, "error");
    }
  }

  if (action === "send-reset") {
    const user = state.users.find(item => item.id === button.dataset.id);
    if (user) {
      shouldPersist = false;
      try {
        const payload = await apiRequest(`/api/admin/users/${encodeURIComponent(user.id)}/password-reset`, { method: "POST" });
        toast(`Password reset email queued for ${user.email}. Reset link: ${payload.reset.resetUrl}`, "success");
      } catch (error) {
        toast(error.message || "Could not create password reset link.", "error");
      }
    }
  }

  if (action === "save-admin-profile") {
    shouldPersist = false;
    const profile = state.adminProfile || {};
    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) toast("Admin passwords do not match.", "error");
    else {
      try {
        const payload = await apiRequest("/api/admin/profile", {
          method: "PUT",
          body: JSON.stringify({ adminId: state.currentUserId, profile })
        });
        state.adminProfile = { ...payload.profile, newPassword: "", confirmPassword: "" };
        state.adminEmail = payload.profile.email;
        saveSession();
        toast("Admin account updated. Use the updated email/password on next login.", "success");
      } catch (error) {
        toast(error.message || "Could not update admin account.", "error");
      }
    }
  }

  if (action === "create-audience") {
    const name = state.newAudienceName.trim();
    if (!name) toast("Audience name required.");
    else {
      const id = `a${Date.now()}`;
      state.audiences.push({ id, name, description: "Custom audience created by user" });
      state.selectedAudienceId = id;
      state.manualContact.audienceId = id;
      state.newAudienceName = "";
      toast(`Audience created: ${name}`);
    }
  }

  if (action === "seed-audiences") {
    const id = `a${Date.now()}`;
    state.audiences.push({ id, name: "VIP Customers", description: "High value custom segment" });
    state.selectedAudienceId = id;
    toast("Sample VIP audience added.");
  }

  if (action === "add-manual-contact") {
    const contact = state.manualContact;
    if (!contact.name.trim() || !/^01[3-9]\d{8}$/.test(contact.phone.trim())) toast("Valid name and Bangladesh phone required.");
    else {
      state.contacts.push({ id: `c${Date.now()}`, name: contact.name.trim(), phone: contact.phone.trim(), email: contact.email.trim(), audienceId: contact.audienceId, consent: "Opted in", operator: operatorFromPhone(contact.phone) });
      state.manualContact = { name: "", phone: "", email: "", audienceId: contact.audienceId };
      toast("Manual contact added.");
    }
  }

  if (action === "import-google-sheet") {
    if (!state.googleSheetRows.length) toast("Upload a Google Sheet CSV/XLSX file first.");
    else {
      state.contacts.push(...state.googleSheetRows.map(contact => ({ ...contact, audienceId: state.manualContact.audienceId })));
      toast(`${state.googleSheetRows.length} Google Sheet contact(s) imported.`);
      state.googleSheetRows = [];
      state.googleSheetFileName = "";
    }
  }

  if (action === "clean-list") {
    const seen = new Set();
    const before = state.contacts.length;
    state.contacts = state.contacts.filter(contact => {
      if (seen.has(contact.phone)) return false;
      seen.add(contact.phone);
      return true;
    });
    toast(`${before - state.contacts.length} duplicate contact(s) removed.`);
  }

  if (action === "view-audience") {
    state.selectedAudienceId = button.dataset.id;
    state.editingAudienceId = null;
    state.editingContactId = null;
  }

  if (action === "edit-audience") {
    const audience = state.audiences.find(item => item.id === button.dataset.id);
    if (audience) {
      state.selectedAudienceId = audience.id;
      state.editingAudienceId = audience.id;
      state.audienceDraft = { name: audience.name, description: audience.description };
      state.editingContactId = null;
    }
  }

  if (action === "save-audience") {
    const audience = state.audiences.find(item => item.id === button.dataset.id);
    const name = state.audienceDraft.name.trim();
    if (!audience || !name) toast("Audience name required.");
    else {
      audience.name = name;
      audience.description = state.audienceDraft.description.trim() || "Custom audience";
      state.editingAudienceId = null;
      toast("Audience updated.");
    }
  }

  if (action === "cancel-audience-edit") {
    state.editingAudienceId = null;
  }

  if (action === "delete-audience") {
    const audience = state.audiences.find(item => item.id === button.dataset.id);
    if (audience && window.confirm(`Delete audience "${audience.name}" and all contacts inside it?`)) {
      state.audiences = state.audiences.filter(item => item.id !== audience.id);
      state.contacts = state.contacts.filter(contact => contact.audienceId !== audience.id);
      const fallback = state.audiences[0]?.id || "";
      state.selectedAudienceId = fallback;
      state.manualContact.audienceId = fallback;
      if (state.quickAudienceId === audience.id) state.quickAudienceId = fallback;
      if (state.campaignAudienceId === audience.id) state.campaignAudienceId = fallback;
      state.editingAudienceId = null;
      state.editingContactId = null;
      toast("Audience and its contacts deleted.");
    }
  }

  if (action === "clean-audience-duplicates") {
    const audienceId = button.dataset.id;
    const seen = new Set();
    const before = state.contacts.length;
    state.contacts = state.contacts.filter(contact => {
      if (contact.audienceId !== audienceId) return true;
      if (seen.has(contact.phone)) return false;
      seen.add(contact.phone);
      return true;
    });
    toast(`${before - state.contacts.length} duplicate contact(s) removed from ${audienceName(audienceId)}.`);
  }

  if (action === "edit-contact") {
    const contact = state.contacts.find(item => item.id === button.dataset.id);
    if (contact) {
      state.selectedAudienceId = contact.audienceId;
      state.editingContactId = contact.id;
      state.editingAudienceId = null;
      state.contactDraft = { name: contact.name, phone: contact.phone, email: contact.email };
    }
  }

  if (action === "save-contact") {
    const contact = state.contacts.find(item => item.id === button.dataset.id);
    const phone = state.contactDraft.phone.trim();
    if (!contact || !state.contactDraft.name.trim() || !/^01[3-9]\d{8}$/.test(phone)) toast("Valid name and Bangladesh phone required.");
    else {
      contact.name = state.contactDraft.name.trim();
      contact.phone = phone;
      contact.email = state.contactDraft.email.trim();
      contact.operator = operatorFromPhone(phone);
      state.editingContactId = null;
      toast("Contact updated.");
    }
  }

  if (action === "cancel-contact-edit") {
    state.editingContactId = null;
  }

  if (action === "delete-contact") {
    const contact = state.contacts.find(item => item.id === button.dataset.id);
    if (contact && window.confirm(`Delete contact "${contact.name}" from ${audienceName(contact.audienceId)}?`)) {
      state.contacts = state.contacts.filter(item => item.id !== contact.id);
      state.editingContactId = null;
      toast("Contact deleted.");
    }
  }

  if (action === "select-audience-campaign") {
    state.campaignAudienceId = button.dataset.id;
    state.selectedAudienceId = button.dataset.id;
    state.active = "campaigns";
  }

  if (action === "select-audience-quick") {
    state.quickAudienceId = button.dataset.id;
    state.selectedAudienceId = button.dataset.id;
    state.quickMode = "audience";
    state.active = "quick";
  }

  if (action === "send-quick") {
    const recipients = state.quickMode === "audience" ? optedInContacts(state.quickAudienceId).length : 1;
    const info = smsInfo(state.quickText, state.quickType);
    const cost = state.quickChannel === "sms" ? info.cost * recipients : 0;
    const wallet = state.mode === "admin" ? state.balance : currentUser().balance;
    const user = currentUser();
    if (state.mode === "user" && user.accountStatus !== "Approved") toast("Your account is waiting for admin approval.");
    else if (state.mode === "user" && state.quickType === "masking" && user.maskingStatus !== "Approved") toast("Masking SMS needs admin approval first.");
    else if (!recipients) toast("No opted-in recipients found.");
    else if (state.quickMode === "single" && state.quickChannel === "sms" && !/^01[3-9]\d{8}$/.test(state.quickPhone)) toast("Fix recipient phone number.");
    else if (wallet < cost) toast("Insufficient balance. Buy package or approve payment first.");
    else {
      deductWallet(cost);
      toast(`${state.quickChannel === "sms" ? "SMS" : "Email"} queued for ${recipients} recipient(s).`);
    }
  }

  if (action === "send-campaign") {
    const recipients = optedInContacts(state.campaignAudienceId).length;
    const info = smsInfo(state.smsText, state.campaignType);
    const cost = info.cost * recipients;
    const wallet = state.mode === "admin" ? state.balance : currentUser().balance;
    const user = currentUser();
    if (state.mode === "user" && user.accountStatus !== "Approved") toast("Your account is waiting for admin approval.");
    else if (state.mode === "user" && state.campaignType === "masking" && user.maskingStatus !== "Approved") toast("Masking campaigns need admin approval first.");
    else if (!recipients) toast("Selected audience has no opted-in contacts.");
    else if (wallet < cost) toast("Insufficient balance for this campaign.");
    else {
      deductWallet(cost);
      state.campaigns.unshift({ id: `camp${Date.now()}`, name: `${audienceName(state.campaignAudienceId)} Campaign`, type: state.campaignType, audienceId: state.campaignAudienceId, senderId: state.senderId, message: state.smsText, sent: recipients, delivered: Math.max(0, recipients - 1), cost, status: "Queued" });
      toast(`Campaign queued for ${recipients} recipient(s).`);
    }
  }

  if (action === "ai-copy") {
    state.smsText = "প্রিয় {name}, আপনার অর্ডার #{order_id} নিশ্চিত হয়েছে। বিস্তারিত জানতে আমাদের সাপোর্টে যোগাযোগ করুন।";
    toast("Bangla copy improved.");
  }

  if (action === "insert-token") {
    const target = button.dataset.target;
    const token = button.dataset.token;
    if (target === "quick") state.quickText = `${state.quickText}${state.quickText.endsWith(" ") ? "" : " "}${token}`;
    if (target === "campaign") state.smsText = `${state.smsText}${state.smsText.endsWith(" ") ? "" : " "}${token}`;
  }

  if (action === "quick-otp") {
    state.quickType = "otp";
    state.quickText = "আপনার OTP 493221। ৫ মিনিটের মধ্যে ব্যবহার করুন।";
  }

  if (action === "quick-due") {
    state.quickType = "transactional";
    state.quickText = "প্রিয় গ্রাহক, আপনার বিল বকেয়া আছে। অনুগ্রহ করে আজই পরিশোধ করুন।";
  }

  if (action === "create-package") {
    const draft = state.packageDraft;
    if (!draft.name.trim() || Number(draft.price) <= 0 || Number(draft.rate) <= 0) toast("Package name, price and rate required.");
    else {
      state.packages.push({ id: `p${Date.now()}`, name: draft.name.trim(), type: draft.type, price: Number(draft.price), rate: Number(draft.rate), status: "Published" });
      toast("Package published.");
    }
  }

  if (action === "save-rates") {
    if (state.rateDraft.nonMasking <= 0 || state.rateDraft.masking <= 0 || state.rateDraft.otp <= 0) toast("All rates must be greater than zero.");
    else {
      state.platformRates = {
        nonMasking: Number(state.rateDraft.nonMasking),
        masking: Number(state.rateDraft.masking),
        otp: Number(state.rateDraft.otp)
      };
      toast("Live SMS rates published to user billing.");
    }
  }

  if (action === "edit-package") {
    const pkg = state.packages.find(item => item.id === button.dataset.id);
    if (pkg) {
      state.editingPackageId = pkg.id;
      state.packageEditDraft = { name: pkg.name, type: pkg.type, price: pkg.price, rate: pkg.rate };
    }
  }

  if (action === "save-package") {
    const pkg = state.packages.find(item => item.id === button.dataset.id);
    const draft = state.packageEditDraft;
    if (!pkg || !draft.name.trim() || Number(draft.price) <= 0 || Number(draft.rate) <= 0) toast("Valid package name, price and rate required.");
    else {
      pkg.name = draft.name.trim();
      pkg.type = draft.type;
      pkg.price = Number(draft.price);
      pkg.rate = Number(draft.rate);
      state.editingPackageId = null;
      toast("Published package updated.");
    }
  }

  if (action === "cancel-package-edit") {
    state.editingPackageId = null;
  }

  if (action === "delete-package") {
    const pkg = state.packages.find(item => item.id === button.dataset.id);
    if (pkg && window.confirm(`Delete package "${pkg.name}"? Existing payment history will stay, but users cannot buy this package anymore.`)) {
      state.packages = state.packages.filter(item => item.id !== pkg.id);
      if (state.editingPackageId === pkg.id) state.editingPackageId = null;
      toast("Package deleted.");
    }
  }

  if (action === "buy-package") {
    if (state.mode === "user" && currentUser().accountStatus !== "Approved") {
      toast("Admin must approve your account before package orders.");
      render();
      return;
    }
    const pkg = state.packages.find(item => item.id === button.dataset.id);
    if (state.mode === "user" && pkg?.type === "masking" && currentUser().maskingStatus !== "Approved") {
      toast("Masking wallet packages are available only after admin approves your masking request.", "error");
      render();
      return;
    }
    const method = button.dataset.method;
    const trx = `${method === "bKash" ? "BK" : "NG"}${Math.floor(100000 + Math.random() * 899999)}`;
    state.payments.unshift({ id: `pay${Date.now()}`, userId: currentUser().id, packageId: pkg.id, method, trx, amount: pkg.price, status: "Pending", credited: false, note: "New customer order" });
    toast(`New order submitted with ${method} TRX ${trx}. Waiting for admin approval.`);
  }

  if (action === "approve-payment") {
    const payment = state.payments.find(item => item.id === button.dataset.id);
    if (payment) payment.status = "Completed";
    if (!creditOrder(payment)) {
      toast("Cannot approve: package or user missing.");
      render();
      return;
    }
    payment.note = payment.note || "Completed by admin";
    state.selectedOrderId = payment.id;
    state.editingOrderId = null;
    toast(`Order completed. Wallet credited once.`, "success");
  }

  if (action === "generate-key") toast("New API key generated: sk_live_demo_2026.");
  if (action === "copy-docs") toast("API documentation link copied.");

  if (action === "view-order") {
    state.selectedOrderId = button.dataset.id;
    state.editingOrderId = null;
  }

  if (action === "edit-order") {
    const payment = state.payments.find(item => item.id === button.dataset.id);
    if (payment) {
      state.selectedOrderId = payment.id;
      state.editingOrderId = payment.id;
      state.orderDraft = {
        status: payment.status,
        trx: payment.trx,
        amount: payment.amount,
        method: payment.method,
        note: payment.note || ""
      };
    }
  }

  if (action === "save-order") {
    const payment = state.payments.find(item => item.id === button.dataset.id);
    if (!payment || Number(state.orderDraft.amount) <= 0 || !state.orderDraft.trx.trim()) toast("Valid amount and TRX ID required.");
    else {
      payment.status = state.orderDraft.status;
      payment.method = state.orderDraft.method;
      payment.trx = state.orderDraft.trx.trim();
      payment.amount = Number(state.orderDraft.amount);
      payment.note = state.orderDraft.note || "";
      if (payment.status === "Completed") {
        const credited = creditOrder(payment);
        toast(credited ? "Order completed and wallet credited if not already credited." : "Order saved, but package/user is missing.", credited ? "success" : "error");
      } else {
        toast("Order saved.");
      }
      state.editingOrderId = null;
      state.selectedOrderId = payment.id;
    }
  }

  if (action === "cancel-order-edit") {
    state.editingOrderId = null;
  }

  render();
  if (shouldPersist) persistAppState();
});

document.addEventListener("input", event => {
  const id = event.target.id;
  if (id === "sms-text") {
    state.smsText = event.target.value;
    const hint = document.querySelector("#sms-hint");
    if (hint) hint.textContent = formatSmsHint(smsInfo(state.smsText, state.campaignType), optedInContacts(state.campaignAudienceId).length);
  }
  if (id === "login-email") state.loginEmail = event.target.value;
  if (id === "login-password") state.loginPassword = event.target.value;
  if (id === "admin-email") state.adminEmail = event.target.value;
  if (id === "admin-password") state.adminPassword = event.target.value;
  if (id === "admin-profile-name") state.adminProfile.name = event.target.value;
  if (id === "admin-profile-company") state.adminProfile.company = event.target.value;
  if (id === "admin-profile-email") state.adminProfile.email = event.target.value;
  if (id === "admin-profile-phone") state.adminProfile.phone = event.target.value;
  if (id === "admin-profile-password") state.adminProfile.newPassword = event.target.value;
  if (id === "admin-profile-confirm") state.adminProfile.confirmPassword = event.target.value;
  if (id === "user-search") {
    const cursor = event.target.selectionStart;
    state.userSearch = event.target.value;
    render();
    const search = document.querySelector("#user-search");
    if (search) {
      search.focus();
      search.setSelectionRange(cursor, cursor);
    }
  }
  if (id === "reset-password") state.resetPassword = event.target.value;
  if (id === "reset-password-confirm") state.resetPasswordConfirm = event.target.value;
  if (id === "forgot-email") state.forgotEmail = event.target.value;
  if (id === "signup-name") state.signup.name = event.target.value;
  if (id === "signup-company") state.signup.company = event.target.value;
  if (id === "signup-email") state.signup.email = event.target.value;
  if (id === "signup-phone") state.signup.phone = event.target.value;
  if (id === "signup-address") state.signup.address = event.target.value;
  if (id === "signup-password") state.signup.password = event.target.value;
  if (id === "profile-name") currentUser().name = event.target.value;
  if (id === "profile-company") currentUser().company = event.target.value;
  if (id === "profile-email") currentUser().email = event.target.value;
  if (id === "profile-phone") currentUser().phone = event.target.value;
  if (id === "profile-address") currentUser().address = event.target.value;
  if (id === "profile-avatar") currentUser().avatar = event.target.value.toUpperCase();
  if (id.startsWith("mask-")) {
    const user = currentUser();
    if (!user.maskingRequest) user.maskingRequest = { companyName: user.company || "", companyType: user.companyType || "E-commerce", otherCompanyType: "", binTax: "", website: "", email: user.email || "", phone: user.phone || "", documents: [], note: "" };
    if (id === "mask-company-name") user.maskingRequest.companyName = event.target.value;
    if (id === "mask-company-type-other") user.maskingRequest.otherCompanyType = event.target.value;
    if (id === "mask-bin-tax") user.maskingRequest.binTax = event.target.value;
    if (id === "mask-website") user.maskingRequest.website = event.target.value;
    if (id === "mask-email") user.maskingRequest.email = event.target.value;
    if (id === "mask-phone") user.maskingRequest.phone = event.target.value;
  }
  if (id === "quick-text") {
    state.quickText = event.target.value;
    const recipients = state.quickMode === "audience" ? optedInContacts(state.quickAudienceId).length : 1;
    const hint = document.querySelector("#quick-hint");
    if (hint) hint.textContent = state.quickChannel === "sms" ? formatSmsHint(smsInfo(state.quickText, state.quickType), recipients) : "Email demo mode · no SMS wallet cost deducted";
  }
  if (id === "quick-phone") state.quickPhone = event.target.value.trim();
  if (id === "quick-sender") state.quickSenderId = event.target.value;
  if (id === "quick-email-subject") state.quickEmailSubject = event.target.value;
  if (id === "new-audience-name") state.newAudienceName = event.target.value;
  if (id === "audience-edit-name") state.audienceDraft.name = event.target.value;
  if (id === "audience-edit-description") state.audienceDraft.description = event.target.value;
  if (id === "contact-edit-name") state.contactDraft.name = event.target.value;
  if (id === "contact-edit-phone") state.contactDraft.phone = event.target.value.trim();
  if (id === "contact-edit-email") state.contactDraft.email = event.target.value;
  if (id === "manual-name") state.manualContact.name = event.target.value;
  if (id === "manual-phone") state.manualContact.phone = event.target.value.trim();
  if (id === "manual-email") state.manualContact.email = event.target.value;
  if (id === "rate-nonmasking") state.rateDraft.nonMasking = Number(event.target.value);
  if (id === "rate-masking") state.rateDraft.masking = Number(event.target.value);
  if (id === "rate-otp") state.rateDraft.otp = Number(event.target.value);
  if (id === "package-name") state.packageDraft.name = event.target.value;
  if (id === "package-price") state.packageDraft.price = Number(event.target.value);
  if (id === "package-rate") state.packageDraft.rate = Number(event.target.value);
  if (id === "package-edit-name") state.packageEditDraft.name = event.target.value;
  if (id === "package-edit-price") state.packageEditDraft.price = Number(event.target.value);
  if (id === "package-edit-rate") state.packageEditDraft.rate = Number(event.target.value);
  if (id === "order-edit-trx") state.orderDraft.trx = event.target.value;
  if (id === "order-edit-amount") state.orderDraft.amount = Number(event.target.value);
  if (id === "order-edit-note") state.orderDraft.note = event.target.value;
});

document.addEventListener("change", event => {
  const id = event.target.id;
  if (id === "remember-me") {
    state.rememberMe = event.target.checked;
    localStorage.setItem(rememberPreferenceKey, JSON.stringify(state.rememberMe));
    if (!state.rememberMe) localStorage.removeItem(sessionStorageKey);
    return;
  }
  if (id === "google-sheet-file") {
    const file = event.target.files?.[0];
    if (!file) return;
    const isXlsx = /\.xlsx$/i.test(file.name);
    if (isXlsx) {
      parseXlsxContacts(file, state.manualContact.audienceId).then(rows => {
        state.googleSheetRows = rows;
        state.googleSheetFileName = file.name;
        toast(`${state.googleSheetRows.length} valid contact(s) loaded from XLSX.`);
        render();
      }).catch(error => toast(error.message, "error"));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      state.googleSheetRows = parseContactSheet(reader.result, state.manualContact.audienceId);
      state.googleSheetFileName = file.name;
      toast(`${state.googleSheetRows.length} valid contact(s) loaded from CSV.`);
      render();
    };
    reader.readAsText(file);
    return;
  }
  if (id === "mask-documents") {
    const user = currentUser();
    if (!user.maskingRequest) user.maskingRequest = { companyName: user.company || "", companyType: user.companyType || "E-commerce", otherCompanyType: "", binTax: "", website: "", email: user.email || "", phone: user.phone || "", documents: [], note: "" };
    const files = Array.from(event.target.files || []);
    Object.values(state.documentUrls[user.id] || {}).forEach(url => {
      if (String(url).startsWith("blob:")) URL.revokeObjectURL(url);
    });
    state.documentUrls[user.id] = Object.fromEntries(files.map(file => [file.name, URL.createObjectURL(file)]));
    Promise.all(files.map(file => uploadMaskingDocument(file, user.id))).then(documents => {
      user.maskingRequest.documents = documents;
      toast(`${user.maskingRequest.documents.length} document file(s) uploaded and ready for admin review.`, user.maskingRequest.documents.length ? "success" : "error");
      render();
    }).catch(error => toast(error.message, "error"));
    return;
  }
  if (id === "quick-mode") state.quickMode = event.target.value;
  if (id === "quick-channel") state.quickChannel = event.target.value;
  if (id === "quick-type") state.quickType = event.target.value;
  if (id === "quick-audience") state.quickAudienceId = event.target.value;
  if (id === "campaign-type") state.campaignType = event.target.value;
  if (id === "campaign-audience") state.campaignAudienceId = event.target.value;
  if (id === "sender-id") state.senderId = event.target.value;
  if (id === "manual-audience") state.manualContact.audienceId = event.target.value;
  if (id === "signup-company-type") state.signup.companyType = event.target.value;
  if (id === "profile-company-type") currentUser().companyType = event.target.value;
  if (id === "mask-company-type") {
    const user = currentUser();
    if (!user.maskingRequest) user.maskingRequest = { companyName: user.company || "", companyType: user.companyType || "E-commerce", otherCompanyType: "", binTax: "", website: "", email: user.email || "", phone: user.phone || "", documents: [], note: "" };
    user.maskingRequest.companyType = event.target.value;
  }
  if (id === "package-type") {
    state.packageDraft.type = event.target.value;
    state.packageDraft.rate = packageRateForType(event.target.value);
  }
  if (id === "package-edit-type") {
    state.packageEditDraft.type = event.target.value;
    state.packageEditDraft.rate = packageRateForType(event.target.value);
  }
  if (id === "order-edit-status") state.orderDraft.status = event.target.value;
  if (id === "order-edit-method") state.orderDraft.method = event.target.value;
  render();
});

window.addEventListener("popstate", () => {
  if (!isLoggedIn()) {
    syncAuthViewFromPath();
    render();
  }
});

openResetFromUrl().then(openedReset => {
  if (!openedReset) restoreSession();
  else render();
});
