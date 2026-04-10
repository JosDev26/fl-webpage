import { c as createComponent, r as renderTemplate, a as renderScript, m as maybeRenderHead, d as renderComponent } from '../chunks/astro/server_sMJyriu2.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Navbar, b as $$Footer } from '../chunks/Footer_2rUtrsMj.mjs';
import 'clsx';
/* empty css                                              */
/* empty css                                              */
/* empty css                                         */
import { $ as $$TaxesCTA } from '../chunks/Taxes-CTA_CfCtdRVC.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$TaxesHero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", '<section class="faqhero-container"> <div class="faqhero-content"> <div class="faqhero-icon hidden-initial" aria-hidden="true"> <i class="ph ph-hand-coins"></i> </div> <h2 class="faqhero-title hidden-initial">\nAsesor\xEDa de Impuestos\n</h2> </div> </section> <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"><\/script> ', ""])), maybeRenderHead(), renderScript($$result, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Taxes-Hero.astro?astro&type=script&index=0&lang.ts"));
}, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Taxes-Hero.astro", void 0);

const $$NavbarTaxes = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="toolkit-navbar" aria-label="Navegación de toolkit"> <div class="toolkit-navbar-content"> <span class="toolkit-navbar-corner toolkit-navbar-corner-tl" aria-hidden="true"></span> <ul class="toolkit-navbar-links"> <li class="toolkit-navbar-item"> <a href="#planificacion-estrategica" class="toolkit-navbar-link toolkit-navbar-link-active">
Planificación Estratégica
</a> </li> <li class="toolkit-navbar-item"> <a href="#cumplimiento-proactivo" class="toolkit-navbar-link">
Cumplimiento Proactivo
</a> </li> <li class="toolkit-navbar-item"> <a href="#defensa-fiscal" class="toolkit-navbar-link">
Defensa Fiscal
</a> </li> <li class="toolkit-navbar-item"> <a href="#servicios-especializados" class="toolkit-navbar-link">
Servicios Especializados
</a> </li> </ul> <span class="toolkit-navbar-corner toolkit-navbar-corner-br" aria-hidden="true"></span> </div> </nav> ${renderScript($$result, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Navbar-taxes.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Navbar-taxes.astro", void 0);

const $$TaxesInfo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="taxes-info-container" id="planificacion-estrategica"> <div class="taxes-info-content"> <h2 class="taxes-info-title">Planificación Estratégica</h2> <p class="taxes-info-intro">
La planificación fiscal va más allá del cumplimiento; es un pilar fundamental para la salud financiera y el crecimiento sostenible de cualquier negocio. Esta sección explora cómo una asesoría proactiva permite optimizar la carga tributaria, aprovechar incentivos y estructurar operaciones de manera eficiente, transformando las obligaciones fiscales en oportunidades estratégicas.
</p> <article class="taxes-regimes-card" aria-labelledby="taxes-regimes-title"> <div class="taxes-regimes-text"> <h3 class="taxes-regimes-title" id="taxes-regimes-title">Análisis de Regímenes Tributarios</h3> <p class="taxes-regimes-description">
Costa Rica ofrece diversos regímenes fiscales. La elección correcta depende del tipo de actividad, nivel de ingresos y estructura del negocio. Una selección inadecuada puede resultar en pagos excesivos o pérdida de beneficios. A continuación, se visualiza la complejidad y aplicabilidad de cada régimen para facilitar una decisión informada.
</p> </div> <figure class="taxes-chart" aria-label="Aplicabilidad general de regímenes tributarios"> <div class="taxes-chart-ring-wrap"> <svg class="taxes-chart-ring" viewBox="0 0 200 200" role="img" aria-label="Distribución por régimen tributario"> <circle class="taxes-chart-track" cx="100" cy="100" r="70"></circle> <circle class="taxes-chart-segment taxes-segment-tradicional" cx="100" cy="100" r="70" stroke-dasharray="197.92 439.82" stroke-dashoffset="0" transform="rotate(-90 100 100)" data-regime="Tradicional" data-percent="45%"></circle> <circle class="taxes-chart-segment taxes-segment-simplificado" cx="100" cy="100" r="70" stroke-dasharray="65.97 439.82" stroke-dashoffset="-197.92" transform="rotate(-90 100 100)" data-regime="Simplificado" data-percent="15%"></circle> <circle class="taxes-chart-segment taxes-segment-agropecuario" cx="100" cy="100" r="70" stroke-dasharray="43.98 439.82" stroke-dashoffset="-263.89" transform="rotate(-90 100 100)" data-regime="Agropecuario" data-percent="10%"></circle> <circle class="taxes-chart-segment taxes-segment-rentas" cx="100" cy="100" r="70" stroke-dasharray="87.96 439.82" stroke-dashoffset="-307.87" transform="rotate(-90 100 100)" data-regime="Rentas de Capital" data-percent="20%"></circle> <circle class="taxes-chart-segment taxes-segment-bienes" cx="100" cy="100" r="70" stroke-dasharray="43.98 439.82" stroke-dashoffset="-395.83" transform="rotate(-90 100 100)" data-regime="Bienes Usados" data-percent="10%"></circle> </svg> <div class="taxes-chart-center" aria-live="polite"> <span class="taxes-chart-center-value" id="taxes-chart-value"></span> <span class="taxes-chart-center-label" id="taxes-chart-label"></span> </div> </div> <figcaption class="taxes-chart-legend"> <button class="taxes-legend-item" type="button" data-regime="Tradicional" data-percent="45%"> <span class="taxes-legend-color taxes-legend-tradicional" aria-hidden="true"></span>
Tradicional
</button> <button class="taxes-legend-item" type="button" data-regime="Simplificado" data-percent="15%"> <span class="taxes-legend-color taxes-legend-simplificado" aria-hidden="true"></span>
Simplificado
</button> <button class="taxes-legend-item" type="button" data-regime="Agropecuario" data-percent="10%"> <span class="taxes-legend-color taxes-legend-agropecuario" aria-hidden="true"></span>
Agropecuario
</button> <button class="taxes-legend-item" type="button" data-regime="Rentas de Capital" data-percent="20%"> <span class="taxes-legend-color taxes-legend-rentas" aria-hidden="true"></span>
Rentas de Capital
</button> <button class="taxes-legend-item" type="button" data-regime="Bienes Usados" data-percent="10%"> <span class="taxes-legend-color taxes-legend-bienes" aria-hidden="true"></span>
Bienes Usados
</button> </figcaption> </figure> </article> <div class="taxes-services-grid"> <button type="button" class="taxes-service-card taxes-service-card-active" data-panel="estructuracion"> <i class="ph ph-git-branch"></i> <span>Estructuración Fiscal</span> </button> <button type="button" class="taxes-service-card" data-panel="maximizacion"> <i class="ph ph-trend-up"></i> <span>Maximización de Incentivos</span> </button> <button type="button" class="taxes-service-card" data-panel="patrimonial"> <i class="ph ph-bank"></i> <span>Planificación Patrimonial</span> </button> </div> <div class="taxes-panel taxes-panel-active" data-panel="estructuracion"> <p>
Costa Rica ofrece diversos regímenes fiscales. La elección correcta depende del tipo de actividad, nivel de ingresos y estructura del negocio. Una selección inadecuada puede resultar en pagos excesivos o pérdida de beneficios. A continuación, se visualiza la complejidad y aplicabilidad de cada régimen para facilitar una decisión informada:
</p> <ul class="taxes-info-list"> <li> <strong>Nuevas Inversiones:</strong> Análisis de la figura legal óptima (persona física vs. jurídica) y el régimen tributario aplicable antes de iniciar operaciones.
</li> <li> <strong>Reorganizaciones:</strong> Planificación fiscal para fusiones, escisiones y adquisiciones para minimizar el impacto tributario de la transacción.
</li> <li> <strong>Operaciones Internacionales:</strong> Estructuración para optimizar la carga fiscal global y cumplir con normativas de precios de transferencia.
</li> </ul> </div> <div class="taxes-panel" data-panel="maximizacion"> <p>
La legislación costarricense contempla una serie de incentivos fiscales diseñados para impulsar sectores estratégicos, fomentar la inversión y promover el desarrollo económico. Identificar y aprovechar estos beneficios de forma oportuna puede generar ahorros significativos y mejorar la competitividad del negocio:
</p> <ul class="taxes-info-list"> <li> <strong>Zonas Francas:</strong> Evaluación de elegibilidad y asistencia en el proceso de ingreso al régimen de zona franca, con beneficios como exoneración del impuesto sobre la renta, importaciones y otros tributos.
</li> <li> <strong>Créditos Tributarios:</strong> Identificación y aplicación de créditos fiscales disponibles, incluyendo incentivos por investigación y desarrollo, capacitación y reinversión de utilidades.
</li> <li> <strong>Exoneraciones Sectoriales:</strong> Aprovechamiento de exoneraciones específicas para sectores como turismo, agricultura, tecnología y energía renovable conforme a la normativa vigente.
</li> </ul> </div> <div class="taxes-panel" data-panel="patrimonial"> <p>
Una planificación patrimonial adecuada permite proteger los activos, facilitar la transición generacional y optimizar la carga tributaria asociada a la tenencia y transferencia de bienes. Este enfoque integral asegura la continuidad del patrimonio familiar y empresarial:
</p> <ul class="taxes-info-list"> <li> <strong>Sucesión Empresarial:</strong> Diseño de estrategias para la transferencia ordenada del negocio a la siguiente generación, minimizando el impacto fiscal y asegurando la continuidad operativa.
</li> <li> <strong>Fideicomisos:</strong> Estructuración de fideicomisos de administración, garantía o inversión como herramienta para proteger activos, planificar herencias y optimizar la tributación.
</li> <li> <strong>Estructuras de Holding:</strong> Creación y gestión de sociedades holding para centralizar la administración de activos, facilitar operaciones entre empresas relacionadas y mejorar la eficiencia fiscal del grupo.
</li> </ul> </div> </div></section> ${renderScript($$result, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Taxes-info.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Taxes-info.astro", void 0);

const $$TaxesCumplimiento = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="cumplimiento-container" id="cumplimiento-proactivo"> <div class="cumplimiento-content"> <h2 class="cumplimiento-title">Cumplimiento Proactivo</h2> <p class="cumplimiento-intro">
El cumplimiento tributario en Costa Rica se ha vuelto más exigente con la digitalización de la Administración Tributaria y la implementación de TRIBU-CR. Un enfoque reactivo ya no es suficiente: las empresas necesitan sistemas robustos, procesos claros y asesoría constante para mantenerse al día y evitar sanciones costosas. Esta sección aborda los pilares de un cumplimiento fiscal sólido y sin sorpresas.
</p> <div class="cumplimiento-grid"> <button type="button" class="cumplimiento-card cumplimiento-card-active" data-panel="declaraciones"> <i class="ph ph-clipboard-text"></i> <span>Gestión de Declaraciones</span> </button> <button type="button" class="cumplimiento-card" data-panel="facturacion"> <i class="ph ph-file-text"></i> <span>Facturación Electrónica</span> </button> <button type="button" class="cumplimiento-card" data-panel="calendario"> <i class="ph ph-calendar-check"></i> <span>Calendario Fiscal</span> </button> <button type="button" class="cumplimiento-card" data-panel="tributar"> <i class="ph ph-desktop"></i> <span>TRIBU-CR y ATV</span> </button> </div> <div class="cumplimiento-panels"> <div class="cumplimiento-panel cumplimiento-panel-active" data-panel="declaraciones"> <p>
La preparación y presentación oportuna de declaraciones tributarias es la base del cumplimiento fiscal. Un error o un atraso pueden generar multas, intereses y marcas en el historial del contribuyente. Nuestro enfoque asegura precisión y puntualidad en cada obligación:
</p> <ul class="cumplimiento-list"> <li> <strong>Impuesto sobre la Renta:</strong> Preparación de la declaración anual (D-101) y las declaraciones de pagos parciales, asegurando la correcta aplicación de deducciones, créditos y el régimen correspondiente.
</li> <li> <strong>Impuesto al Valor Agregado:</strong> Gestión mensual de la declaración del IVA (D-104), incluyendo la conciliación de créditos fiscales, la regla de proporcionalidad y la correcta clasificación de operaciones gravadas, exentas y no sujetas.
</li> <li> <strong>Retenciones en la Fuente:</strong> Control y declaración de retenciones por salarios, servicios profesionales, remesas al exterior y otras rentas sujetas a retención conforme al Código Tributario.
</li> </ul> </div> <div class="cumplimiento-panel" data-panel="facturacion"> <p>
La facturación electrónica es obligatoria en Costa Rica y constituye un pilar del control tributario digital. Cualquier inconsistencia entre los comprobantes emitidos y las declaraciones presentadas puede activar alertas automáticas en la Administración Tributaria:
</p> <ul class="cumplimiento-list"> <li> <strong>Implementación y Configuración:</strong> Asistencia en la selección del sistema de facturación electrónica, configuración de claves criptográficas y registro ante el Ministerio de Hacienda para la emisión de comprobantes válidos.
</li> <li> <strong>Revisión de Comprobantes:</strong> Auditorías periódicas de los comprobantes emitidos y recibidos para asegurar la coherencia con los registros contables y las declaraciones fiscales.
</li> <li> <strong>Notas de Crédito y Débito:</strong> Gestión correcta de ajustes, devoluciones y anulaciones conforme a la normativa vigente, evitando inconsistencias que generen requerimientos de la Administración.
</li> </ul> </div> <div class="cumplimiento-panel" data-panel="calendario"> <p>
El incumplimiento de plazos es una de las causas más frecuentes de sanciones tributarias. Un calendario fiscal bien gestionado permite anticiparse a las obligaciones y evitar recargos innecesarios:
</p> <ul class="cumplimiento-list"> <li> <strong>Plazos de Declaración:</strong> Seguimiento de todas las fechas límite para declaraciones mensuales, trimestrales y anuales, incluyendo IVA, renta, pagos parciales, RTBF y otras obligaciones específicas del contribuyente.
</li> <li> <strong>Alertas Preventivas:</strong> Sistema de notificaciones anticipadas para cada obligación tributaria, asegurando que ningún plazo crítico pase desapercibido y evitando multas por presentación tardía.
</li> <li> <strong>Planificación de Flujo de Caja:</strong> Proyección de los pagos tributarios a lo largo del periodo fiscal para facilitar la gestión financiera y evitar problemas de liquidez en fechas de vencimiento.
</li> </ul> </div> <div class="cumplimiento-panel" data-panel="tributar"> <p>
TRIBU-CR representa un cambio fundamental en la fiscalización costarricense, centralizando la información de contribuyentes y cruzando datos de múltiples fuentes. Adaptarse a esta nueva realidad digital es esencial para evitar contingencias:
</p> <ul class="cumplimiento-list"> <li> <strong>Registro y Actualización:</strong> Asistencia en el correcto registro y actualización de datos ante la Administración Tributaria Virtual (ATV), incluyendo actividades económicas, domicilio fiscal, representantes legales y sucursales.
</li> <li> <strong>Cruces de Información:</strong> Revisión proactiva de las inconsistencias que TRIBU-CR puede detectar entre declaraciones, facturación electrónica, registros bancarios y reportes de terceros, anticipando posibles requerimientos.
</li> <li> <strong>Capacitación Interna:</strong> Formación del equipo contable y administrativo del cliente en el uso de las plataformas digitales de Hacienda y las mejores prácticas para mantener la información alineada y trazable.
</li> </ul> </div> </div> </div> </section> ${renderScript($$result, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Taxes-cumplimiento.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Taxes-cumplimiento.astro", void 0);

const $$TaxesDefensa = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="defensa-container" id="defensa-fiscal"> <div class="defensa-content"> <h2 class="defensa-title">Defensa Fiscal</h2> <p class="defensa-intro">
Cuando la Administración Tributaria inicia un procedimiento de fiscalización o determinación, contar con una defensa técnica sólida puede marcar la diferencia entre una resolución favorable y una sanción significativa. Esta sección cubre las herramientas y estrategias disponibles para proteger los derechos del contribuyente en cada etapa del proceso administrativo y judicial.
</p> <div class="defensa-grid"> <button type="button" class="defensa-card defensa-card-active" data-panel="auditorias"> <i class="ph ph-detective"></i> <span>Atención de Auditorías</span> </button> <button type="button" class="defensa-card" data-panel="recursos"> <i class="ph ph-scales"></i> <span>Recursos Administrativos</span> </button> <button type="button" class="defensa-card" data-panel="litigio"> <i class="ph ph-gavel"></i> <span>Litigio Tributario</span> </button> <button type="button" class="defensa-card" data-panel="sanciones"> <i class="ph ph-warning-circle"></i> <span>Gestión de Sanciones</span> </button> </div> <div class="defensa-panels"> <div class="defensa-panel defensa-panel-active" data-panel="auditorias"> <p>
Una auditoría tributaria puede surgir de inconsistencias detectadas por TRIBU-CR, cruces de información o selección aleatoria. La forma en que se gestiona desde el primer requerimiento determina en gran medida el resultado final del proceso:
</p> <ul class="defensa-list"> <li> <strong>Respuesta a Requerimientos:</strong> Preparación y presentación oportuna de la documentación solicitada por la Administración Tributaria, asegurando que cada respuesta sea completa, coherente y estratégicamente fundamentada.
</li> <li> <strong>Acompañamiento en Fiscalización:</strong> Representación del contribuyente durante todo el proceso de auditoría, incluyendo reuniones con los auditores, revisión de hallazgos preliminares y preparación de descargos técnicos.
</li> <li> <strong>Revisión Preventiva:</strong> Auditorías internas previas para identificar y corregir posibles contingencias antes de que la Administración las detecte, reduciendo significativamente el riesgo de ajustes y sanciones.
</li> </ul> </div> <div class="defensa-panel" data-panel="recursos"> <p>
El sistema tributario costarricense ofrece varias instancias administrativas para impugnar las resoluciones de la Administración. Conocer y utilizar estos recursos de forma estratégica es fundamental para proteger los intereses del contribuyente:
</p> <ul class="defensa-list"> <li> <strong>Recurso de Revocatoria:</strong> Impugnación ante la misma oficina que emitió la resolución, presentando argumentos de hecho y de derecho para solicitar la modificación o anulación del acto administrativo dentro del plazo legal.
</li> <li> <strong>Recurso de Apelación:</strong> Elevación del caso al Tribunal Fiscal Administrativo (TFA), aportando pruebas adicionales y argumentos jurídicos especializados para obtener una revisión independiente de la determinación tributaria.
</li> <li> <strong>Negociación y Conciliación:</strong> Cuando es estratégicamente conveniente, exploración de acuerdos con la Administración Tributaria para resolver controversias de manera eficiente, minimizando costos y tiempos procesales.
</li> </ul> </div> <div class="defensa-panel" data-panel="litigio"> <p>
Cuando las instancias administrativas se agotan o la complejidad del caso lo requiere, el litigio ante la jurisdicción contencioso-administrativa se convierte en la vía para hacer valer los derechos del contribuyente:
</p> <ul class="defensa-list"> <li> <strong>Demanda Contencioso-Administrativa:</strong> Preparación y presentación de la demanda ante los tribunales competentes, con una estrategia litigiosa fundamentada en la legislación tributaria, jurisprudencia relevante y doctrina especializada.
</li> <li> <strong>Medidas Cautelares:</strong> Solicitud de suspensión del acto impugnado cuando su ejecución pueda causar daños graves o de difícil reparación al contribuyente, protegiendo su patrimonio durante el proceso judicial.
</li> <li> <strong>Peritajes y Prueba Técnica:</strong> Coordinación con peritos contables y financieros para sustentar la posición del contribuyente con evidencia técnica sólida que fortalezca los argumentos ante el tribunal.
</li> </ul> </div> <div class="defensa-panel" data-panel="sanciones"> <p>
Las sanciones tributarias pueden ir desde multas económicas hasta el cierre de negocios. Una gestión adecuada permite reducir, mitigar o incluso eliminar las sanciones aplicadas por la Administración:
</p> <ul class="defensa-list"> <li> <strong>Reducción de Multas:</strong> Aplicación de los beneficios legales de reducción de sanciones por subsanación voluntaria o pago anticipado, aprovechando los porcentajes de descuento previstos en el Código de Normas y Procedimientos Tributarios.
</li> <li> <strong>Planes de Pago:</strong> Negociación de arreglos de pago con la Administración Tributaria para deudas tributarias firmes, estableciendo condiciones que sean viables para el flujo de caja del contribuyente y eviten acciones de cobro coactivo.
</li> <li> <strong>Prescripción y Caducidad:</strong> Análisis de los plazos de prescripción y caducidad aplicables para determinar si las obligaciones o sanciones reclamadas por la Administración han perdido vigencia legal, constituyendo una defensa procedente.
</li> </ul> </div> </div> </div> </section> ${renderScript($$result, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Taxes-defensa.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Taxes-defensa.astro", void 0);

const $$TaxesEspecializados = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="especializados-container" id="servicios-especializados"> <div class="especializados-content"> <h2 class="especializados-title">Servicios Especializados de Alto Valor</h2> <p class="especializados-intro">
Más allá de la planificación y el cumplimiento general, existen áreas de alta complejidad que requieren un conocimiento especializado. Estos servicios de alto valor agregado abordan normativas específicas y situaciones transaccionales complejas, ofreciendo soluciones sofisticadas para los desafíos tributarios más exigentes. La centralización de la información en TRIBU-CR también impacta la visibilidad de estas operaciones, haciendo que la asesoría en estas áreas sea aún más crucial.
</p> <div class="especializados-grid"> <button type="button" class="especializados-card especializados-card-active" data-panel="precios"> <i class="ph ph-swap"></i> <span>Precios de Transferencia</span> </button> <button type="button" class="especializados-card" data-panel="ganancias"> <i class="ph ph-chart-line-up"></i> <span>Gestión de Ganancias de Capital</span> </button> <button type="button" class="especializados-card" data-panel="iva"> <i class="ph ph-receipt"></i> <span>Optimización del IVA</span> </button> <button type="button" class="especializados-card" data-panel="rtbf"> <i class="ph ph-shield-check"></i> <span>Cumplimiento del RTBF</span> </button> <button type="button" class="especializados-card" data-panel="diligencia"> <i class="ph ph-magnifying-glass"></i> <span>Debida Diligencia</span> </button> </div> <div class="especializados-panels"> <div class="especializados-panel especializados-panel-active" data-panel="precios"> <p>
Asesoría para asegurar que las transacciones entre partes relacionadas se valoren a precios de mercado, evitando ajustes fiscales. Incluye la preparación de estudios de precios de transferencia y la negociación de Acuerdos Anticipados de Precios (APA) con la Administración Tributaria para dar certeza a las operaciones intercompañía.
</p> </div> <div class="especializados-panel" data-panel="ganancias"> <p>
Optimización de la tributación en la venta de activos como acciones, bienes inmuebles e intangibles. Se analiza la aplicación de tasas reducidas, la compensación de pérdidas y la correcta integración de estas rentas al régimen general cuando corresponda.
</p> </div> <div class="especializados-panel" data-panel="iva"> <p>
Asesoría en la correcta aplicación de créditos fiscales y la gestión de la regla de proporcionalidad para empresas con ventas a diferentes tarifas de IVA. El objetivo es maximizar la recuperación del IVA pagado en compras y evitar pagos indebidos.
</p> </div> <div class="especializados-panel" data-panel="rtbf"> <p>
Asistencia integral en la declaración anual del Registro de Transparencia y Beneficiarios Finales (RTBF) a través de "Central Directo". Este servicio es crucial para evitar las severas multas y restricciones registrales asociadas al incumplimiento, especialmente para sociedades inactivas, dada la mayor visibilidad que TRIBU-CR proporcionará.
</p> </div> <div class="especializados-panel" data-panel="diligencia"> <p>
Realización de auditorías fiscales exhaustivas en procesos de fusiones y adquisiciones. Se identifican contingencias fiscales ocultas, se evalúa el nivel de cumplimiento del objetivo de compra y se cuantifican los riesgos para proteger la inversión y negociar los términos de la transacción de manera informada.
</p> </div> </div> </div> </section> ${renderScript($$result, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Taxes-Especializados.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/Taxes-Especializados.astro", void 0);

const prerender = false;
const $$TaxesToolkit = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${renderComponent($$result2, "TaxesHero", $$TaxesHero, {})} ${renderComponent($$result2, "Navbar2", $$NavbarTaxes, {})} ${maybeRenderHead()}<div class="toolkit-sections"> ${renderComponent($$result2, "Info", $$TaxesInfo, {})} ${renderComponent($$result2, "Cumplimiento", $$TaxesCumplimiento, {})} ${renderComponent($$result2, "Defensa", $$TaxesDefensa, {})} ${renderComponent($$result2, "Especializados", $$TaxesEspecializados, {})} </div> ${renderComponent($$result2, "TaxesCTA", $$TaxesCTA, {})} ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/pages/taxes-toolkit.astro", void 0);

const $$file = "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/pages/taxes-toolkit.astro";
const $$url = "/taxes-toolkit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$TaxesToolkit,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
