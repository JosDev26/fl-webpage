import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_orZa0e4K.mjs';
import { manifest } from './manifest_D_F-4zKp.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/logout.astro.mjs');
const _page3 = () => import('./pages/blog/_slug_.astro.mjs');
const _page4 = () => import('./pages/blog.astro.mjs');
const _page5 = () => import('./pages/calculator-toolkit.astro.mjs');
const _page6 = () => import('./pages/empresa-funcionando.astro.mjs');
const _page7 = () => import('./pages/faq-toolkit.astro.mjs');
const _page8 = () => import('./pages/fule-toolkit.astro.mjs');
const _page9 = () => import('./pages/login.astro.mjs');
const _page10 = () => import('./pages/negocio-nuevo.astro.mjs');
const _page11 = () => import('./pages/persona-individual.astro.mjs');
const _page12 = () => import('./pages/prueba.astro.mjs');
const _page13 = () => import('./pages/situacion-legal.astro.mjs');
const _page14 = () => import('./pages/taxes-toolkit.astro.mjs');
const _page15 = () => import('./pages/toolkit.astro.mjs');
const _page16 = () => import('./pages/userhome.astro.mjs');
const _page17 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["../../node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/logout.ts", _page2],
    ["src/pages/blog/[slug].astro", _page3],
    ["src/pages/blog/index.astro", _page4],
    ["src/pages/calculator-toolkit.astro", _page5],
    ["src/pages/empresa-funcionando.astro", _page6],
    ["src/pages/faq-toolkit.astro", _page7],
    ["src/pages/fule-toolkit.astro", _page8],
    ["src/pages/login.astro", _page9],
    ["src/pages/negocio-nuevo.astro", _page10],
    ["src/pages/persona-individual.astro", _page11],
    ["src/pages/prueba.astro", _page12],
    ["src/pages/situacion-legal.astro", _page13],
    ["src/pages/taxes-toolkit.astro", _page14],
    ["src/pages/toolkit.astro", _page15],
    ["src/pages/userhome.astro", _page16],
    ["src/pages/index.astro", _page17]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "55dc1233-66d6-466c-80cf-defe8282740a",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
