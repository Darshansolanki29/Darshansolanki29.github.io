/* Proof-of-work page: reveal-on-scroll, plus an honest placeholder for any
   dashboard screenshot that is not on disk yet. */
(function () {
  'use strict';

  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------- reveals */
  if (!reduced && 'IntersectionObserver' in window) {
    var els = $$('[data-reveal]');
    els.forEach(function (el) { el.style.opacity = '0'; });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.animation = 'pwRise .8s cubic-bezier(.22,.61,.36,1) both';
        entry.target.style.opacity = '';
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------- missing screenshot notice */
  // The page is an evidence page, so a screenshot that will not load must say
  // so rather than leave a broken frame the reader might mistake for the data.
  var markMissing = function (img) {
    var frame = img.parentElement;
    if (!frame || frame.hasAttribute('data-missing')) return;

    var filename = (img.getAttribute('src') || '').replace(/^.*\//, '');
    var host = img.closest('[data-shot]');
    if (host) {
      host.removeAttribute('data-shot');
      host.removeAttribute('tabindex');
      host.style.cursor = 'default';
    }

    frame.setAttribute('data-missing', '');
    frame.style.display = 'flex';
    frame.style.alignItems = 'center';
    frame.style.justifyContent = 'center';
    frame.style.padding = '24px';
    frame.style.boxSizing = 'border-box';
    frame.style.textAlign = 'center';
    img.remove();

    var note = document.createElement('div');
    note.style.cssText = "font-family:'Geist Mono',monospace;font-size:11px;letter-spacing:.12em;" +
      'line-height:1.8;color:#444444;max-width:44ch';
    var label = document.createElement('span');
    label.style.color = '#FF1E00';
    label.textContent = 'SCREENSHOT PENDING';
    note.appendChild(label);
    note.appendChild(document.createElement('br'));
    note.appendChild(document.createTextNode(filename));
    frame.appendChild(note);
  };

  $$('[data-shot] img, figure img').forEach(function (img) {
    if (img.complete) {
      if (!img.naturalWidth) markMissing(img);
    } else {
      img.addEventListener('error', function () { markMissing(img); });
    }
  });
}());
