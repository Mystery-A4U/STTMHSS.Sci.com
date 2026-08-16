/* ======================================================================
   CONFIG.JS  —  EDIT EVERYTHING YOU NEED RIGHT HERE
   ----------------------------------------------------------------------
   This is the ONLY file you need to touch to:
     1. Change the school name, location, exhibition name & date
     2. Swap in your own school photo
     3. Add / edit / remove inventors and inventions

   Nothing in style.css or the .js animation files needs to change.
   ====================================================================== */


/* ----------------------------------------------------------------------
   1. SITE SETTINGS  —  names, dates, image paths
   ------------------------------------------------------------------- */
const SITE = {
  schoolName: "St. Theresa Matriculation Higher Secondary School",
  schoolShortName: "St. Theresa MHSS",
  place: "Sendurai, Ariyalur",

  exhibitionName: "LUMEN — Science & Innovation Exhibition",
  exhibitionTagline: "Where curiosity takes flight.",

  // Edit these any time — they show up in the banner, the info cards and the footer.
  eventDate: "14 March 2027",          // e.g. "14 March 2027"
  eventDay: "Saturday",                 // e.g. "Saturday"
  eventTime: "9:30 AM – 4:00 PM",
  eventVenue: "School Auditorium & Science Block",

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
   2. INVENTIONS & INVENTORS
   ------------------------------------------------------------------- */
/*
   HOW TO ADD YOUR OWN
   --------------------
   - Add a new object inside the correct category's `items` array (or
     make a whole new category by copying a category block).
   - `inventorImage`  → path to a photo of the inventor
   - `inventionImage` → path to a photo/drawing of the invention
   - If you don't have an image yet, leave the path as "" (empty string)
     or point to a file that doesn't exist — the site automatically shows
     a neat placeholder with the inventor's initials instead of breaking.

   Suggested folders (already created for you):
     assets/inventors/    →  put inventor photos here
     assets/inventions/   →  put invention photos here

   Example:
     {
       inventor: "Ada Lovelace",
       invention: "The First Computer Algorithm",
       year: "1843",
       inventorImage: "assets/inventors/ada-lovelace.jpg",
       inventionImage: "assets/inventions/analytical-engine.jpg",
       detail: "Wrote the first published algorithm intended for a
                machine, laying the groundwork for computer programming."
     }
*/

const CATEGORIES = [
  {
    id: "communication",
    label: "Communication & Media",
    icon: "feather",
    items: [
      {
        inventor: "Alexander Graham Bell",
        invention: "The Telephone",
        year: "1876",
        inventorImage: "assets/inventors/alexander-graham-bell.jpg",
        inventionImage: "assets/inventions/telephone.jpg",
        detail: "Turned the human voice into an electrical signal that could travel down a wire, shrinking the distance between people forever."
      },
      {
        inventor: "Guglielmo Marconi",
        invention: "Wireless Radio",
        year: "1895",
        inventorImage: "assets/inventors/guglielmo-marconi.jpg",
        inventionImage: "assets/inventions/radio.jpg",
        detail: "Sent the first long-distance radio signals through open air, proving that messages could travel without a single wire."
      },
      {
        inventor: "Tim Berners-Lee",
        invention: "The World Wide Web",
        year: "1989",
        inventorImage: "assets/inventors/tim-berners-lee.jpg",
        inventionImage: "assets/inventions/world-wide-web.jpg",
        detail: "Linked documents across computers with a simple system of addresses and links, and gave humanity the modern internet."
      }
    ]
  },
  {
    id: "transportation",
    label: "Transportation",
    icon: "feather",
    items: [
      {
        inventor: "Orville & Wilbur Wright",
        invention: "The Airplane",
        year: "1903",
        inventorImage: "assets/inventors/wright-brothers.jpg",
        inventionImage: "assets/inventions/airplane.jpg",
        detail: "Achieved the first sustained, controlled flight of a powered aircraft at Kitty Hawk, turning the dream of flight into an engineering reality."
      },
      {
        inventor: "Karl Benz",
        invention: "The Motorwagen (First Automobile)",
        year: "1885",
        inventorImage: "assets/inventors/karl-benz.jpg",
        inventionImage: "assets/inventions/automobile.jpg",
        detail: "Built the first practical vehicle powered by an internal combustion engine, laying the foundation for the modern automobile."
      },
      {
        inventor: "George Stephenson",
        invention: "The Steam Locomotive",
        year: "1814",
        inventorImage: "assets/inventors/george-stephenson.jpg",
        inventionImage: "assets/inventions/steam-locomotive.jpg",
        detail: "Perfected the steam locomotive for public railways, making fast overland travel and trade possible for the first time."
      }
    ]
  },
  {
    id: "energy",
    label: "Energy & Power",
    icon: "feather",
    items: [
      {
        inventor: "Michael Faraday",
        invention: "Electromagnetic Induction",
        year: "1831",
        inventorImage: "assets/inventors/michael-faraday.jpg",
        inventionImage: "assets/inventions/generator.jpg",
        detail: "Discovered that a moving magnet could generate electric current, the principle behind every generator and motor in use today."
      },
      {
        inventor: "Thomas Edison",
        invention: "The Practical Light Bulb",
        year: "1879",
        inventorImage: "assets/inventors/thomas-edison.jpg",
        inventionImage: "assets/inventions/light-bulb.jpg",
        detail: "Engineered a long-lasting incandescent bulb and the power stations to run it, lighting up homes and cities after dark."
      },
      {
        inventor: "Nikola Tesla",
        invention: "The Alternating Current (AC) System",
        year: "1888",
        inventorImage: "assets/inventors/nikola-tesla.jpg",
        inventionImage: "assets/inventions/ac-motor.jpg",
        detail: "Developed the AC motor and power system that made it possible to transmit electricity efficiently over long distances."
      }
    ]
  },
  {
    id: "computing",
    label: "Computing & The Digital Age",
    icon: "feather",
    items: [
      {
        inventor: "Charles Babbage",
        invention: "The Analytical Engine",
        year: "1837",
        inventorImage: "assets/inventors/charles-babbage.jpg",
        inventionImage: "assets/inventions/analytical-engine.jpg",
        detail: "Designed a mechanical, programmable calculating machine that is now recognised as the conceptual ancestor of the computer."
      },
      {
        inventor: "Alan Turing",
        invention: "The Turing Machine",
        year: "1936",
        inventorImage: "assets/inventors/alan-turing.jpg",
        inventionImage: "assets/inventions/turing-machine.jpg",
        detail: "Described a simple, abstract machine capable of any computation, forming the theoretical foundation of modern computer science."
      },
      {
        inventor: "Steve Wozniak",
        invention: "The Apple I Personal Computer",
        year: "1976",
        inventorImage: "assets/inventors/steve-wozniak.jpg",
        inventionImage: "assets/inventions/apple-i.jpg",
        detail: "Hand-built one of the first affordable personal computers, helping bring computing out of laboratories and into homes."
      }
    ]
  },
  {
    id: "medicine",
    label: "Medicine & Health",
    icon: "feather",
    items: [
      {
        inventor: "Edward Jenner",
        invention: "The Smallpox Vaccine",
        year: "1796",
        inventorImage: "assets/inventors/edward-jenner.jpg",
        inventionImage: "assets/inventions/vaccine.jpg",
        detail: "Showed that exposure to cowpox could protect people from smallpox, founding the entire science of immunology."
      },
      {
        inventor: "Alexander Fleming",
        invention: "Penicillin",
        year: "1928",
        inventorImage: "assets/inventors/alexander-fleming.jpg",
        inventionImage: "assets/inventions/penicillin.jpg",
        detail: "Noticed a mould killing bacteria in his lab dish and turned that accident into the world's first true antibiotic."
      },
      {
        inventor: "Wilhelm Röntgen",
        invention: "X-Ray Imaging",
        year: "1895",
        inventorImage: "assets/inventors/wilhelm-rontgen.jpg",
        inventionImage: "assets/inventions/xray.jpg",
        detail: "Discovered a form of radiation that could pass through soft tissue and photograph bone, letting doctors see inside the body."
      }
    ]
  },
  {
    id: "everyday",
    label: "Everyday Innovation & Indian Pioneers",
    icon: "feather",
    items: [
      {
        inventor: "Johannes Gutenberg",
        invention: "The Printing Press",
        year: "1440",
        inventorImage: "assets/inventors/johannes-gutenberg.jpg",
        inventionImage: "assets/inventions/printing-press.jpg",
        detail: "Built a movable-type press that made books fast and cheap to produce, spreading knowledge further than ever before."
      },
      {
        inventor: "C. V. Raman",
        invention: "The Raman Effect",
        year: "1928",
        inventorImage: "assets/inventors/cv-raman.jpg",
        inventionImage: "assets/inventions/raman-effect.jpg",
        detail: "Discovered how light changes wavelength when it scatters off molecules, earning India its first Nobel Prize in the sciences."
      },
      {
        inventor: "Dr. A. P. J. Abdul Kalam",
        invention: "India's SLV & Missile Technology",
        year: "1980",
        inventorImage: "assets/inventors/apj-abdul-kalam.jpg",
        inventionImage: "assets/inventions/slv-rocket.jpg",
        detail: "Led the team behind India's first satellite launch vehicle and its defence missile programme, inspiring generations of Indian students to pursue science."
      }
    ]
  }
];
