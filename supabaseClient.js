const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("SUPABASE_URL is required in .env");
}

if (!supabaseServiceRoleKey) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY is required in .env");
}

let supabase = null;

try {
  const { createClient } = require("@supabase/supabase-js");
  supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
} catch {
  supabase = {
    auth: {
      admin: {
        async listUsers({ page = 1, perPage = 1 } = {}) {
          const response = await fetch(`${supabaseUrl}/auth/v1/admin/users?page=${page}&per_page=${perPage}`, {
            headers: {
              apikey: supabaseServiceRoleKey,
              Authorization: `Bearer ${supabaseServiceRoleKey}`
            }
          });
          if (!response.ok) {
            const message = await response.text();
            return { data: null, error: new Error(`Supabase auth check failed: ${response.status} ${message}`) };
          }
          return { data: await response.json(), error: null };
        }
      }
    }
  };
}

async function testSupabaseConnection() {
  const { error } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1 });
  if (error) throw error;
  return { ok: true };
}

module.exports = {
  supabase,
  testSupabaseConnection
};
