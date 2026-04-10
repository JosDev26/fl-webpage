import { c as createComponent, d as renderComponent, a as renderScript, r as renderTemplate, e as createAstro, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_sMJyriu2.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Navbar, b as $$Footer } from '../chunks/Footer_2rUtrsMj.mjs';
/* empty css                                 */
import { c as createSupabaseServerClient } from '../chunks/supabase_rPUenwIR.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  let errorMessage = "";
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const rawCedula = (formData.get("cedula") || "").trim();
    const password = formData.get("password") || "";
    const cedula = rawCedula.replace(/[^a-zA-Z0-9\-]/g, "");
    if (!cedula || !password) {
      errorMessage = "Por favor completá todos los campos.";
    } else {
      const email = `${cedula}@clientes.interno`;
      const supabase = createSupabaseServerClient(Astro2.request, Astro2.cookies);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) {
        errorMessage = "Cédula o contraseña incorrecta.";
      } else {
        const { data: empresa } = await supabase.from("empresas").select("nombre").eq("cedula", cedula).single();
        if (empresa?.nombre) {
          Astro2.cookies.set("empresa_nombre", empresa.nombre, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 604800
          });
        }
        Astro2.cookies.set("logged_in", "1", {
          path: "/",
          httpOnly: false,
          secure: true,
          sameSite: "lax",
          maxAge: 604800
        });
        return Astro2.redirect("/userhome", 302);
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<section class="login-container"> <div class="login-card"> <h1 class="login-title">Iniciar <span class="highlight">sesión</span></h1> <p class="login-error" id="login-error"${addAttribute(!errorMessage, "hidden")}> ${errorMessage} </p> <form class="login-form" method="POST" id="login-form"> <div class="login-field"> <label class="login-label" for="cedula">Cédula</label> <input class="login-input" type="text" id="cedula" name="cedula" placeholder="Ej: 123456789" autocomplete="username" required> </div> <div class="login-field"> <label class="login-label" for="password">Contraseña</label> <input class="login-input" type="password" id="password" name="password" placeholder="Tu contraseña" autocomplete="current-password" required> </div> <button class="login-submit" type="submit" id="login-submit">
Ingresar
</button> </form> </div> </section> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })} ${renderScript($$result, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/pages/login.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/pages/login.astro", void 0);
const $$file = "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
