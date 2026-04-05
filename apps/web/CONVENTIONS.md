# Convenciones y Guía de Estilo — Fusión Legal Webpage

> **Propósito:** Documento de referencia para agentes de código (Claude, ChatGPT, Copilot, etc.) que generen código congruente con el codebase existente. Seguir estas reglas al pie de la letra.

---

## 1. Stack Tecnológico

| Herramienta | Versión / Detalle |
|---|---|
| Framework | **Astro 5.x** (`astro ^5.14.8`) |
| Lenguaje | **TypeScript** (modo `strict` via `tsconfig.json`) |
| Tipo de módulo | `"type": "module"` en `package.json` |
| Fuente tipográfica | `@fontsource-variable/nunito-sans` (importada en `Layout.astro`) |
| Animaciones | **Anime.js 3.x** (cargado via CDN en cada componente que lo usa) |
| Iconos | **Phosphor Icons** (CDN `@phosphor-icons/web`, clase `ph ph-{nombre}`) |
| Imágenes | Formato **WebP**, alojadas en `/public/` |
| CSS | **Archivos CSS separados por componente** (sin preprocesadores, sin Tailwind) |

---

## 2. Estructura de Archivos

```
src/
├── assets/              # Assets procesados por Astro (imágenes importadas)
├── components/          # Componentes .astro (uno por sección de la página)
│   ├── Header.astro     # Hero / sección principal
│   ├── Navbar.astro
│   ├── Services.astro
│   ├── Experience.astro
│   ├── Reviews.astro
│   └── Footer.astro
├── layouts/
│   └── Layout.astro     # Layout base (HTML shell, variables CSS globales, fuentes)
├── pages/
│   └── index.astro      # Página principal, solo importa y compone componentes
└── styles/              # Un archivo CSS por componente
    ├── hero.css          # Estilos de Header.astro
    ├── navbar.css
    ├── services.css
    ├── experience.css
    ├── reviews.css
    ├── footer.css
    └── mainpage.css      # Estilos globales/legacy (sección "Sobre nosotros")
public/                   # Archivos estáticos (imágenes, favicon)
```

### Reglas de estructura
- **1 componente = 1 archivo `.astro` + 1 archivo `.css`** en `src/styles/`.
- Al crear un nuevo componente `MiSeccion.astro`, crear también `src/styles/miseccion.css` e importarlo en el frontmatter del componente.
- Las páginas (`src/pages/`) **solo componen componentes**, no contienen HTML de sección ni estilos propios.
- `Layout.astro` define el shell HTML, las variables CSS globales (`:root`), y las fuentes. No agregar estilos de componente aquí.

---

## 3. Componentes Astro — Estructura Interna

Cada archivo `.astro` sigue esta estructura exacta:

```astro
---
// 1. Importar el CSS del componente
import '../styles/mi-componente.css';

// 2. Otras importaciones (componentes, assets, etc.)
import { Image } from 'astro:assets';
---

<!-- 3. HTML del componente -->
<section class="mi-componente-container">
    <!-- contenido -->
</section>

<!-- 4. Script de animaciones (si aplica) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" is:inline></script>
<script>
  declare const anime: any;
  // lógica del componente
</script>
```

### Reglas del frontmatter (`---`)
- Importar CSS como primera línea: `import '../styles/nombre.css';`
- Importar fuentes con `import '@fontsource-variable/nunito-sans';` solo si se necesita en ese componente específico (ya está en `Layout.astro` globalmente).
- Usar `import { Image } from 'astro:assets';` para optimización de imágenes.

---

## 4. Nombrado CSS — Clases

### Patrón de nombrado: **BEM simplificado con sufijo de componente**

El proyecto usa un sistema consistente donde:

1. **El contenedor raíz** de cada sección lleva el sufijo `-container`:
   - `.hero` (excepción: el hero no usa `-container`)
   - `.services-container`
   - `.experience-container`
   - `.reviews-container`
   - `.footer-container`
   - `.glass-navbar` (excepción: la navbar tiene nombre propio)

2. **Los hijos** usan el **prefijo del componente padre** seguido de `-nombre`:
   - `.services-title`, `.services-subtitle`, `.services-grid`
   - `.experience-items`, `.experience-item`
   - `.reviews-title`, `.review-card`, `.reviewer-info`, `.reviewer-name`
   - `.footer-content`, `.footer-title`, `.footer-form-section`, `.footer-info-section`
   - `.carousel-wrapper`, `.carousel-stage`, `.carousel-track`, `.carousel-nav`

