import { c as createComponent, r as renderTemplate, a as renderScript, m as maybeRenderHead, d as renderComponent } from '../chunks/astro/server_sMJyriu2.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Navbar, b as $$Footer } from '../chunks/Footer_2rUtrsMj.mjs';
import 'clsx';
/* empty css                                              */
/* empty css                                              */
/* empty css                                              */
import { $ as $$TaxesCTA } from '../chunks/Taxes-CTA_CfCtdRVC.mjs';
export { renderers } from '../renderers.mjs';

var __freeze$3 = Object.freeze;
var __defProp$3 = Object.defineProperty;
var __template$3 = (cooked, raw) => __freeze$3(__defProp$3(cooked, "raw", { value: __freeze$3(cooked.slice()) }));
var _a$3;
const $$CalculatorHero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$3 || (_a$3 = __template$3(["", '<section class="faqhero-container"> <div class="faqhero-content"> <div class="faqhero-icon hidden-initial" aria-hidden="true"> <i class="ph ph-calculator"></i> </div> <h2 class="faqhero-title hidden-initial">\nCalculadora de Traspasos\n</h2> </div> </section> <!-- Animaciones --> <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"><\/script> ', ""])), maybeRenderHead(), renderScript($$result, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Calculator-hero.astro?astro&type=script&index=0&lang.ts"));
}, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Calculator-hero.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$Calculator = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", '<section class="calc-container" id="calculadora"> <div class="calc-content"> <h2 class="calc-title hidden-initial">Calculadora Interactiva de Costos</h2> <p class="calc-intro hidden-initial">\nEstime los gastos asociados al traspaso de su propiedad o veh&iacute;culo. Tenga en cuenta que estos son valores aproximados. Para obtener un c&aacute;lculo preciso y personalizado, le invitamos a contactarnos al final de la p&aacute;gina.\n</p> <div class="calc-layout hidden-initial"> <!-- Formulario --> <div class="calc-form"> <div class="calc-field"> <span class="calc-field-label">Seleccione el Tipo de Bien</span> <div class="calc-tabs"> <button type="button" class="calc-tab calc-tab-active" id="btn-inmueble">Inmueble</button> <button type="button" class="calc-tab" id="btn-mueble">Veh&iacute;culo</button> </div> </div> <div class="calc-field"> <label for="valor-traspaso" class="calc-field-label">Valor de Traspaso (Precio de Venta) &cent;</label> <input type="number" id="valor-traspaso" class="calc-input" placeholder="50000000" autocomplete="off"> </div> <div class="calc-field"> <label for="valor-fiscal" class="calc-field-label">Valor Fiscal del Bien &cent;</label> <input type="number" id="valor-fiscal" class="calc-input" placeholder="45000000" autocomplete="off"> </div> <div id="inmueble-fields"> <div class="calc-field"> <label for="valor-compra" class="calc-field-label">Valor de Compra Original &cent;</label> <input type="number" id="valor-compra" class="calc-input" placeholder="30000000" autocomplete="off"> </div> <div class="calc-field"> <label class="calc-checkbox-label"> <input type="checkbox" id="adquisicion-pre-2019" class="calc-checkbox"> <span>Adquirido antes del 1 de julio de 2019</span> </label> </div> </div> <div class="calc-field"> <label class="calc-checkbox-label"> <input type="checkbox" id="aplica-declaracion-jurada" class="calc-checkbox"> <span>Aplicar Costo Declaraci&oacute;n Jurada (si la transacci&oacute;n supera los &cent;5.060.000, aprox. $10.000 USD)</span> </label> </div> </div> <!-- Resultados --> <div class="calc-results"> <h3 class="calc-results-title">Desglose de Costos Estimados</h3> <div class="calc-result-rows"> <div class="calc-result-row"> <span>Impuesto de Traspaso:</span> <span id="res-impuesto-traspaso" class="calc-result-value">&cent;0</span> </div> <div class="calc-result-row" id="res-ganancia-capital-container"> <span>Imp. Ganancia de Capital:</span> <span id="res-ganancia-capital" class="calc-result-value">&cent;0</span> </div> <div class="calc-result-row"> <span>Timbres y Derechos:</span> <span id="res-timbres" class="calc-result-value">&cent;0</span> </div> <div class="calc-result-row"> <span>Honorarios Notariales (Est.):</span> <span id="res-honorarios" class="calc-result-value">&cent;0</span> </div> <div class="calc-result-row"> <span>IVA sobre Honorarios (13%):</span> <span id="res-iva" class="calc-result-value">&cent;0</span> </div> <div class="calc-result-row calc-result-row-hidden" id="res-declaracion-jurada-container"> <span>Declaraci&oacute;n Jurada (IVA incl.):</span> <span id="res-declaracion-jurada" class="calc-result-value">&cent;0</span> </div> </div> <div class="calc-result-total"> <span>Costo Total Estimado:</span> <span id="res-total" class="calc-result-value">&cent;0</span> </div> </div> </div> <!-- Nota legal al pie --> <p class="calc-footnote hidden-initial">\n*Esta herramienta proporciona una estimaci&oacute;n de costos basada en la informaci&oacute;n del &ldquo;Reporte Integral sobre Traspasos de Bienes en Costa Rica&rdquo;. Los c&aacute;lculos son aproximados y no constituyen asesor&iacute;a legal o financiera. Para una cotizaci&oacute;n m&aacute;s formal y asesoramiento profesional, consulte con un abogado.\n</p> </div> </section> <!-- Animaciones de entrada --> <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"><\/script> ', " <!-- Logica de la calculadora --> ", ""])), maybeRenderHead(), renderScript($$result, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Calculator.astro?astro&type=script&index=0&lang.ts"), renderScript($$result, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Calculator.astro?astro&type=script&index=1&lang.ts"));
}, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Calculator.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$CalculatorInfo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<section class="calcinfo-container"> <div class="calcinfo-content"> <!-- Requisitos y Proceso --> <h3 class="calcinfo-card-title hidden-initial" id="calcinfo-requisitos-title">Requisitos y Proceso</h3> <article class="calcinfo-card hidden-initial" aria-labelledby="calcinfo-requisitos-title" id="requisitos"> <div class="calcinfo-section"> <h4 class="calcinfo-section-title">Requisitos Generales</h4> <ul class="calcinfo-list"> <li><strong>Calidades Completas:</strong> Nombres y datos completos de comprador y vendedor en la escritura p&uacute;blica.</li> <li><strong>Personer\xEDa Jur\xEDdica</strong> Si aplica, certificaci&oacute;n reciente (menor a un mes) del representante legal.</li> <li><strong>Descripci&oacute;n del Bien:</strong> Detalles precisos, medidas, linderos y ubicaci&oacute;n. Para inmuebles, el n&uacute;mero de plano catastrado es obligatorio.</li> <li><strong>Debida Diligencia:</strong> Verificaci&oacute;n de que el bien est&eacute; libre de grav&aacute;menes, anotaciones y deudas (impuestos municipales, marchamo, RTV).</li> <li><strong>Documentos de Identificaci&oacute;n:</strong> C&eacute;dula, DIMEX o pasaporte vigente para todas las partes.</li> <li><strong>Pago de Impuestos:</strong> Constancia de pago de todos los impuestos y timbres del traspaso.</li> </ul> </div> <div class="calcinfo-section"> <h4 class="calcinfo-section-title">Declaraci&oacute;n Jurada de Origen de Fondos</h4> <p class="calcinfo-section-text">\nPara transacciones que superen los $10,000 USD, es obligatorio incluir en la escritura p&uacute;blica una declaraci&oacute;n jurada. Esta debe detallar el monto, la forma y el medio de pago del negocio. El notario advertir&aacute; a las partes sobre las penas por perjurio. Este es un requisito clave en la prevenci&oacute;n de legitimaci&oacute;n de capitales.\n</p> </div> </article> <!-- Guia Legal --> <h3 class="calcinfo-grid-title hidden-initial">Gu&iacute;a Legal de Referencia</h3> <p class="calcinfo-grid-subtitle hidden-initial">Conceptos fundamentales que rigen los traspasos en Costa Rica.</p> <div class="calcinfo-grid hidden-initial" id="guia-legal"> <article class="calcinfo-guide-card"> <h4 class="calcinfo-guide-title">Marco Legal</h4> <p class="calcinfo-guide-text">El proceso se rige por el C&oacute;digo Civil, C&oacute;digo Notarial y leyes tributarias. El Registro Nacional inscribe y da publicidad a los derechos, mientras que el Ministerio de Hacienda recauda los impuestos. El notario p&uacute;blico es el facilitador central del proceso.</p> </article> <article class="calcinfo-guide-card"> <h4 class="calcinfo-guide-title">Base Imponible: &ldquo;El Valor M&aacute;s Alto&rdquo;</h4> <p class="calcinfo-guide-text">La mayor&iacute;a de impuestos y timbres se calculan sobre el valor que sea mayor entre el precio de venta pactado y el valor fiscal registrado de la propiedad. Esto previene la subvaloraci&oacute;n para fines fiscales.</p> </article> <article class="calcinfo-guide-card"> <h4 class="calcinfo-guide-title">Retenci&oacute;n en Ganancias de Capital</h4> <p class="calcinfo-guide-text">En el traspaso de inmuebles, el comprador es el agente de retenci&oacute;n del impuesto sobre la ganancia de capital. Es responsable de retener un 2% (domiciliados) o 2.5% (no domiciliados) del precio de venta y pagarlo al fisco.</p> </article> </div> </div> </section> <!-- Animaciones --> <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"><\/script> ', ""])), maybeRenderHead(), renderScript($$result, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Calculator-info.astro?astro&type=script&index=0&lang.ts"));
}, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Calculator-info.astro", void 0);

