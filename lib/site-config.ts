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
      title: "CLUBHOUSE JAMZ ", 
      image: "", 
      href: "https://www.youtube.com/watch?v=nPmq7VKqo4U",
      subtitle: "",
      credits: []
    },
    { 
      title: "HOURS", 
      image: "/projects/project-2.png", 
      href: "",
      subtitle: "SOME PIECES TAKE YOU FURTHER",
      credits: [
        { label: "Music", value: "Julius Pearce-Tate from Cartel" },
        { label: "Production Company", value: "Antidote/Duala" },
        { label: "Director", value: "Isiah Blake" }
      ]
    },
    { title: "BODY BY CHOSEN", image: "/projects/project-3.png", href: "" },
    { title: "SLEEP COUNTRY", image: "/projects/project-4.png", href: "" },
    { title: "LIZA", image: "/projects/project-5.png", href: "" },
    { title: "JAZZ CARTIER", image: "/projects/project-6.png", href: "" },
    { title: "REEBOK", image: "/projects/project-7.png", href: "" },
    { title: "NIKE", image: "/projects/project-8.png", href: "" },
    { title: "ANCESTRY NEXT GEN", image: "/projects/project-9.png", href: "" },
  ],

  // ── CONTACT PAGE ────────────────────────────────────────────────────────────
  contact: {
    heading: "GET IN TOUCH",
    blurb: "For bookings, collaborations, and general inquiries.",
    email: "ywickhamedwards@gmail.com",
    // Optional management / representation line. Leave "" to hide.
    repName: "Represented by Example Mgmt",
    repEmail: "bookings@example.com",
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