3. **Modificadores** se agregan como clase separada (no con `--`):
   - `.service-card-wide` (no `.service-card--wide`)
   - `.navbar-hidden`, `.navbar-scrolled`
   - `.review-card.active`, `.review-card.prev`, `.review-card.next`
   - `.footer-corner-tl`, `.footer-corner-br`

4. **Clases utilitarias** definidas globalmente:
   - `.hidden-initial` → `opacity: 0;` (para elementos que se animarán al aparecer)
   - `.no-mobile` → ocultar en pantallas pequeñas
   - `.highlight` → texto en color amarillo (dentro de títulos)
   - `.underline-text` → texto subrayado

### Convención de nombrado — Resumen rápido

| Tipo | Formato | Ejemplo |
|---|---|---|
| Contenedor de sección | `.{seccion}-container` | `.services-container` |
| Título de sección | `.{seccion}-title` | `.reviews-title` |
| Subtítulo | `.{seccion}-subtitle` | `.services-subtitle` |
| Grid/lista | `.{seccion}-grid` o `.{seccion}-items` | `.services-grid` |
| Item individual | `.{seccion}-item` o `.{seccion}-card` | `.experience-item`, `.service-card` |
| Sub-elementos de card | `.{item}-icon`, `.{item}-text` | `.service-icon`, `.service-text` |
| Estado/variante | Clase adicional descriptiva | `.active`, `.prev`, `.navbar-hidden` |
| Contenido del layout | `.{seccion}-content` | `.footer-content`, `.services-content` |

---

## 5. Variables CSS

Las variables de diseño se definen en `:root` y se **repiten en cada archivo CSS** (redundancia intencional del proyecto):

```css
:root {
  --yellow-color: #FAD02C;    /* Color primario / acento */
  --dark-blue-color: #19304B;  /* Color de fondo / oscuro */
}
```

### Variaciones de color usadas directamente (sin variable)
| Uso | Valor |
|---|---|
| Hover de amarillo | `#f5d957` |
| Texto blanco | `#fff` o `rgba(255, 255, 255, 0.85)` |
| Texto blanco tenue | `rgba(255, 255, 255, 0.6)` o `rgba(255, 255, 255, 0.4)` |
| Sombra de amarillo | `rgba(250, 208, 44, 0.3)` a `rgba(250, 208, 44, 0.5)` |
| Sombra negra | `rgba(0, 0, 0, 0.3)` a `rgba(0, 0, 0, 0.5)` |
| Borde sutil amarillo | `rgba(250, 208, 44, 0.25)` |

### Regla: Siempre usar `var(--yellow-color)` y `var(--dark-blue-color)` para los colores base. Las variaciones con `rgba()` se escriben con los valores RGB literales.

---

## 6. CSS — Patrones Recurrentes

### 6.1 Tipografía responsiva
Usar `clamp()` como método principal, o `calc()` con `vw` + `rem`:

```css
/* Método preferido: clamp() */
font-size: clamp(1.2rem, 2.5vw, 2.2rem);

/* Método alternativo (usado en hero y experience): */
font-size: calc(1.1rem + 2.8vw);
font-size: calc(0.65rem + 0.4vw);
```

### 6.2 Spacing responsivo
Siempre con `clamp()`:

```css
padding: clamp(4em, 8vw, 6em) clamp(1em, 3vw, 2em);
gap: clamp(0.8em, 1.5vw, 1.2em);
```

### 6.3 Sizing responsivo para anchos máximos
Patrón: `min(valor_fijo, porcentaje_viewport)`:

```css
max-width: min(1100px, 92vw);
max-width: min(900px, 85vw);
width: min(400px, 78vw);
```

### 6.4 Bordes de marca
Las tarjetas y contenedores destacados usan borde sólido amarillo con grosor responsivo:

```css
border: clamp(2px, 0.25vw, 3px) solid var(--yellow-color);
/* Variante más gruesa para elementos grandes: */
border: clamp(5px, 0.6vw, 8px) solid var(--yellow-color);
```

### 6.5 Transiciones
La curva de easing preferida en CSS es `cubic-bezier(0.4, 0, 0.2, 1)`:

```css
transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
/* Transiciones simples: */
transition: all 0.3s ease;
transition: color 0.3s ease;
```

### 6.6 Sombras en hover
Patrón consistente de sombra dorada en hover:

```css
.elemento:hover {
    box-shadow: 0 10px 30px rgba(250, 208, 44, 0.3);
    transform: translateY(-3px);
}
```

### 6.7 Sin border-radius
El proyecto **NO usa `border-radius`** en tarjetas, botones ni contenedores (estética cuadrada/angular). Excepciones: la navbar usa `border-radius: 50%` solo en botones circulares del carrusel, avatares y el scrollbar.

