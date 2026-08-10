/* Shared screenshot lightbox.
   Any element marked [data-shot] opens the <img> it contains full-bleed in
   #lightbox. Used by the proof-of-work dashboards; the home page ships the
   same overlay so future galleries only need the attribute. */
(function () {
  'use strict';

  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  var lastFocused = null;

  var open = function (img) {
    lightbox.style.backgroundImage = 'url("' + (img.currentSrc || img.src) + '")';
    lightbox.setAttribute('aria-label', img.alt || 'Screenshot');
    lightbox.hidden = false;
    document.body.classList.add('ds-scroll-lock');
    lastFocused = document.activeElement;
    lightbox.focus();
  };

  var close = function () {
    if (lightbox.hidden) return;
    lightbox.hidden = true;
    lightbox.style.backgroundImage = '';
    document.body.classList.remove('ds-scroll-lock');
    if (lastFocused && lastFocused.focus) lastFocused.focus();
    lastFocused = null;
  };

  var openFrom = function (host) {
    var img = host.querySelector('img');
    // A screenshot that never loaded has nothing to enlarge.
    if (!img || !img.complete || !img.naturalWidth) return false;
    open(img);
    return true;
  };

  document.addEventListener('click', function (e) {
    if (!(e.target instanceof Element)) return;
    if (lightbox.contains(e.target)) { close(); return; }
    var host = e.target.closest('[data-shot]');
    if (host && openFrom(host)) e.preventDefault();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Enter' && e.key !== ' ') return;
    if (!(e.target instanceof Element)) return;
    var host = e.target.closest('[data-shot]');
    if (host && openFrom(host)) e.preventDefault();
  });
}());