const $$NavbarCalculator = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="toolkit-navbar" aria-label="Navegaci�n de calculadora"> <div class="toolkit-navbar-content"> <span class="toolkit-navbar-corner toolkit-navbar-corner-tl" aria-hidden="true"></span> <ul class="toolkit-navbar-links"> <li class="toolkit-navbar-item"> <a href="#calculadora" class="toolkit-navbar-link toolkit-navbar-link-active">
Calculadora
</a> </li> <li class="toolkit-navbar-item"> <a href="#requisitos" class="toolkit-navbar-link">
Requisitos
</a> </li> <li class="toolkit-navbar-item"> <a href="#guia-legal" class="toolkit-navbar-link">
Guía Legal
</a> </li> <li class="toolkit-navbar-item"> <a href="#importancia" class="toolkit-navbar-link">
Importancia
</a> </li> </ul> <span class="toolkit-navbar-corner toolkit-navbar-corner-br" aria-hidden="true"></span> </div> </nav> ${renderScript($$result, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Navbar-calculator.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Navbar-calculator.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$CalculatorImportancia = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", '<section class="calcimportancia-container" id="importancia"> <div class="calcimportancia-box hidden-initial" role="note"> <i class="ph ph-warning-circle calcimportancia-icon" aria-hidden="true"></i> <p class="calcimportancia-text">\nRealizar un traspaso de propiedad va m\xE1s all\xE1 de un simple c\xE1lculo de costos. Una\xA0debida diligencia exhaustiva\xA0es su mejor defensa contra riesgos ocultos, sorpresas fiscales, grav\xE1menes inesperados y fraudes. Identificar y mitigar estos riesgos a tiempo le ahorrar\xE1 dolores de cabeza y dinero a largo plazo.\n</p></div> </section> <!-- Animaciones --> <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"><\/script> ', ""])), maybeRenderHead(), renderScript($$result, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Calculator-importancia.astro?astro&type=script&index=0&lang.ts"));
}, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Calculator-importancia.astro", void 0);

const prerender = false;
const $$CalculatorToolkit = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${renderComponent($$result2, "CalcHero", $$CalculatorHero, {})} ${renderComponent($$result2, "NavbarCalc", $$NavbarCalculator, {})} ${renderComponent($$result2, "Calculator", $$Calculator, {})} ${renderComponent($$result2, "CalcInfo", $$CalculatorInfo, {})} ${renderComponent($$result2, "CalcImportancia", $$CalculatorImportancia, {})} ${renderComponent($$result2, "CalcCTA", $$TaxesCTA, {})} ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/pages/calculator-toolkit.astro", void 0);

const $$file = "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/pages/calculator-toolkit.astro";
const $$url = "/calculator-toolkit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CalculatorToolkit,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
