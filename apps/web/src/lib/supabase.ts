import { createServerClient, parseCookieHeader } from '@supabase/ssr'
import type { AstroCookies } from 'astro'

export function createSupabaseServerClient(request: Request, cookies: AstroCookies) {
  const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get('cookie') ?? '')
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          cookies.set(name, value, {
            path: '/',
            httpOnly: true,
            secure: import.meta.env.PROD,
            sameSite: 'lax',
            maxAge: 604800,
            ...options,
          })
        }
      },
    },
  })
}
