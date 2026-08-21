/* ======================================================================
   CONFIG.JS  —  EDIT EVERYTHING YOU NEED RIGHT HERE
   ----------------------------------------------------------------------
   This is the ONLY file you need to touch to:
     1. Change the school name, location, exhibition name & date
     2. Swap in your own school photo
     3. Add / edit / remove student experiments

   Nothing in style.css or the .js animation files needs to change.
   ====================================================================== */


/* ----------------------------------------------------------------------
   1. SITE SETTINGS  —  names, dates, image paths
   ------------------------------------------------------------------- */
const SITE = {
  schoolName: "St.Theresa Matriculation Higher Secondary School",
  schoolShortName: "St.Theresa MHSS",
  place: "Sendurai, Ariyalur",

  exhibitionName: "Science & Innovation Exhibition",
  exhibitionTagline: "Where curiosity takes flight.",

  // Edit these any time — they show up in the banner, the info cards and the footer.
  eventDate: "21 August 2026",          // e.g. "14 March 2027"
  eventDay: "Saturday",                 // e.g. "Saturday"
  eventTime: "9:30 AM – 4:00 PM",
  eventVenue: "School Auditorium & Columnn Block",

  // ---- SCHOOL PHOTO --------------------------------------------------
  // Put your school photo in  assets/school/school.jpg  (any name works,
  // just update the path below). Use a wide, high-resolution photo —
  // the site crops it to fit the screen perfectly (object-fit: cover),
  // so the important part of the building should be centred in the shot.
  schoolImage: "assets/school/school.jpg",
  schoolImageAlt: "St. Theresa Matriculation Higher Secondary School, Sendurai",

  // Optional small badge/logo shown in the navbar. Leave blank ("") to
  // just show the initials "ST" instead.
  schoolLogo: "", // e.g. "assets/school/logo.png"

  // ---- CREDITS --------------------------------------------------------
  creditHandle: "@Mystery_1431",
};


/* ----------------------------------------------------------------------
   2. STUDENT EXPERIMENTS
   ------------------------------------------------------------------- */
/*
   HOW TO ADD YOUR OWN
   --------------------
   - Add a new object inside the correct category's `items` array (or
     make a whole new category by copying a category block).
   - `title`       → name of the experiment / project (shows on the card)
   - `students`    → student name(s) who made it
   - `grade`       → class / section, e.g. "Class 10 - A"
   - `image`       → path to a photo of the experiment/model
   - `description` → a line or two about what it demonstrates (optional,
     leave as "" if you don't want a description yet)

   IMAGES: leave `image: ""` (or point to a file that doesn't exist yet)
   and the card will show a clean empty photo placeholder instead of a
   broken image — add the real photo whenever it's ready, no other code
   needs to change.

   Suggested folder (already created for you):
     assets/experiments/   →  put experiment photos here

   Example:
     {
       title: "Volcanic Eruption Model",
       students: "A. Priya, S. Kumar",
       grade: "Class 10 - A",
       image: "assets/experiments/volcanic-eruption.jpg",
       description: "A working model showing an exothermic reaction that mimics a volcanic eruption."
     }
*/

const CATEGORIES = [
  {
    id: "physics",
    label: "12th",
    items: [
      { title: "Free Energy-Generator Hydro power plane", students: "12th Girls", grade: "12th A2", image: "", description: "" },
      { title: "EDIT ME — Experiment Title", students: "EDIT ME — Student Name(s)", grade: "EDIT ME — Class & Section", image: "", description: "" },
      { title: "EDIT ME — Experiment Title", students: "EDIT ME — Student Name(s)", grade: "EDIT ME — Class & Section", image: "", description: "" }
    ]
  },
  {
    id: "chemistry",
    label: "Chemistry",
    items: [
      { title: "EDIT ME — Experiment Title", students: "EDIT ME — Student Name(s)", grade: "EDIT ME — Class & Section", image: "", description: "" },
      { title: "EDIT ME — Experiment Title", students: "EDIT ME — Student Name(s)", grade: "EDIT ME — Class & Section", image: "", description: "" },
      { title: "EDIT ME — Experiment Title", students: "EDIT ME — Student Name(s)", grade: "EDIT ME — Class & Section", image: "", description: "" }
    ]
  },
  {
    id: "biology",
    label: "Biology",
    items: [
      { title: "EDIT ME — Experiment Title", students: "EDIT ME — Student Name(s)", grade: "EDIT ME — Class & Section", image: "", description: "" },
      { title: "EDIT ME — Experiment Title", students: "EDIT ME — Student Name(s)", grade: "EDIT ME — Class & Section", image: "", description: "" },
      { title: "EDIT ME — Experiment Title", students: "EDIT ME — Student Name(s)", grade: "EDIT ME — Class & Section", image: "", description: "" }
    ]
  },
  {
    id: "computer-maths",
    label: "Computer Science & Mathematics",
    items: [
      { title: "EDIT ME — Experiment Title", students: "EDIT ME — Student Name(s)", grade: "EDIT ME — Class & Section", image: "", description: "" },
      { title: "EDIT ME — Experiment Title", students: "EDIT ME — Student Name(s)", grade: "EDIT ME — Class & Section", image: "", description: "" },
      { title: "EDIT ME — Experiment Title", students: "EDIT ME — Student Name(s)", grade: "EDIT ME — Class & Section", image: "", description: "" }
    ]
  },
  {
    id: "environmental",
    label: "Environmental Science",
    items: [
      { title: "EDIT ME — Experiment Title", students: "EDIT ME — Student Name(s)", grade: "EDIT ME — Class & Section", image: "", description: "" },
      { title: "EDIT ME — Experiment Title", students: "EDIT ME — Student Name(s)", grade: "EDIT ME — Class & Section", image: "", description: "" },
      { title: "EDIT ME — Experiment Title", students: "EDIT ME — Student Name(s)", grade: "EDIT ME — Class & Section", image: "", description: "" }
    ]
  }
];
