import { createClient } from "@supabase/supabase-js";

// Server-only client. NEVER import this file from a "use client" component —
// the service role key must stay on the server (API routes / server components).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});
