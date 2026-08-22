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
- **Student experiments** → the `CATEGORIES` array. Add, remove or edit
  entries freely; each one needs an experiment title, student name(s),
  class/section, and an optional photo + description.

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

### 2. Student experiment photos
Drop files into:
```
assets/experiments/     e.g. volcanic-eruption.jpg
```
Then point to them from the matching entry's `image` field in
`js/config.js`. Any entry left with `image: ""` (or pointing to a photo
that isn't there yet) automatically shows a clean "Add Photo" dashed
placeholder instead of a broken image — nothing ever looks broken while
you're still collecting photos from students.

---

## Adding more experiments

Every experiment currently in `js/config.js` is a placeholder ready for
you to fill in — just replace the `EDIT ME` text. Copy this block inside
any category's `items` array to add a new one (or create a whole new
category by copying an existing `{ id, label, items }` block):

```js
{
  title: "Volcanic Eruption Model",
  students: "A. Priya, S. Kumar",
  grade: "Class 10 - A",
  image: "assets/experiments/volcanic-eruption.jpg",
  description: "A working model showing an exothermic reaction that mimics a volcanic eruption."
}
```

---

## "All Experiments" slideshow

A **Slideshow** section sits between "Experiments" and "Visit" and needs
no setup at all — it automatically plays through **every experiment**
already in `CATEGORIES` in `js/config.js`, one at a time, with photo,
title, students and description. Add, edit or remove an experiment in
`CATEGORIES` and the slideshow updates on its own; there's nothing extra
to maintain. Visitors can also click the arrows/dots to browse manually,
and it pauses automatically while the mouse is hovering over it.

## Celebration section

A **Celebration** section (`#celebration`) shows off award/prize/highlight
photos in the same slideshow style. To add your own:

1. Create the folder `assets/celebration/` and drop your photos in, e.g.
   `assets/celebration/award-1.jpg`.
2. Open `js/config.js` and edit the **`CELEBRATIONS`** array near the top
   — each entry is:
   ```js
   {
     image: "assets/celebration/award-1.jpg",
     caption: "Best Overall Project — awarded to 12th A",
     date: "22 August 2026"   // optional
   }
   ```
3. Add as many entries as you like, in any order — reorder the array to
   change the play order.

Just like the experiment cards, any entry with a missing or empty
`image` shows a graceful "Add Photo" placeholder instead of a broken
image. Leave the `CELEBRATIONS` array empty (`[]`) and the section shows
a friendly "nothing here yet" message instead of an empty slideshow.

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
