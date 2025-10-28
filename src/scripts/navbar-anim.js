import anime from 'animejs/lib/anime.es.js';

// Detecta cuando el navbar entra en el viewport
const navbar = document.querySelector('.menu-escalonado');
const navItems = document.querySelectorAll('.menu-escalonado li');

if (navbar && navItems.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anime({
          targets: navItems,
          translateY: [50, 0],
          opacity: [0, 1],
          delay: anime.stagger(120),
          duration: 900,
          easing: 'easeOutExpo',
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(navbar);
}
