import { createBrowserClient } from '@supabase/ssr';

// Using any type for now until Supabase types are properly generated
// TODO: Generate proper types with `supabase gen types typescript`
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
