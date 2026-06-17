/**
 * ============================================================================
 *  SITE CONFIG — EDIT EVERYTHING HERE
 * ============================================================================
 *  This is the ONLY file you need to touch to change the content of the site.
 *  - Change your name / nav labels below.
 *  - Add, remove, or reorder projects in the `projects` array.
 *  - Update your contact details and social links.
 *
 *  To add a project:
 *    1. Drop an image into /public/projects (e.g. my-film.png)
 *    2. Add an entry to the `projects` array:
 *         { title: "MY FILM", image: "/projects/my-film.png", href: "https://..." }
 *
 *  `href` is where clicking the project goes (Vimeo, YouTube, etc.).
 *  Leave `href` empty ("") if a project shouldn't link anywhere.
 * ============================================================================
 */

export const siteConfig = {
  // Your name / studio name shown in the header and browser tab.
  name: "YVANO ANTONIO",

  // Short description used for SEO / social sharing.
  description: "Director & Filmmaker — commercials, music videos, and brand films.",

  // Top navigation links.
  nav: [
    { label: "HOME", href: "/" },
    { label: "CONTACT", href: "/contact" },
  ],

  // ── PROJECTS ──────────────────────────────────────────────────────────────
  // The grid of work on the homepage. Order here = order on the page.
  projects: [
    { 
      title: "CLUBHOUSE JAMZ | LIVE BROADCAST", 
      image: "", 
      href: "https://www.youtube.com/watch?v=nPmq7VKqo4U",
      subtitle: "Clubhouse Jamz is a live weekly variety show",
      credits: [ 
        { label: "Executive Producer", value: "HNTRS CLUB INC." },
        { label: "Directed by", value: "Yvano Antonio" },
        { label: "Technical Director", value: "Ismael Machado" }
      ]
    },
    { 
      title: "BAKED BUTTER BISCUITS (2025) | SERIES PILOT EPISODE ", 
      image: "", 
      href: "https://youtu.be/X0GeZQYM-ms",
      subtitle: "Imagine Adult Swim and a Skittles commercial had a love child.",
      credits: [
        { label: "Executive Producer", value: "Yvano Antonio & Ananse Arthur" },
  
        { label: "Written & Directed by", value: "Yvano Antonio & Ananse Arthur"},
       
      ]
    },
    { title: "MOONGAZER | SHORT FILM", image: "", href: "https://youtu.be/U0j3r8ulTM4" },
    { title: "SLEEP COUNTRY", image: "", href: "" },
    { title: "LIZA", image: "", href: "" },
    { title: "JAZZ CARTIER", image: "", href: "" },
    { title: "REEBOK", image: "", href: "" },
    { title: "NIKE", image: "", href: "" },
    { title: "ANCESTRY NEXT GEN", image: "", href: "" },
  ],

  // ── CONTACT PAGE ────────────────────────────────────────────────────────────
  contact: {
    heading: "GET IN TOUCH",
    blurb: "For bookings, collaborations, and general inquiries.",
    email: "ywickhamedwards@gmail.com",
    // Optional management / representation line. Leave "" to hide.
    repName: "",
    repEmail: "",
  },

  // ── SOCIAL LINKS (footer) ───────────────────────────────────────────────────
  // Set any to "" to hide that icon.
  social: {
    vimeo: "https://vimeo.com",
    instagram: "https://www.instagram.com/yvanoantonio/",
    youtube: "",
    email: "ywickhamedwards@gmail.com",
  },
}

export type Project = (typeof siteConfig.projects)[number]
