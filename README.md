# Discount Mix — landing and pricing

Standalone source for the approved dark/lime Discount Mix design, including
the compact homepage and pricing page. No build step or third-party packages
are required.

## Online preview

- [Landing page](https://noubahar.github.io/discount-mix-website-design/)
- [Pricing](https://noubahar.github.io/discount-mix-website-design/pricing/)

GitHub Pages publishes `main` from the repository root. The repository and
preview are public; the original Discount Mixer production site is separate.

## View both pages locally

1. Download this repository with **Code → Download ZIP**, then extract it, or clone it.
2. Install Node.js 18 or later if it is not already installed.
3. Open a terminal in the extracted folder and run:

```sh
npm start
```

Open **http://localhost:3000** for the landing page and
**http://localhost:3000/pricing/** for pricing. Keep the terminal open while
reviewing. You do not need to run `npm install`.

To share for review, send your colleague either online preview link above,
or this repository's downloaded ZIP. GitHub's file browser displays source code;
run the command above to see the actual website.

## Included

- Homepage with seven feature previews, six-second automatic rotation,
  manual controls, pause/play, keyboard and touch navigation.
- Three alternating product stories, customer logos, reviews and FAQ.
- Pricing with Free, Essential, Pro and Ultimate plans, monthly/yearly
  billing and annual savings.
- Shared brand assets, compact typography and responsive styling.
- Reduced-motion support and pauses during feature interaction.

## Files

- `index.html` — landing page.
- `pricing/index.html` — pricing page.
- `assets/` — shared styles, scripts, images and fonts.
- `server.mjs` — local static preview server.
- `scripts/check.mjs` — static integrity and JavaScript syntax checks.

Run `npm run check` to validate page assets and inline/external JavaScript.

This repository contains design-review pages. Product illustrations remain
temporary, and the original preview-only links use explanatory dialogs.
Blog navigation is omitted here because this repository covers landing and
pricing only. No Sanity credentials, production integrations or GitHub Actions are included.
A `.nojekyll` marker and relative asset/navigation paths support GitHub Pages
from `main` / repository root when Pages is enabled in repository settings.
Enabling Pages is a separate publication step; this source change alone does not enable it.

The supplied Aconchego Test font is for private design review. A production
webfont license is required before commercial launch; see `assets/fonts/README.txt`.
Brand and merchant assets are retained from the user-provided design materials.
This repository does not grant redistribution rights to those third-party assets.
