import { c as createComponent, m as maybeRenderHead, b as addAttribute, r as renderTemplate, a as renderScript, d as renderComponent, F as Fragment } from '../chunks/astro/server_sMJyriu2.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Navbar, b as $$Footer } from '../chunks/Footer_2rUtrsMj.mjs';
import 'clsx';
/* empty css                                 */
import { a as getTags, b as getBlogPosts } from '../chunks/payload_DrePLXtL.mjs';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const $$SubscribeBanner = createComponent(async ($$result, $$props, $$slots) => {
  let tags = [];
  try {
    tags = await getTags();
  } catch {
  }
  const payloadUrl = "http://localhost:3000";
  return renderTemplate`${maybeRenderHead()}<div class="subscribe-banner"${addAttribute(payloadUrl, "data-payload-url")}> <div class="subscribe-banner-content"> <div class="subscribe-banner-text"> <h3 class="subscribe-banner-title"> <span class="subscribe-banner-title-accent">Suscríbete</span> a ADA
</h3> <p class="subscribe-banner-copy">Recibe contenido legal relevante directo a tu correo.</p> </div> <form class="subscribe-banner-form" data-subscribe-form> <div class="subscribe-banner-row"> <input type="email" class="subscribe-banner-input" placeholder="tu@correo.com" required data-subscribe-email autocomplete="email"> <div class="subscribe-banner-lang" data-subscribe-lang="es"> <button type="button" class="subscribe-banner-lang-btn active" data-lang-btn="es">ES</button> <button type="button" class="subscribe-banner-lang-btn" data-lang-btn="en">EN</button> </div> <button type="submit" class="subscribe-banner-submit" data-subscribe-submit>
Suscribirse
</button> </div> ${tags.length > 0 && renderTemplate`<div class="subscribe-banner-tags"> <span class="subscribe-banner-tags-label">Categorías de interés:</span> <div class="subscribe-banner-tags-list"> ${tags.map((tag) => renderTemplate`<label class="subscribe-banner-tag"> <input type="checkbox" name="tags"${addAttribute(tag.id, "value")}> <span>${tag.name}</span> </label>`)} </div> </div>`} <div class="subscribe-banner-status" data-subscribe-status aria-live="polite"></div> </form> </div> </div> ${renderScript($$result, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/SubscribeBanner.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/SubscribeBanner.astro", void 0);

const $$SubscribePopup = createComponent(async ($$result, $$props, $$slots) => {
  let tags = [];
  try {
    tags = await getTags();
  } catch {
  }
  const payloadUrl = "http://localhost:3000";
  return renderTemplate`${maybeRenderHead()}<div class="subscribe-popup-overlay" data-popup-overlay${addAttribute(payloadUrl, "data-payload-url")} aria-hidden="true"> <div class="subscribe-popup" role="dialog" aria-label="Suscripcion al boletin"> <button type="button" class="subscribe-popup-close" data-popup-close aria-label="Cerrar"> <i class="ph ph-x" aria-hidden="true"></i> </button> <h3 class="subscribe-popup-title">
No te pierdas nuestro <span>contenido legal</span> </h3> <p class="subscribe-popup-copy">Suscribete y recibe articulos relevantes directo a tu correo.</p> <form class="subscribe-popup-form" data-popup-form> <div class="subscribe-popup-row"> <input type="email" class="subscribe-popup-input" placeholder="tu@correo.com" required data-popup-email autocomplete="email"> <div class="subscribe-popup-lang" data-popup-lang="es"> <button type="button" class="subscribe-popup-lang-btn active" data-popup-lang-btn="es">ES</button> <button type="button" class="subscribe-popup-lang-btn" data-popup-lang-btn="en">EN</button> </div> </div> ${tags.length > 0 && renderTemplate`<div class="subscribe-popup-tags"> <span class="subscribe-popup-tags-label">Temas de interes:</span> <div class="subscribe-popup-tags-list"> ${tags.map((tag) => renderTemplate`<label class="subscribe-popup-tag"> <input type="checkbox" name="popup-tags"${addAttribute(tag.id, "value")}> <span>${tag.name}</span> </label>`)} </div> </div>`} <button type="submit" class="subscribe-popup-submit" data-popup-submit>
Suscribirse
</button> <div class="subscribe-popup-status" data-popup-status aria-live="polite"></div> </form> </div> </div> ${renderScript($$result, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/SubscribePopup.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/components/SubscribePopup.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let posts = [];
  try {
    posts = await getBlogPosts();
  } catch {
  }
  const sorted = [...posts].sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
  const featured = sorted[0] ?? null;
  const latest = posts.filter((p) => p.id !== featured?.id).slice(0, 4);
  const latestMain = latest[0] ?? null;
  const latestSide = latest.slice(1, 4);
  const tagMap = /* @__PURE__ */ new Map();
  for (const post of posts) {
    if (!post.tags || post.tags.length === 0) continue;
    for (const tag of post.tags) {
      if (!tagMap.has(tag.name)) {
        tagMap.set(tag.name, { tag, posts: [] });
      }
      tagMap.get(tag.name).posts.push(post);
    }
  }
  const tagGroups = [...tagMap.values()].sort((a, b) => b.posts.length - a.posts.length);
  const allTags = tagGroups.map((g) => g.tag);
  return renderTemplate(_a || (_a = __template(["", ` <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"><\/script> <script>
document.addEventListener('DOMContentLoaded', () => {
  /* ===== Animations ===== */
  var isRestoring = sessionStorage.getItem('isRestoring') === 'true';
  var animDelay = isRestoring ? 150 : 0;

  function observeAnimate(selector, animationProps, options) {
    var el = document.querySelector(selector);
    if (!el) return;
    setTimeout(function () {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (typeof animationProps === 'function') {
              animationProps();
            } else {
              anime(animationProps);
            }
            observer.disconnect();
          }
        });
      }, { threshold: options && options.threshold || 0.15 });
      observer.observe(el);
    }, animDelay);
  }

  // Hero \u2014 fade in image from left, content from right
  observeAnimate('.blog-hero', function () {
    anime.timeline({ easing: 'easeOutCubic' })
      .add({
        targets: '.blog-hero-image',
        opacity: [0, 1],
        translateX: [-40, 0],
        duration: 700,
      })
      .add({
        targets: '.blog-hero-content',
        opacity: [0, 1],
        translateX: [40, 0],
        duration: 700,
      }, '-=500');
    anime({ targets: '.blog-hero', opacity: [0, 1], duration: 1, easing: 'linear' });
  });

  // Latest entries section \u2014 fade up title then stagger cards
  observeAnimate('.blog-section', function () {
    anime({ targets: '.blog-section', opacity: [0, 1], duration: 1, easing: 'linear' });
    anime.timeline({ easing: 'easeOutCubic' })
      .add({
        targets: '.blog-section-title',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
      })
      .add({
        targets: '.blog-latest-main',
        opacity: [0, 1],
        translateY: [40, 0],
        scale: [0.97, 1],
        duration: 600,
      }, '-=200')
      .add({
        targets: '.blog-latest-side-card',
        opacity: [0, 1],
        translateX: [30, 0],
        duration: 500,
        delay: anime.stagger(120),
      }, '-=300');
  });

  // Search section \u2014 fade up
  observeAnimate('.blog-search-section', function () {
    anime({ targets: '.blog-search-section', opacity: [0, 1], duration: 1, easing: 'linear' });
    anime.timeline({ easing: 'easeOutCubic' })
      .add({
        targets: '.blog-search-bar',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
      })
      .add({
        targets: '.blog-search-tag-btn',
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 400,
        delay: anime.stagger(50),
      }, '-=200');
  });

  // Carousel sections \u2014 each observed independently
  document.querySelectorAll('.blog-carousel-section').forEach(function (section) {
    setTimeout(function () {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            anime({ targets: entry.target, opacity: [0, 1], duration: 1, easing: 'linear' });
            anime.timeline({ easing: 'easeOutCubic' })
              .add({
                targets: entry.target.querySelector('.blog-carousel-header'),
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 500,
              })
              .add({
                targets: entry.target.querySelectorAll('.blog-carousel-card'),
                opacity: [0, 1],
                translateY: [30, 0],
                scale: [0.95, 1],
                duration: 600,
                delay: anime.stagger(100),
              }, '-=250');
            observer.disconnect();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(section);
    }, animDelay);
  });

  /* ===== Carousel scrolling ===== */
  document.querySelectorAll('.blog-carousel-wrapper').forEach((wrapper) => {
    const track = wrapper.querySelector('.blog-carousel-track');
    const leftBtn = wrapper.querySelector('.blog-carousel-arrow-left');
    const rightBtn = wrapper.querySelector('.blog-carousel-arrow-right');
    if (!track || !leftBtn || !rightBtn) return;

    const scrollAmount = () => {
      const card = track.querySelector('.blog-carousel-card');
      return card ? card.offsetWidth + 16 : 300;
    };

    leftBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
  });

  /* ===== Search / filter by tag ===== */
  const searchInput = document.getElementById('blog-tag-search');
  const searchTagsContainer = document.getElementById('blog-search-tags');
  const carouselsContainer = document.getElementById('blog-carousels');
  const sections = document.querySelectorAll('.blog-carousel-section');
  const tagButtons = document.querySelectorAll('.blog-search-tag-btn');

  if (!searchInput || !searchTagsContainer || !carouselsContainer) return;

  // Normalize text for accent-insensitive search
  function normalize(str) {
    return str.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase().trim();
  }

  // Pre-build normalized tag index for O(n) lookup
  const tagIndex = [];
  tagButtons.forEach((btn) => {
    tagIndex.push({
      el: btn,
      name: btn.getAttribute('data-tag'),
      normalized: normalize(btn.getAttribute('data-tag') || ''),
    });
  });

  const sectionIndex = [];
  sections.forEach((sec) => {
    sectionIndex.push({
      el: sec,
      name: sec.getAttribute('data-tag-section'),
      normalized: normalize(sec.getAttribute('data-tag-section') || ''),
    });
  });

  // Animate sections appearing/disappearing on filter
  function animateFilter(matchFn) {
    sectionIndex.forEach(function (item) {
      var matches = matchFn(item);
      if (matches) {
        if (item.el.style.display === 'none' || item.el.dataset.hidden === '1') {
          item.el.style.display = '';
          item.el.dataset.hidden = '0';
          anime({
            targets: item.el,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 400,
            easing: 'easeOutCubic',
          });
          anime({
            targets: item.el.querySelectorAll('.blog-carousel-card'),
            opacity: [0, 1],
            translateY: [15, 0],
            scale: [0.97, 1],
            duration: 450,
            delay: anime.stagger(60),
            easing: 'easeOutCubic',
          });
        }
      } else {
        if (item.el.style.display !== 'none' && item.el.dataset.hidden !== '1') {
          item.el.dataset.hidden = '1';
          anime({
            targets: item.el,
            opacity: [1, 0],
            translateY: [0, -10],
            duration: 250,
            easing: 'easeInCubic',
            complete: function () {
              item.el.style.display = 'none';
            },
          });
        }
      }
    });
  }

  // Filter carousels and tag buttons as user types
  searchInput.addEventListener('input', () => {
    const query = normalize(searchInput.value);

    // Filter tag buttons
    tagIndex.forEach((item) => {
      item.el.style.display = (!query || item.normalized.includes(query)) ? '' : 'none';
    });

    // Filter carousel sections with animation
    animateFilter(function (item) {
      return !query || item.normalized.includes(query);
    });
  });

  // Clicking a tag button filters to that tag only
  tagButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tagName = btn.getAttribute('data-tag');
      const isActive = btn.classList.contains('active');

      // Toggle off
      if (isActive) {
        btn.classList.remove('active');
        searchInput.value = '';
        tagIndex.forEach((item) => { item.el.style.display = ''; });
        animateFilter(function () { return true; });
        return;
      }

      // Deactivate all, activate this one
      tagButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      searchInput.value = tagName;

      const norm = normalize(tagName);
      tagIndex.forEach((item) => { item.el.style.display = ''; });
      animateFilter(function (item) {
        return item.normalized === norm;
      });
    });
  });

  /* ===== "Ver todos" expanded view ===== */
  const expandedSection = document.getElementById('blog-tag-expanded');
  const expandedTitle = document.getElementById('blog-tag-expanded-title');
  const expandedGrid = document.getElementById('blog-tag-expanded-grid');
  const expandedClose = document.getElementById('blog-tag-expanded-close');

  if (!expandedSection || !expandedTitle || !expandedGrid || !expandedClose) return;

  document.querySelectorAll('.blog-carousel-view-all').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tagName = btn.getAttribute('data-tag-filter');
      if (!tagName) return;

      // Find the section's cards
      const section = document.querySelector('[data-tag-section="' + tagName + '"]');
      if (!section) return;

      const cards = section.querySelectorAll('.blog-carousel-card');
      expandedTitle.textContent = tagName;
      expandedGrid.innerHTML = '';

      cards.forEach((card) => {
        const clone = card.cloneNode(true);
        expandedGrid.appendChild(clone);
      });

      carouselsContainer.style.display = 'none';
      expandedSection.style.display = 'block';
      expandedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  expandedClose.addEventListener('click', () => {
    expandedSection.style.display = 'none';
    carouselsContainer.style.display = '';
  });
});
<\/script>`], ["", ` <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"><\/script> <script>
document.addEventListener('DOMContentLoaded', () => {
  /* ===== Animations ===== */
  var isRestoring = sessionStorage.getItem('isRestoring') === 'true';
  var animDelay = isRestoring ? 150 : 0;

  function observeAnimate(selector, animationProps, options) {
    var el = document.querySelector(selector);
    if (!el) return;
    setTimeout(function () {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (typeof animationProps === 'function') {
              animationProps();
            } else {
              anime(animationProps);
            }
            observer.disconnect();
          }
        });
      }, { threshold: options && options.threshold || 0.15 });
      observer.observe(el);
    }, animDelay);
  }

  // Hero \u2014 fade in image from left, content from right
  observeAnimate('.blog-hero', function () {
    anime.timeline({ easing: 'easeOutCubic' })
      .add({
        targets: '.blog-hero-image',
        opacity: [0, 1],
        translateX: [-40, 0],
        duration: 700,
      })
      .add({
        targets: '.blog-hero-content',
        opacity: [0, 1],
        translateX: [40, 0],
        duration: 700,
      }, '-=500');
    anime({ targets: '.blog-hero', opacity: [0, 1], duration: 1, easing: 'linear' });
  });

  // Latest entries section \u2014 fade up title then stagger cards
  observeAnimate('.blog-section', function () {
    anime({ targets: '.blog-section', opacity: [0, 1], duration: 1, easing: 'linear' });
    anime.timeline({ easing: 'easeOutCubic' })
      .add({
        targets: '.blog-section-title',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
      })
      .add({
        targets: '.blog-latest-main',
        opacity: [0, 1],
        translateY: [40, 0],
        scale: [0.97, 1],
        duration: 600,
      }, '-=200')
      .add({
        targets: '.blog-latest-side-card',
        opacity: [0, 1],
        translateX: [30, 0],
        duration: 500,
        delay: anime.stagger(120),
      }, '-=300');
  });

  // Search section \u2014 fade up
  observeAnimate('.blog-search-section', function () {
    anime({ targets: '.blog-search-section', opacity: [0, 1], duration: 1, easing: 'linear' });
    anime.timeline({ easing: 'easeOutCubic' })
      .add({
        targets: '.blog-search-bar',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
      })
      .add({
        targets: '.blog-search-tag-btn',
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 400,
        delay: anime.stagger(50),
      }, '-=200');
  });

  // Carousel sections \u2014 each observed independently
  document.querySelectorAll('.blog-carousel-section').forEach(function (section) {
    setTimeout(function () {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            anime({ targets: entry.target, opacity: [0, 1], duration: 1, easing: 'linear' });
            anime.timeline({ easing: 'easeOutCubic' })
              .add({
                targets: entry.target.querySelector('.blog-carousel-header'),
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 500,
              })
              .add({
                targets: entry.target.querySelectorAll('.blog-carousel-card'),
                opacity: [0, 1],
                translateY: [30, 0],
                scale: [0.95, 1],
                duration: 600,
                delay: anime.stagger(100),
              }, '-=250');
            observer.disconnect();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(section);
    }, animDelay);
  });

  /* ===== Carousel scrolling ===== */
  document.querySelectorAll('.blog-carousel-wrapper').forEach((wrapper) => {
    const track = wrapper.querySelector('.blog-carousel-track');
    const leftBtn = wrapper.querySelector('.blog-carousel-arrow-left');
    const rightBtn = wrapper.querySelector('.blog-carousel-arrow-right');
    if (!track || !leftBtn || !rightBtn) return;

    const scrollAmount = () => {
      const card = track.querySelector('.blog-carousel-card');
      return card ? card.offsetWidth + 16 : 300;
    };

    leftBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
  });

  /* ===== Search / filter by tag ===== */
  const searchInput = document.getElementById('blog-tag-search');
  const searchTagsContainer = document.getElementById('blog-search-tags');
  const carouselsContainer = document.getElementById('blog-carousels');
  const sections = document.querySelectorAll('.blog-carousel-section');
  const tagButtons = document.querySelectorAll('.blog-search-tag-btn');

  if (!searchInput || !searchTagsContainer || !carouselsContainer) return;

  // Normalize text for accent-insensitive search
  function normalize(str) {
    return str.normalize('NFD').replace(/[\\\\u0300-\\\\u036f]/g, '').toLowerCase().trim();
  }

  // Pre-build normalized tag index for O(n) lookup
  const tagIndex = [];
  tagButtons.forEach((btn) => {
    tagIndex.push({
      el: btn,
      name: btn.getAttribute('data-tag'),
      normalized: normalize(btn.getAttribute('data-tag') || ''),
    });
  });

  const sectionIndex = [];
  sections.forEach((sec) => {
    sectionIndex.push({
      el: sec,
      name: sec.getAttribute('data-tag-section'),
      normalized: normalize(sec.getAttribute('data-tag-section') || ''),
    });
  });

  // Animate sections appearing/disappearing on filter
  function animateFilter(matchFn) {
    sectionIndex.forEach(function (item) {
      var matches = matchFn(item);
      if (matches) {
        if (item.el.style.display === 'none' || item.el.dataset.hidden === '1') {
          item.el.style.display = '';
          item.el.dataset.hidden = '0';
          anime({
            targets: item.el,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 400,
            easing: 'easeOutCubic',
          });
          anime({
            targets: item.el.querySelectorAll('.blog-carousel-card'),
            opacity: [0, 1],
            translateY: [15, 0],
            scale: [0.97, 1],
            duration: 450,
            delay: anime.stagger(60),
            easing: 'easeOutCubic',
          });
        }
      } else {
        if (item.el.style.display !== 'none' && item.el.dataset.hidden !== '1') {
          item.el.dataset.hidden = '1';
          anime({
            targets: item.el,
            opacity: [1, 0],
            translateY: [0, -10],
            duration: 250,
            easing: 'easeInCubic',
            complete: function () {
              item.el.style.display = 'none';
            },
          });
        }
      }
    });
  }

  // Filter carousels and tag buttons as user types
  searchInput.addEventListener('input', () => {
    const query = normalize(searchInput.value);

    // Filter tag buttons
    tagIndex.forEach((item) => {
      item.el.style.display = (!query || item.normalized.includes(query)) ? '' : 'none';
    });

    // Filter carousel sections with animation
    animateFilter(function (item) {
      return !query || item.normalized.includes(query);
    });
  });

  // Clicking a tag button filters to that tag only
  tagButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tagName = btn.getAttribute('data-tag');
      const isActive = btn.classList.contains('active');

      // Toggle off
      if (isActive) {
        btn.classList.remove('active');
        searchInput.value = '';
        tagIndex.forEach((item) => { item.el.style.display = ''; });
        animateFilter(function () { return true; });
        return;
      }

      // Deactivate all, activate this one
      tagButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      searchInput.value = tagName;

      const norm = normalize(tagName);
      tagIndex.forEach((item) => { item.el.style.display = ''; });
      animateFilter(function (item) {
        return item.normalized === norm;
      });
    });
  });

  /* ===== "Ver todos" expanded view ===== */
  const expandedSection = document.getElementById('blog-tag-expanded');
  const expandedTitle = document.getElementById('blog-tag-expanded-title');
  const expandedGrid = document.getElementById('blog-tag-expanded-grid');
  const expandedClose = document.getElementById('blog-tag-expanded-close');

  if (!expandedSection || !expandedTitle || !expandedGrid || !expandedClose) return;

  document.querySelectorAll('.blog-carousel-view-all').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tagName = btn.getAttribute('data-tag-filter');
      if (!tagName) return;

      // Find the section's cards
      const section = document.querySelector('[data-tag-section="' + tagName + '"]');
      if (!section) return;

      const cards = section.querySelectorAll('.blog-carousel-card');
      expandedTitle.textContent = tagName;
      expandedGrid.innerHTML = '';

      cards.forEach((card) => {
        const clone = card.cloneNode(true);
        expandedGrid.appendChild(clone);
      });

      carouselsContainer.style.display = 'none';
      expandedSection.style.display = 'block';
      expandedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  expandedClose.addEventListener('click', () => {
    expandedSection.style.display = 'none';
    carouselsContainer.style.display = '';
  });
});
<\/script>`])), renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${renderComponent($$result2, "SubscribeBanner", $$SubscribeBanner, {})} ${maybeRenderHead()}<section class="blog-container"> ${posts.length === 0 ? renderTemplate`<p class="blog-empty">No hay artículos publicados aún.</p>` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${featured && renderTemplate`<a${addAttribute(`/blog/${featured.slug}`, "href")} class="blog-hero"> <div class="blog-hero-image"> ${featured.cover_image && renderTemplate`<img${addAttribute(featured.cover_image.url, "src")}${addAttribute(featured.cover_image.alt || featured.title, "alt")} loading="eager">`} </div> <div class="blog-hero-content"> ${featured.tags && featured.tags.length > 0 && renderTemplate`<div class="blog-tags"> ${featured.tags.map((tag) => renderTemplate`<span class="blog-tag">${tag.name}</span>`)} </div>`} <time class="blog-hero-date"${addAttribute(featured.published_date, "datetime")}> ${new Date(featured.published_date).toLocaleDateString("es-CR", { year: "numeric", month: "long", day: "numeric" })} </time> <h1 class="blog-hero-title">${featured.title}</h1> ${featured.excerpt && renderTemplate`<p class="blog-hero-excerpt">${featured.excerpt}</p>`} <span class="blog-read-more">Leer más &rsaquo;</span> </div> </a>`}${latest.length > 0 && renderTemplate`<div class="blog-section"> <div class="blog-section-header"> <h2 class="blog-section-title">Últimas entradas</h2> </div> <div class="blog-latest-grid"> ${latestMain && renderTemplate`<a${addAttribute(`/blog/${latestMain.slug}`, "href")} class="blog-latest-main"> <div class="blog-latest-main-image"> ${latestMain.cover_image && renderTemplate`<img${addAttribute(latestMain.cover_image.url, "src")}${addAttribute(latestMain.cover_image.alt || latestMain.title, "alt")} loading="lazy">`} </div> <div class="blog-latest-main-content"> ${latestMain.tags && latestMain.tags.length > 0 && renderTemplate`<div class="blog-tags"> ${latestMain.tags.map((tag) => renderTemplate`<span class="blog-tag">${tag.name}</span>`)} </div>`} <h3 class="blog-latest-main-title">${latestMain.title}</h3> ${latestMain.excerpt && renderTemplate`<p class="blog-latest-main-excerpt">${latestMain.excerpt}</p>`} </div> </a>`} ${latestSide.length > 0 && renderTemplate`<div class="blog-latest-side"> ${latestSide.map((post) => renderTemplate`<a${addAttribute(`/blog/${post.slug}`, "href")} class="blog-latest-side-card"> <div class="blog-latest-side-image"> ${post.cover_image && renderTemplate`<img${addAttribute(post.cover_image.url, "src")}${addAttribute(post.cover_image.alt || post.title, "alt")} loading="lazy">`} </div> <div class="blog-latest-side-content"> <h4 class="blog-latest-side-title">${post.title}</h4> </div> </a>`)} </div>`} </div> </div>`}<div class="blog-search-section"> <div class="blog-search-bar"> <i class="ph ph-magnifying-glass blog-search-icon" aria-hidden="true"></i> <input type="text" id="blog-tag-search" class="blog-search-input" placeholder="Buscar por etiqueta..." autocomplete="off"> </div> <div class="blog-search-tags" id="blog-search-tags"> ${allTags.map((tag) => renderTemplate`<button class="blog-search-tag-btn"${addAttribute(tag.name, "data-tag")}>${tag.name}</button>`)} </div> </div> <div id="blog-carousels"> ${tagGroups.map((group) => renderTemplate`<div class="blog-carousel-section"${addAttribute(group.tag.name, "data-tag-section")}> <div class="blog-carousel-header"> <h2 class="blog-carousel-tag-title">${group.tag.name}</h2> <button class="blog-carousel-view-all"${addAttribute(group.tag.name, "data-tag-filter")}>
Ver todos &rsaquo;
</button> </div> <div class="blog-carousel-wrapper"> <button class="blog-carousel-arrow blog-carousel-arrow-left" aria-label="Anterior"> <i class="ph ph-caret-left" aria-hidden="true"></i> </button> <div class="blog-carousel-track"> ${group.posts.map((post) => renderTemplate`<a${addAttribute(`/blog/${post.slug}`, "href")} class="blog-carousel-card"> <div class="blog-carousel-card-image"> ${post.cover_image ? renderTemplate`<img${addAttribute(post.cover_image.url, "src")}${addAttribute(post.cover_image.alt || post.title, "alt")} loading="lazy">` : renderTemplate`<div class="blog-carousel-card-placeholder"></div>`} </div> <div class="blog-carousel-card-body"> <h3 class="blog-carousel-card-title">${post.title}</h3> <span class="blog-carousel-card-read">Leer más &rsaquo;</span> </div> </a>`)} </div> <button class="blog-carousel-arrow blog-carousel-arrow-right" aria-label="Siguiente"> <i class="ph ph-caret-right" aria-hidden="true"></i> </button> </div> </div>`)} </div> <div id="blog-tag-expanded" class="blog-tag-expanded" style="display:none;"> <div class="blog-tag-expanded-header"> <h2 class="blog-tag-expanded-title" id="blog-tag-expanded-title"></h2> <button class="blog-tag-expanded-close" id="blog-tag-expanded-close"> <i class="ph ph-x" aria-hidden="true"></i> Volver
</button> </div> <div class="blog-tag-expanded-grid" id="blog-tag-expanded-grid"></div> </div> ` })}`} </section> ${renderComponent($$result2, "Footer", $$Footer, {})} ${renderComponent($$result2, "SubscribePopup", $$SubscribePopup, {})} ` }));
}, "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/pages/blog/index.astro", void 0);

const $$file = "C:/Users/Josue/Documents/GitHub/mama2/fl-webpage/apps/web/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
