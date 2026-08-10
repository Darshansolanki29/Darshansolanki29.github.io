/* Darshan Solanki — portfolio interactions.
   Ported from the design source's component logic: loader, scroll progress,
   reveal-on-scroll, expertise scroll-spy, the portrait flight, the testimonial
   deck, the mobile menu and the screenshot lightbox. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

  /* ---------------------------------------------------------------- loader */
  var loader = $('#ds-loader');
  if (loader) {
    var seen = false;
    try { seen = sessionStorage.getItem('ds-loader-seen') === '1'; } catch (e) {}
    setTimeout(function () {
      loader.parentNode.removeChild(loader);
      try { sessionStorage.setItem('ds-loader-seen', '1'); } catch (e) {}
    }, (seen || reduced) ? 0 : 1000);
  }

  /* -------------------------------------------------- scroll progress bar */
  var bar = $('#progress-bar');
  if (bar) {
    var onScroll = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      bar.style.width = (max > 0 ? (doc.scrollTop / max) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }

  /* --------------------------------------------- reveal + marquee + spy */
  if ('IntersectionObserver' in window) {
    // Pause the focus marquee while it is off-screen.
    var marqueeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var inner = entry.target.firstElementChild;
        if (inner) inner.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
      });
    });
    $$('[data-ds-marquee]').forEach(function (el) { marqueeObs.observe(el); });

    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        if (!reduced && entry.target.animate) {
          entry.target.animate(
            [{ opacity: 0, transform: 'translateY(28px)' }, { opacity: 1, transform: 'none' }],
            { duration: 700, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'backwards' }
          );
        }
        revealObs.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    $$('[data-reveal]').forEach(function (el) { revealObs.observe(el); });

    // Expertise rail: the sticky counter tracks whichever category is centred.
    var CATEGORIES = ['Performance Marketing', 'E-commerce', 'Marketing', 'Tools'];
    var catNum = $('#cat-num'), catName = $('#cat-name'), catBar = $('#cat-progress');
    if (catNum && catName && catBar) {
      var catObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var i = Number(entry.target.getAttribute('data-cat'));
          catNum.textContent = '0' + (i + 1);
          catName.textContent = CATEGORIES[i];
          catBar.style.width = ((i + 1) / CATEGORIES.length * 100) + '%';
        });
      }, { rootMargin: '-40% 0px -50% 0px' });
      $$('[data-cat]').forEach(function (el) { catObs.observe(el); });
    }
  }

  /* ------------------------------------------------------- looping video */
  // Autoplay is declared in the HTML so the clip still runs without scripting.
  // Under reduced motion we stop it and let the poster stand in.
  if (reduced) {
    $$('video[autoplay]').forEach(function (v) {
      v.removeAttribute('autoplay');
      v.removeAttribute('loop');
      v.pause();
    });
  }

  /* ----------------------------------------------------- portrait flight */
  // Hero slot -> grows and flips at the centre of the viewport -> flips back
  // and docks into the About slot, swapping to the red portrait mid-flip.
  var fly = $('#fly'), flyCard = $('#fly-card'), flyImg = $('#fly-img');
  var heroSlot = $('#hero-slot'), aboutSlot = $('#about-slot');
  var canFly = !reduced && window.matchMedia('(min-width: 768px)').matches;

  if (canFly && fly && flyCard && flyImg && heroSlot && aboutSlot) {
    var PORTRAIT_FRONT = 'assets/img/portrait-bw.webp';
    var PORTRAIT_BACK = 'assets/img/portrait-red.webp';
    var clamp01 = function (v) { return Math.max(0, Math.min(1, v)); };
    var ease = function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
    var lerp = function (a, b, t) { return a + (b - a) * t; };

    // The in-slot portraits give way to the flying card only once we know the
    // flight is actually running.
    document.documentElement.classList.add('ds-fly');

    var frame = 0;
    var update = function () {
      frame = 0;
      var vh = window.innerHeight, vw = window.innerWidth;
      var hero = heroSlot.getBoundingClientRect();
      var about = aboutSlot.getBoundingClientRect();
      var scrollY = window.scrollY || document.documentElement.scrollTop;

      var pGrow = ease(clamp01(scrollY / (vh * 0.7)));                    // phase 1: grow + flip to back
      var pMove = ease(clamp01((vh * 0.6 - about.top) / (vh * 0.55)));    // phase 2: travel + flip to front

      var gw = Math.min(400, vw * 0.6), gh = gw * 4 / 3;
      var grown = { left: (vw - gw) / 2, top: (vh - gh) / 2, width: gw, height: gh };
      var base = {
        left: lerp(hero.left, grown.left, pGrow), top: lerp(hero.top, grown.top, pGrow),
        width: lerp(hero.width, grown.width, pGrow), height: lerp(hero.height, grown.height, pGrow)
      };
      var cur = {
        left: lerp(base.left, about.left, pMove), top: lerp(base.top, about.top, pMove),
        width: lerp(base.width, about.width, pMove), height: lerp(base.height, about.height, pMove)
      };

      fly.style.transform = 'translate3d(' + cur.left + 'px,' + cur.top + 'px,0)';
      fly.style.width = cur.width + 'px';
      fly.style.height = cur.height + 'px';
      flyCard.style.transform = 'rotateY(' + (pGrow + pMove) * 180 + 'deg)';

      // Swap the front face while it is hidden midway through the second flip.
      var want = pMove > 0.5 ? PORTRAIT_BACK : PORTRAIT_FRONT;
      if (flyImg.getAttribute('src') !== want) flyImg.setAttribute('src', want);

      fly.style.visibility = 'visible';
    };

    // Only recompute while the page is actually moving. A free-running rAF loop
    // would force layout twice a frame forever, long past both slots.
    var schedule = function () { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    // Late-arriving webfonts and images reflow the hero, moving the slot the
    // card is anchored to, so re-measure once everything has settled.
    window.addEventListener('load', schedule);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
    update();
  } else if (fly) {
    // No flight (touch, narrow, or reduced motion): the slots keep the static
    // portraits that ship in the HTML, so only the flying card goes.
    fly.parentNode.removeChild(fly);
  }

  /* ------------------------------------------------------ testimonial deck */
  var TESTIMONIALS = [
    {
      tag: 'NTC FRAGRANCES — META ADS',
      quote: '“Darshan’s Meta Ads strategy generated quality customer inquiries, increased local brand awareness, and delivered excellent ROI while staying within our marketing budget.”',
      who: 'MEHUL BHOOT · CO-FOUNDER'
    },
    {
      tag: 'STYLE UNION — INSTAGRAM GROWTH & SALES',
      quote: '“Darshan helped grow our Instagram presence, increased website traffic, attracted genuine customers, and delivered consistent sales through well-optimized Meta advertising campaigns.”',
      who: 'S. PATEL · FOUNDER'
    },
    {
      tag: 'R&D SAFETY SOLUTIONS — GOOGLE ADS',
      quote: '“Thanks to Darshan’s Google Ads expertise, we received relevant inquiries and improved our online presence. Professional, responsive, and committed to achieving results.”',
      who: 'JITUBHAI · CO-FOUNDER'
    },
    {
      tag: 'PELICAN HEIGHTS — REAL ESTATE',
      quote: '“Darshan consistently generated high-quality property leads through Meta Ads, reduced acquisition costs, improved buyer targeting, and strengthened our overall sales pipeline.”',
      who: 'HITENDRA BHAI · SALES MANAGING HEAD'
    },
    {
      tag: 'EKLINGJI GOLD PALACE — E-COMMERCE',
      quote: '“Darshan optimized our product listings using SEO-driven keywords, enhanced catalogue quality, improved search visibility, increased customer reach, and marketplace performance successfully.”',
      who: 'PRAKASH · OWNER'
    }
  ];

  var CARD_THEMES = [
    { bg: '#E8F9FD', fg: '#111111', meta: '#444444', accent: '#FF1E00' },
    { bg: '#111111', fg: '#FAF9F6', meta: 'rgba(250,249,246,.6)', accent: '#FF6A52' },
    { bg: '#FCEFE9', fg: '#111111', meta: '#444444', accent: '#FF1E00' },
    { bg: '#EAF6EF', fg: '#111111', meta: '#3E6B54', accent: '#FF1E00' },
    { bg: '#F1EFE9', fg: '#111111', meta: '#444444', accent: '#FF1E00' }
  ];

  var deck = $('#t-deck'), dotsBox = $('#t-dots'), indexLabel = $('#t-index');

  if (deck && dotsBox) {
    var MONO = "font-family:'Geist Mono',monospace;font-size:11px;letter-spacing:.12em";
    var count = TESTIMONIALS.length;
    var index = 0, drag = 0, dragging = false, startX = 0, startY = 0, coarse = false;
    var cards = [], dots = [];

    TESTIMONIALS.forEach(function (item, i) {
      var theme = CARD_THEMES[i % CARD_THEMES.length];

      var figure = document.createElement('figure');
      figure.style.cssText =
        'position:absolute;top:19%;bottom:19%;left:0;right:0;margin:0;display:flex;' +
        'flex-direction:column;justify-content:center;gap:24px;border:1px solid rgba(17,17,17,.12);' +
        'border-radius:10px;padding:clamp(28px,3.5vw,48px);box-shadow:0 -14px 40px -28px rgba(17,17,17,.45);' +
        'will-change:transform;pointer-events:none;background:' + theme.bg + ';color:' + theme.fg;

      var head = document.createElement('div');
      head.style.cssText = 'display:flex;justify-content:space-between;gap:12px 24px;flex-wrap:wrap';

      var label = document.createElement('span');
      label.style.cssText = MONO + ';color:' + theme.accent;
      label.textContent = 'CLIENT TESTIMONIAL';

      var tag = document.createElement('span');
      tag.style.cssText = MONO + ';color:' + theme.meta;
      tag.textContent = item.tag;

      head.appendChild(label);
      head.appendChild(tag);

      var quote = document.createElement('blockquote');
      quote.style.cssText =
        "margin:0;font-family:'Bricolage Grotesque',sans-serif;font-weight:400;" +
        'font-size:clamp(19px,2.4vw,30px);line-height:1.45;letter-spacing:-0.01em;text-wrap:pretty';
      quote.textContent = item.quote;

      var caption = document.createElement('figcaption');
      caption.style.cssText = "font-family:'Geist Mono',monospace;font-size:11px;letter-spacing:.1em;color:" + theme.meta;
      caption.textContent = item.who;

      figure.appendChild(head);
      figure.appendChild(quote);
      figure.appendChild(caption);
      deck.appendChild(figure);
      cards.push(figure);

      var dot = document.createElement('div');
      dot.style.cssText = 'width:5px;border-radius:3px;transition:height .4s cubic-bezier(.22,.61,.36,1),background .4s';
      dotsBox.appendChild(dot);
      dots.push(dot);
    });

    var render = function () {
      var shift = drag * 0.55;
      cards.forEach(function (card, i) {
        // Shortest signed circular distance from the active card.
        var d = (i - index) % count;
        if (d > count / 2) d -= count;
        if (d < -count / 2) d += count;
        var away = Math.abs(d);
        // Stacked deck: neighbours peek above and below the active card.
        var offset = d === 0 ? 0 : Math.sign(d) * (98 + (away - 1) * 13);

        card.style.transform = 'translateY(calc(' + offset + '% + ' + shift + 'px)) scale(' + (1 - away * 0.045) + ')';
        card.style.transition = dragging ? 'none' : 'transform .65s cubic-bezier(.22,.61,.36,1)';
        card.style.zIndex = String(10 - away);
        card.setAttribute('aria-hidden', d === 0 ? 'false' : 'true');
      });

      dots.forEach(function (dot, i) {
        dot.style.height = i === index ? '22px' : '5px';
        dot.style.background = i === index ? '#FF1E00' : 'rgba(17,17,17,.25)';
      });

      if (indexLabel) indexLabel.textContent = '0' + (index + 1);
      deck.style.cursor = dragging ? 'grabbing' : 'grab';
    };

    var go = function (step) {
      index = (index + step + count) % count;
      render();
    };

    // Coarse pointers keep vertical page scroll and cycle on a horizontal swipe.
    if (window.matchMedia('(pointer: coarse)').matches) deck.style.touchAction = 'pan-y';

    deck.addEventListener('pointerdown', function (e) {
      startX = e.clientX;
      startY = e.clientY;
      coarse = e.pointerType === 'touch';
      if (deck.setPointerCapture) { try { deck.setPointerCapture(e.pointerId); } catch (err) {} }
      dragging = true;
      drag = 0;
      render();
    });

    deck.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      drag = coarse ? (e.clientX - startX) * 0.7 : e.clientY - startY;
      render();
    });

    var endDrag = function () {
      if (!dragging) return;
      var moved = drag;
      dragging = false;
      drag = 0;
      if (Math.abs(moved) > 50) index = (index + (moved < 0 ? 1 : -1) + count) % count;
      render();
    };
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (type) {
      deck.addEventListener(type, endDrag);
    });

    render();
  }

  /* ----------------------------------------------------------- mobile menu */
  var burger = $('#burger'), menu = $('#mobile-menu');
  var setMenu = function (open) {
    if (!burger || !menu) return;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
    document.body.classList.toggle('ds-scroll-lock', open);
  };

  /* ------------------------------------------------------- event delegation */
  // The screenshot lightbox lives in lightbox.js, shared with the other pages.
  var ACTIONS = {
    menuToggle: function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); },
    menuClose: function () { setMenu(false); },
    tPrev: function () { deck && go(-1); },
    tNext: function () { deck && go(1); }
  };

  document.addEventListener('click', function (e) {
    if (!(e.target instanceof Element)) return;
    var actor = e.target.closest('[data-act]');
    if (!actor) return;
    var action = ACTIONS[actor.getAttribute('data-act')];
    if (action) action();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (menu && !menu.hidden) { setMenu(false); burger.focus(); }
  });

  // The mobile menu is desktop-hidden by CSS; keep state honest on resize.
  var wide = window.matchMedia('(min-width: 768px)');
  var onWide = function (e) { if (e.matches) setMenu(false); };
  if (wide.addEventListener) wide.addEventListener('change', onWide);
  else if (wide.addListener) wide.addListener(onWide);
}());