### 6.8 Accesibilidad
Incluir siempre:

```css
/* Focus visible para navegación por teclado */
.elemento:focus-visible {
    outline: 3px solid var(--yellow-color);
    outline-offset: 4px;
}

/* Reduced motion al final del archivo CSS */
@media (prefers-reduced-motion: reduce) {
    .elemento {
        transition: opacity 0.3s ease;
    }
    .elemento:hover {
        transform: none;
    }
}
```

### 6.9 Media queries para responsive

| Breakpoint | Uso |
|---|---|
| `max-width: 480px` | Mobile pequeño |
| `max-width: 768px` | Mobile/Tablet |
| `max-width: 900px` | Tablet (ocultar decoraciones) |
| `@media (hover: hover) and (pointer: fine)` | Solo dispositivos con mouse |
| `@container (max-width: 500px)` | Container queries (Services) |

---

## 7. JavaScript / TypeScript en Componentes

### 7.1 Patrón de scripts en Astro
- Anime.js se carga via CDN con `is:inline`: `<script src="...anime.min.js" is:inline></script>`
- Se declara `anime` con `declare const anime: any;` al inicio del script.
- Toda la lógica se envuelve en `document.addEventListener('DOMContentLoaded', () => { ... });`

### 7.2 Patrón de animaciones de entrada (scroll-triggered)

```typescript
declare const anime: any;

document.addEventListener('DOMContentLoaded', () => {
    const targetElement = document.querySelector('.mi-seccion');
    if (!targetElement) return;

    // Soporte para restauración de scroll
    const isRestoring = sessionStorage.getItem('isRestoring') === 'true';
    const delay = isRestoring ? 150 : 0;

    setTimeout(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: '.mi-elemento',
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 600,
                        easing: 'easeOutCubic',
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.2 });

        observer.observe(targetElement);
    }, delay);
});
```

### 7.3 Convenciones de animación

| Propiedad | Valores típicos |
|---|---|
| `opacity` | `[0, 1]` |
| `translateY` | `[20-40, 0]` (entrada desde abajo) o `[-30, 0]` (entrada desde arriba) |
| `scale` | `[0.9-0.95, 1]` |
| `duration` | `400-900ms` |
| `easing` | `'easeOutCubic'`, `'easeOutQuart'`, `'easeOutBack'`, `'easeOutElastic(1, 0.8)'` |
| `delay` (stagger) | `anime.stagger(100-150)` |
| Timeline offset | `'-=200'` a `'-=500'` (solapar con animación anterior) |

### 7.4 Patrón de Intersection Observer

```typescript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // ejecutar animación
            observer.disconnect(); // disconnect después de primera activación
        }
    });
}, {
    threshold: 0.2,  // valores usados: 0.2, 0.3, 0.5
    rootMargin: '0px'
});
```

### 7.5 Variables y nombrado en JavaScript

| Tipo | Convención | Ejemplo |
|---|---|---|
| Variables | `camelCase` | `currentIndex`, `autoplayInterval`, `touchStartX` |
| Constantes | `UPPER_SNAKE_CASE` | `AUTOPLAY_DURATION`, `PROGRESS_UPDATE_INTERVAL` |
| Funciones | `camelCase` (verbos) | `goToSlide()`, `resetAutoplay()`, `updateCardPositions()` |
| Event handlers | `camelCase` (verbos) | `handleKeyboard()`, `updateNavbar()` |
| DOM references | `camelCase` descriptivo | `carouselStage`, `reviewCards`, `prevButton` |
| Type assertions | `as HTMLElement`, `as HTMLButtonElement` | `document.querySelector('.x') as HTMLElement` |

### 7.6 Tipado
- Usar `declare const anime: any;` para librerías externas CDN.
- Hacer `as HTMLElement` o `as NodeListOf<HTMLElement>` en `querySelector`/`querySelectorAll`.
- Tipar parámetros de event handlers: `(e: KeyboardEvent)`, `(e: TouchEvent)`.

---

## 8. HTML — Patrones y Accesibilidad

### 8.1 Estructura de secciones
Cada sección de la página es un `<section>` con clase `-container`:

```html
<section class="mi-seccion-container">
    <h2 class="mi-seccion-title hidden-initial">Título</h2>
    <div class="mi-seccion-content">
        <!-- contenido -->
    </div>
</section>
```

### 8.2 Accesibilidad
- Usar `aria-label` en botones sin texto visible: `aria-label="Review anterior"`
- Usar `aria-hidden="true"` en elementos decorativos: `<div class="footer-corners" aria-hidden="true">`
- Usar `alt` descriptivo en imágenes: `alt="Logo Fusión Legal"`
- Usar `loading="lazy"` en imágenes que no son above-the-fold.
- Links externos llevan `target="_blank" rel="noopener noreferrer"`.
- Formularios usan `<label for="">` asociado con `id` del input.
- Elementos interactivos no-nativos llevan `tabindex="0"`.

