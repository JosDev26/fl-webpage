import { createServerClient, parseCookieHeader } from '@supabase/ssr';

function createSupabaseServerClient(request, cookies) {
  const supabaseUrl = "https://yxawhlcikaoivcqpbjfl.supabase.co";
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4YXdobGNpa2FvaXZjcXBiamZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNzI0MzMsImV4cCI6MjA3Nzc0ODQzM30.8Bc3qi460ALQXE0ttSxYnWZnZNEmeiirtBuc59H20Jo";
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get("cookie") ?? "");
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          cookies.set(name, value, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 604800,
            ...options
          });
        }
      }
    }
  });
}

export { createSupabaseServerClient as c };
