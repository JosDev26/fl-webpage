import { defineMiddleware } from 'astro:middleware'
import { createSupabaseServerClient } from './lib/supabase'

const PROTECTED_ROUTES = ['/userhome', '/taxes-toolkit', '/calculator-toolkit', '/faq-toolkit']

export const onRequest = defineMiddleware(async ({ request, cookies, locals, redirect, url }, next) => {
  const supabase = createSupabaseServerClient(request, cookies)
  const { data: { user } } = await supabase.auth.getUser()

  locals.user = user
  locals.empresaNombre = cookies.get('empresa_nombre')?.value ?? null

  const pathname = url.pathname

  // Si la ruta es protegida y no hay sesión → redirect a login
  const isProtected = PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'))
  if (isProtected && !user) {
    return redirect('/login', 302)
  }

  // Si ya tiene sesión y está en login → redirect a userhome
  if (pathname === '/login' && user) {
    return redirect('/userhome', 302)
  }

  return next()
})