### 8.3 Imágenes
- Formato: WebP.
- Referencia con `import.meta.env.BASE_URL + 'nombre.webp'` para imágenes en `/public/`.
- Avatares generados: `https://ui-avatars.com/api/?name=...&background=FAD02C&color=19304B&bold=true&size=96`

### 8.4 Iconos (Phosphor)
```html
<i class="ph ph-rocket-launch"></i>
<i class="ph ph-buildings"></i>
<i class="ph ph-user"></i>
<i class="ph ph-facebook-logo"></i>
```

### 8.5 Comentarios en HTML
Usar comentarios descriptivos en español para separar secciones dentro de componentes:

```html
<!-- Columna izquierda: Formulario -->
<!-- Esquinas decorativas estilo hero -->
<!-- Iconos de redes sociales -->
```

---

## 9. Idioma y Contenido

- **Idioma del contenido visible:** Español (Costa Rica). Usar "vos" informal ("Hacé clic", "Rellená", "Podés confiar").
- **Idioma del código:** Inglés para nombres de clases CSS, variables JS, funciones. Español solo en:
  - Comentarios de código (CSS y JS).
  - Comentarios HTML.
  - Atributos `aria-label` en español cuando es texto visible para el usuario.
  - Texto de `alt` en imágenes.
- **`lang="en"` en `<html>`**: El doc está marcado como inglés pero el contenido es español. Mantener esta decisión existente por consistencia.

---

## 10. Diseño Visual — Resumen para Nuevos Componentes

| Aspecto | Regla |
|---|---|
| Fondo general | `var(--dark-blue-color)` (#19304B) |
| Color de acento | `var(--yellow-color)` (#FAD02C) |
| Color de hover del acento | `#f5d957` |
| Texto principal | `#fff` |
| Texto secundario | `rgba(255, 255, 255, 0.6-0.85)` |
| Fuente | `'Nunito Sans Variable', sans-serif` |
| Peso del título | `800` (Extra Bold) |
| Peso del cuerpo | `400-500` |
| Peso de botones/labels | `700` |
| Bordes | Sólidos, color amarillo, sin border-radius (cuadrados) |
| Sombras hover | `0 10px 30px rgba(250, 208, 44, 0.3)` |
| Botones | Fondo transparente + borde amarillo, o fondo amarillo + texto oscuro |
| Dirección de animación | Elementos entran desde abajo (`translateY` positivo) o desde arriba (`translateY` negativo) |

---

## 11. Checklist para Crear un Nuevo Componente

1. Crear `src/components/NuevoComponente.astro`.
2. Crear `src/styles/nuevocomponente.css` (nombre en minúsculas, sin guiones, o con guiones si aplica).
3. En el `.astro`, importar el CSS como primera línea del frontmatter.
4. Definir `:root` con `--yellow-color` y `--dark-blue-color` al inicio del CSS.
5. Usar `.{nombre}-container` como clase del elemento raíz (`<section>`).
6. Agregar `.hidden-initial` a elementos que serán animados.
7. Si hay animaciones: cargar Anime.js via CDN, declarar `declare const anime: any;`, usar `IntersectionObserver` + `DOMContentLoaded`.
8. Manejar `sessionStorage.getItem('isRestoring')` para retardo en restauración de scroll.
9. Incluir `@media (prefers-reduced-motion: reduce)` al final del CSS.
10. Incluir `:focus-visible` en elementos interactivos.
11. Importar el componente en `src/pages/index.astro` en la posición deseada dentro de `<Layout>`.

---

## 12. Anti-patrones — NO Hacer

- **NO** usar Tailwind, CSS-in-JS, ni `<style>` scoped en componentes (excepto `Layout.astro`).
- **NO** usar `border-radius` en tarjetas o botones rectangulares.
- **NO** instalar Anime.js como dependencia npm — se carga via CDN.
- **NO** poner HTML de secciones directamente en `index.astro`.
- **NO** usar `px` fijos para `font-size`, `padding` o `gap` — siempre `clamp()` o `calc()`.
- **NO** crear archivos CSS que no correspondan a un componente.
- **NO** modificar las variables `:root` globales sin actualizar todos los archivos CSS que las replican.
- **NO** olvidar `display: none` / ocultar decoraciones en mobile.
- **NO** usar IDs para estilos CSS (los IDs se usan solo para `querySelector` en JS y para `for/id` en formularios).
