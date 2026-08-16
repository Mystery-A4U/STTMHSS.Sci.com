# LUMEN — Science & Innovation Exhibition
### St. Theresa Matriculation Higher Secondary School, Sendurai, Ariyalur

A single-page, desktop-focused exhibition site with a 3D animated intro:
two wings unfold and flap, feathers fall and trace a path across the
screen, and the view irises open into your school photo before the
rest of the site is revealed.

---

## Everything you need to edit lives in `js/config.js`

Open **`js/config.js`** and change:

- **School name, place, exhibition name, date, time, venue** → the `SITE` object.
- **Your school photo** → set `SITE.schoolImage` to the file path (see below).
- **Inventors & inventions** → the `CATEGORIES` array. Add, remove or edit
  entries freely; each one needs an inventor name, invention name, year,
  a short detail line, and optional image paths.

You do **not** need to touch `style.css`, `index.html`, `intro.js` or
`main.js` for normal edits.

---

## Adding your images

### 1. School photo (used in the intro zoom AND the banner)
Put your photo at:
```
assets/school/school.jpg
```
Then in `js/config.js` set:
```js
schoolImage: "assets/school/school.jpg",
```
Use a wide, high-resolution landscape photo. The site automatically
crops it (`object-fit: cover`) so it fills the entire screen perfectly
on any monitor size — just make sure the important part of the building
is roughly centred in the shot. If the file is missing, the site shows
a graceful gold-on-navy placeholder instead of breaking.

### 2. Inventor & invention photos
Drop files into:
```
assets/inventors/     e.g. alexander-graham-bell.jpg
assets/inventions/    e.g. telephone.jpg
```
Then point to them from the matching entry in `js/config.js`
(`inventorImage` / `inventionImage`). Any entry without a valid image
automatically falls back to a neat initials avatar / icon — nothing
ever breaks or shows a broken-image icon.

---

## Adding more inventions

Copy this block inside any category's `items` array in `js/config.js`
(or create a whole new category by copying an existing `{ id, label,
icon, items }` block):

```js
{
  inventor: "Ada Lovelace",
  invention: "The First Computer Algorithm",
  year: "1843",
  inventorImage: "assets/inventors/ada-lovelace.jpg",
  inventionImage: "assets/inventions/analytical-engine.jpg",
  detail: "Wrote the first published algorithm intended for a machine, laying the groundwork for computer programming."
}
```

---

## Running it locally
This is a plain HTML/CSS/JS site — no build step. Just open
`index.html` in a browser, or serve the folder:
```bash
python3 -m http.server 8000
```
then visit `http://localhost:8000`.

## Publishing on GitHub Pages
1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Set the source branch to `main` (or `master`) and folder to `/root`.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

---

## Notes
- The intro is built for **desktop screens**; the layout has a fixed
  minimum width by design, as requested.
- The intro respects a visitor's "reduce motion" OS setting and skips
  straight to the content if that's turned on.
- There's a **Skip Intro** button in the bottom-right corner, and the
  intro also skips ahead if a visitor scrolls or clicks once the school
  photo is showing.

Designed & built by **@Mystery_1431**.
