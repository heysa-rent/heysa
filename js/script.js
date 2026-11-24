/* هَيصة ميديا — vanilla JS, no libraries */
(function () {
  'use strict';

  // Mark that JS is on so CSS can safely hide reveal sections
  document.documentElement.classList.add('js');

  // Smooth scrolling for in-page anchors (#services, #work, ...)
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute('href').slice(1);
    var target = id && document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', '#' + id);
  });

  // WhatsApp links: prefill a greeting, always open in a new tab
  var greeting = 'أهلاً هَيصة ميديا، عايز أستفسر عن إدارة الصفحات';
  document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
    try {
      var url = new URL(a.href);
      if (!url.searchParams.get('text')) {
        url.searchParams.set('text', greeting);
        a.href = url.toString();
      }
    } catch (err) { /* keep original href */ }
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  });

  // Subtle reveal on scroll
  var items = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  items.forEach(function (el) { io.observe(el); });
})();
