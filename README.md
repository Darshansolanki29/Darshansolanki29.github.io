# Darshan Solanki — portfolio

Static site implemented from the Claude Design project
*Copy of Darshan Solanki Portfolio Design*.

No build step and no dependencies — there is no `package.json` and nothing to
install. Open `index.html` directly, or serve the folder over HTTP:

```
npx serve .
```

Opening the file directly works; a local server is only worth it if you want the
URLs to match production.

## Layout

```
index.html              home            (from Home.dc.html)
proof-of-work.html      evidence page   (from Proof of Work.dc.html)

assets/css/site.css     shared: base rules from the design, hover states,
                        keyframes, phone overrides
assets/js/lightbox.js   shared: [data-shot] opens its <img> full-bleed
assets/js/app.js        home: loader, scroll progress, reveals, scroll-spy,
                        portrait flight, testimonial deck, mobile menu
assets/js/proof.js      proof: reveals, missing-screenshot placeholders
assets/img/             portraits, Radhe Hill walkthrough, certificates
_design/                imported design source, kept for re-imports
```

The design's markup and inline styles were carried over verbatim. Only the
runtime-specific constructs were translated: `<sc-if>` / `<sc-for>` became
JS-rendered regions, `ref="{{ … }}"` became ids, `onClick="{{ … }}"` became
`data-act` / `data-shot` hooks read by delegated listeners, and `style-hover`
attributes were lifted into real `:hover` rules in the stylesheet.

## Images

`proof-of-work.html` reads its eight evidence panels from `assets/img/dashboards`,
by filename, in this order — each sits beside its own caption and metrics, so the
numbering has to match:

```
1.png   Pushkar Gold                (Meta Ads Manager)
2.png   Perfect Home / Radhe Hill
3.png   Pushpam Heights
4.png   Pelican Heights
5.png   Pushpam Elegance
6.png   Shreevas Homes
7.png   Arwaa Luxury Perfume        (Amazon Seller Central)
8.png   Eklingji Gold Palace        (Flipkart Seller Hub)
```

Any panel whose file is absent renders a "SCREENSHOT PENDING" placeholder naming
the file it wants, rather than a broken frame — this page is an evidence page, so
a missing capture has to say so.

### Outstanding

`assets/img/radhe-hill.webp` — the lobby/stairwell walkthrough on the featured
"Perfect Home / Radhe Hill" card on the home page. Animated WebP; the import only
returned a truncated GIF, so that file was dropped and the markup now points at
`.webp`.

## Not yet built

`proof-of-work.html` links to `case-study-radhe-hill.html`, which has no design
source in the project yet.
