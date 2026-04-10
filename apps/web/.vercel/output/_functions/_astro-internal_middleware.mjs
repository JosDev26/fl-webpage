import { d as defineMiddleware, s as sequence } from './chunks/index_DbfnGZc-.mjs';
import { c as createSupabaseServerClient } from './chunks/supabase_rPUenwIR.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_Ch3LHBDP.mjs';
import 'piccolore';
import './chunks/astro/server_sMJyriu2.mjs';
import 'clsx';

const PROTECTED_ROUTES = ["/userhome", "/taxes-toolkit", "/calculator-toolkit", "/faq-toolkit"];
const onRequest$1 = defineMiddleware(async ({ request, cookies, locals, redirect, url }, next) => {
  const supabase = createSupabaseServerClient(request, cookies);
  const { data: { user } } = await supabase.auth.getUser();
  locals.user = user;
  locals.empresaNombre = cookies.get("empresa_nombre")?.value ?? null;
  const pathname = url.pathname;
  const isProtected = PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));
  if (isProtected && !user) {
    return redirect("/login", 302);
  }
  if (pathname === "/login" && user) {
    return redirect("/userhome", 302);
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
