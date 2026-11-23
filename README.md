# Dear Chapters website

A responsive, editorial-style website for the Dear Chapters 2027 digital planner collection. Plain HTML, CSS and JS. No build step. Hosted on GitHub Pages.

## Files

- `index.html`: home page
- `og.html` (Signature), `minimalist.html`, `coquette.html`, `luxury.html`: edition pages
- `style.css`: all styling. Edition pages share one layout and only set their own colours in a small `<style>` block at the top of each page
- `script.js`: mobile menu, FAQ, carousel (arrows, drag, keyboard), scroll reveal, mobile buy bar, missing-image fallback
- `favicon.svg`, `404.html`, `robots.txt`, `sitemap.xml`
- `assets/products/`: all product images

## How to update the site (GitHub Pages)

1. Open the repository on GitHub.
2. Click **Add file > Upload files**, drag the changed files in (keep the same names and folders), write a short message and click **Commit changes**.
3. The site updates in about a minute at `https://dearchapters.github.io/dear-chapters-website/`.

## Images the site needs (`assets/products/`)

Use JPG or PNG. Keep the names exactly as shown, in lowercase.

**Collection covers (portrait, about 900 x 1200 px)**
`og-cover.jpg`, `minimalist-cover.jpg`, `coquette-cover.jpg`, `luxury-cover.jpg`

**Home page**
`hero-image.jpg` (iPad view, 4:3, about 1600 x 1200 px)
Carousel (16:10, about 1280 x 800 px): `wellness-preview.jpg`, `self-preview.jpg`, `home-preview.jpg`, `work-preview.jpg`, `money-preview.jpg`, `journal-preview.jpg`, `notes-preview.jpg`

**Signature page** (about 1200 px wide): `start-preview.jpg`, `year-preview.jpg`, `cycle-preview.jpg`, `budget-preview.jpg`
**Minimalist page**: `start-min.jpg`, `prayer-min.jpg`, `meals-min.jpg`, `health-min.jpg`
**Coquette page**: `start-coq.jpg`, `month-coq.jpg`, `quarter-coq.jpg`, `money-coq.jpg`
**Luxury page**: `start-lux.jpg`, `sunnah-lux.jpg`, `reflection-lux.jpg`, `medication-lux.jpg`

If an image is missing, the site shows a soft placeholder instead of a broken icon. Tip: keep each image under about 300 KB (export as JPG at 80 to 85% quality) so pages load quickly on phones.

## Coming soon mode (payments paused)

Payments are paused while payment verification is pending. The site shows "Coming soon" in place of the buy buttons, and a subscribe form (`#subscribe` on the home page) collects emails for the launch and the weekly love letter. Setup for the subscriber database is in `supabase/SETUP.md` and `supabase/schema.sql`.

### Turning purchases back on

Search for `PAUSED` in `index.html` and each edition page. Each one marks a spot where a checkout link was removed. Put the original link back and delete the "Coming soon" markup next to it:

- Full Edition: `https://payhip.com/b/fzme7` (home page and all four edition pages)
- Trial Edition: `https://payhip.com/b/z352C` (home page only; the edition pages used to link to it under the main button)

On each edition page, also restore the price line, the button text ("Purchase the Full Edition") and the trial line. The simplest way is to look at the earlier version of the file in the repository's commit history. Also remove the announcement bar's "COMING SOON" wording and change the sticky mobile bar back to the price.

If you create a separate product per edition, give each edition page its own link.

## Things to update later

- Prices are written in plain text in `index.html` (pricing section and sticky buy bar) and in each edition page (purchase section). Search for `59.90` and `69.90`.
- Add a TikTok link: search for `TODO` in `index.html`.
- If you get a custom domain, replace `https://dearchapters.github.io/dear-chapters-website/` in `index.html`, the four edition pages, `robots.txt` and `sitemap.xml`.
- `404.html` links back to `/dear-chapters-website/`. Update that if the site moves to a custom domain.

## Before launch checklist

- [ ] Upload all product images listed above
- [ ] Open every page on a phone and a laptop
- [ ] Test the mobile menu on all five pages
- [ ] Connect the subscriber database (`supabase/SETUP.md`) and test the form
- [ ] When payments are verified: restore the checkout links, click every one and complete a test purchase
- [ ] Confirm prices, product contents and personal-use terms
