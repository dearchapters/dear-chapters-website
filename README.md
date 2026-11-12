# Dear Chapters website

A responsive, editorial-style, single-page website for the Dear Chapters 2027 digital planner collection.

## Files

- `index.html` — page content and sections
- `style.css` — brand styling, layout and responsive design
- `script.js` — mobile navigation and small interactions
- `assets/products/` — product cover and preview images
- `assets/fonts/` — optional licensed font files

## Add your real planner images

The site is intentionally prepared for your actual planner artwork. Replace the colour placeholders by uploading images with these exact filenames into `assets/products/`:

| Filename | What to upload |
|---|---|
| `og-cover.jpg` | OG Edition cover |
| `minimalist-cover.jpg` | Minimalist Edition cover |
| `coquette-cover.jpg` | Coquette Edition cover |
| `luxury-cover.jpg` | Luxury Edition cover |
| `og-preview.jpg` | OG inside-page preview |
| `minimalist-preview.jpg` | Minimalist inside-page preview |
| `coquette-preview.jpg` | Coquette inside-page preview |
| `luxury-preview.jpg` | Luxury inside-page preview |

Use JPG or PNG. Keep the filenames exactly as shown, including lowercase letters and hyphens. A portrait cover image works best for the four collection cards. Inside-page previews can be landscape or portrait.

## Add Payhip checkout links before launch

Open `script.js` and find the purchase-link section only if you want to customise the temporary message. The simplest way to add the real checkout links is to edit `index.html` and replace the `href="#"` on each `.purchase-link` with its corresponding Payhip product URL, then remove `aria-disabled="true"`.

For example:
- OG button → OG Payhip product URL
- Minimalist button → Minimalist Payhip product URL
- Coquette button → Coquette Payhip product URL
- Luxury button → Luxury Payhip product URL

Do not publish with placeholder `#` links if you are accepting orders.

## Contact email

The footer currently uses `hello@dearchapters.com` as a placeholder. Replace it with an email address you actively monitor before launch.

## Fonts

The site loads Cormorant Garamond and DM Sans from Google Fonts. The CSS uses `The Seasons` and `Lancelot` as preferred fallback names where installed. If you have licensed webfont files for those typefaces, add them to `assets/fonts/` and define them with `@font-face` in `style.css`. Do not upload font files unless your licence permits web embedding.

## Preview and hosting

The site can be previewed with GitHub Pages or hosted on Netlify. For Netlify, publish the repository root (the folder containing `index.html`) as the site directory.

## Before launch checklist

- [ ] Upload all eight real product images
- [ ] Add four individual Payhip checkout URLs
- [ ] Replace the placeholder contact email
- [ ] Test every navigation link and checkout button
- [ ] Test the layout on a phone and desktop
- [ ] Confirm pricing, product contents and personal-use terms
- [ ] Test Payhip payment and digital delivery in your seller account
