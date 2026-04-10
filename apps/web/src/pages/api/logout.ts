import type { APIRoute } from 'astro'
import { createSupabaseServerClient } from '../../lib/supabase'

export const prerender = false

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const supabase = createSupabaseServerClient(request, cookies)
  await supabase.auth.signOut()
  cookies.delete('empresa_nombre', { path: '/' })
  cookies.delete('logged_in', { path: '/' })
  return redirect('/login', 302)
}
