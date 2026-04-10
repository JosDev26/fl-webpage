import { c as createComponent, d as renderComponent, r as renderTemplate, e as createAstro, m as maybeRenderHead } from '../chunks/astro/server_sMJyriu2.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Navbar, b as $$Footer } from '../chunks/Footer_2rUtrsMj.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Userhome = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Userhome;
  const user = Astro2.locals.user;
  const email = user?.email ?? "";
  const cedula = email.split("@")[0] || "Usuario";
  Astro2.locals.empresaNombre || cedula;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<section class="userhome-container"> <div class="userhome-content"> <div class="userhome-header"> <p class="userhome-subtitle">Seleccioná una herramienta para continuar</p> </div> <div class="userhome-grid"> <a href="https://pagos.fusionlegalcr.com" class="userhome-card" target="_blank" rel="noopener noreferrer"> <span class="userhome-card-icon"> <i class="ph ph-scales" aria-hidden="true"></i> </span> <h2 class="userhome-card-title">FULE</h2> <p class="userhome-card-desc">
Herramientas legales fundamentales para tu negocio.
</p> </a> <a href="/taxes-toolkit" class="userhome-card"> <span class="userhome-card-icon"> <i class="ph ph-receipt" aria-hidden="true"></i> </span> <h2 class="userhome-card-title">Impuestos</h2> <p class="userhome-card-desc">
Todo lo que necesitás para tus obligaciones tributarias.
</p> </a> <a href="/calculator-toolkit" class="userhome-card"> <span class="userhome-card-icon"> <i class="ph ph-calculator" aria-hidden="true"></i> </span> <h2 class="userhome-card-title">Calculadora</h2> <p class="userhome-card-desc">
Calculá costos de traspasos y otros trámites legales.
</p> </a> <a href="/faq-toolkit" class="userhome-card"> <span class="userhome-card-icon"> <i class="ph ph-question" aria-hidden="true"></i> </span> <h2 class="userhome-card-title">Preguntas Frecuentes</h2> <p class="userhome-card-desc">
Resolvé tus dudas laborales y comerciales al instante.
</p> </a> </div> <div class="userhome-logout"> <a href="/api/logout" class="userhome-logout-link"> <i class="ph ph-sign-out" aria-hidden="true"></i>
Cerrar sesión
</a> </div> </div> </section> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/pages/userhome.astro", void 0);

const $$file = "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/pages/userhome.astro";
const $$url = "/userhome";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Userhome,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
