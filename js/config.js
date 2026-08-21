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
  eventDate: "22 August 2026",          // e.g. "14 March 2027"
  eventDay: "Saturday",                 // e.g. "Saturday"
  eventTime: "9:30 AM – 4:00 PM",
  eventVenue: "School Auditorium & Christy Block",

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
  creditHandle: "11th Bio-B Boys",
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
    label: "12th A",
    items: [
      { title: "Renewable energy", students: "BOYS", grade: "12th A", image: "assets/images/renewable.jpg", description: "Demonstrates how naturally replenished sources such as solar, wind and water can be used to generate clean electricity." },
      { title: "Gas evolution", students: "BOYS", grade: "12th A", image: "assets/images/gas-evolution.jpg", description: "Demonstrates a chemical reaction in which gases are produced and collected for observation." },
      { title: "DNA model", students: "GIRLS", grade: "12th A", image: "assets/images/dna-model.jpg", description: "A model showing the double-helix structure of DNA and its role in storing genetic information." },
      { title: "Free energy generator", students: "GIRLS", grade: "12th A", image: "assets/images/free-energy.jpg", description: "Demonstrates the generation of electrical energy from an external renewable source such as solar, wind or motion." }
     ]
  },
  {
    id: "chemistry",
    label: "12TH B",
    items: [
      { title: "Free energy generator hydro power plane", students: "GIRLS", grade: "12th B", image: "assets/images/hydro-power.jpg", description: "Demonstrates how flowing water can drive a turbine and generate electricity using hydropower." },
      { title: "Tesla coil electricity producer", students: "GIRLS", grade: "12th B", image: "assets/images/tesla.jpg", description: "Demonstrates wireless transmission and the generation of high-voltage electricity using a Tesla coil." },
      { title: "Plastic waste into electricity", students: "BOYS", grade: "12th B", image: "assets/images/plastic-electricity.jpg", description: "Explores methods of converting waste plastic into useful energy through thermal or other energy-conversion processes." }
    ] 
  },
  {
    id: "biology",
    label: "12th C",
    items: [
      { title: "Foot step generator", students: "BOYS", grade: "12th C", image: "assets/images/foot-step.jpg", description: "Converts the mechanical energy produced by footsteps into electrical energy." },
      { title: "Vande graaff generator", students: "GIRLS", grade: "12th C", image: "assets/images/vande.jpg", description: "Demonstrates the generation of high-voltage static electricity and its visible effects." }
    ]
  },
  {
    id: "computer-maths",
    label: "12th A1",
    items: [
      { title: "ROBOT", students: "BOYS", grade: "12th A1", image: "assets/images/robot.jpg", description: "A programmed robotic model that demonstrates automated movement, sensing and control." },
      { title: "Earthquake alarm", students: "BOYS", grade: "12th A1", image: "assets/images/earth-alarm.jpg", description: "Detects ground vibrations and activates an alarm to provide an early warning of possible earthquakes." }
    ]
  },
  {
    id: "environmental",
    label: "11th A",
    items: [
      { title: "Air pollution control", students: "BOYS", grade: "11th A", image: "aassets/images/air-pollution.jpg", description: "Demonstrates methods for reducing harmful pollutants and improving air quality." },
      { title: "Security alarm", students: "BOYS", grade: "11th A", image: "assets/images/security.jpg", description: "Uses sensors to detect unauthorized entry and activate an alert system." },
      { title: "Hydraulic lift", students: "GIRLS", grade: "11th A", image: "assets/images/hydraulic.jpg", description: "Demonstrates Pascal's law by using fluid pressure to lift a heavy load." },
      { title: "Photosynthesis model", students: "GIRLS", grade: "11th A", image: "assets/images/photosynthesis.jpg", description: "" },
      { title: "Earthquake alarm", students: "GIRLS", grade: "11th A", image: "assets/images/earthquake.jpg", description: "" }
    ]
  },
  {
    id: "Eleventh B",
    label: "11th B",
    items: [
      { title: "Hydraulic pump", students: "BOYS", grade: "11th B", image: "assets/images/hydraulic-pump.jpg", description: "" },
      { title: "Carbon observer", students: "BOYS", grade: "11th B", image: "assets/images/co2.jpg", description: "" },
      { title: "Smart traffic management", students: "BOYS", grade: "11th B", image: "assets/images/x-ray.jpg", description: "" },
      { title: "Xray producion model", students: "GIRLS", grade: "11th B", image: "assets/images/smart-traffic.jpg", description: "" },
      { title: "Smart village", students: "GIRLS", grade: "11th B", image: "assets/images/smart-village.jpg", description: "" },
      { title: "Microscopic model", students: "GIRLS", grade: "11th B", image: "assets/images/microscope.jpg", description: "" }
    ]
  },
  {
    id: "Elventh  A1",
    label: "11th A1",
    items: [
      { title: "I/P and O/P devices", students: "GIRLS", grade: "11th A1", image: "assets/images/ip-devices.jpg", description: "" },
      { title: "Robot model", students: "GIRLS", grade: "11th A1", image: "assets/images/robot-model.jpg", description: "" },
      { title: "Hologram", students: "GIRLS", grade: "11th A1", image: "assets/images/hologram.jpg", description: "" },
      { title: "Computer model", students: "BOYS", grade: "11th A1", image: "assets/images/computer.jpg", description: "" },
      { title: "Type of network", students: "BOYS", grade: "11th A1", image: "assets/images/type-net.jpg", description: "" },
      { title: "Projector model", students: "BOYS", grade: "11th A1", image: "assets/images/projector.jpg", description: "" }
    ]
  }
];
