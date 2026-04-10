import { c as createSupabaseServerClient } from '../../chunks/supabase_rPUenwIR.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async ({ request, cookies, redirect }) => {
  const supabase = createSupabaseServerClient(request, cookies);
  await supabase.auth.signOut();
  cookies.delete("empresa_nombre", { path: "/" });
  cookies.delete("logged_in", { path: "/" });
  return redirect("/login", 302);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
