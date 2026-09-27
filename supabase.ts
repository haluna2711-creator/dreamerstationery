import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-safe Supabase instance. Uses the anon key, so it only ever
// works within whatever Row Level Security policies you set up
// (see README.md for the recommended policies).
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
