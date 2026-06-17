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
    { label: "FILM & TV", href: "/film-tv" },
    { label: "EDITORIAL", href: "/editorial" },
    { label: "CONTACT", href: "/contact" },
    { label: "IMDB", href: "/imdb" },
  ],

  // ── EDITORIAL ─────────────────────────────────────────────────────────────
  // Content for the editorial page.
  // Each entry can optionally have an image, title, and body text.
  // The layout will automatically adapt.
  editorial: [
    {
      client: "SUMMER ARCHIVES",
      font: "Helvetica",
      release: "2023",
      images: [
        "/projects/gyl-tshirt-sample.png",
        "https://images.unsplash.com/photo-1513336828551-93c6be08253a?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000"
      ]
    },
    {
      client: "TEXTURES",
      font: "Inter",
      release: "2024",
      images: [
        "https://images.unsplash.com/photo-1505322022379-7c3353ee6291?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?auto=format&fit=crop&q=80&w=1000"
      ]
    }
  ],

  // ── IMDB CREDITS ──────────────────────────────────────────────────────────
  // Manually entered IMDB credits to display on the native /imdb page.
  imdbBio: "Yvano Wickham-Edwards (Yvano Antonio) is a Canadian film director best known for the Canadian Screen Award winning documentary Being Black In Toronto. Yvano is also well known for his set photography on the two-time Canadian Screen Award winning documentary Mr. Jane & Finch. In 2019, Yvano made his directorial debut at the 15th annual Montreal International Black Film...",
  imdbCredits: [
    {
      title: "Baked Butter Biscuits",
      year: "2025",
      roles: ["Director"],
      type: "TV Series"
    },
    {
      title: "Honestly - Fafiélla",
      year: "2024",
      roles: ["Director"],
      type: "Music Video"
    },
    {
      title: "Being Black in Toronto",
      year: "2020",
      roles: ["Director"],
      type: "Short"
    },
    {
      title: "Black",
      year: "2019",
      roles: ["Camera and Electrical Department"],
      type: "Short"
    }
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
      title: "BAKED BUTTER BISCUITS | SERIES PILOT EPISODE ", 
      image: "/projects/baked-butter.png", 
      href: "https://youtu.be/X0GeZQYM-ms",
      subtitle: "Imagine Adult Swim and a Skittles commercial had a love child.",
      credits: [
        { label: "Executive Producer", value: "Yvano Antonio & Ananse Arthur" },
  
        { label: "Written & Directed by", value: "Yvano Antonio & Ananse Arthur"},
       
      ]
    },
    { title: "MOONGAZER | SHORT HORROR FILM", image: "", href: "https://youtu.be/U0j3r8ulTM4" },
    { 
      title: "FAFIÉLLA | HONESTLY | MUSIC VIDEO", 
      image: "https://i.vimeocdn.com/video/1769499952-5be64205ec75680f0c9df757f9698118af9485e16517f66aa181c643035322a9-d_1280x720?region=us", 
      href: "https://vimeo.com/895031625/d4268c2880" 
    },
    { title: "PRACTICALLY MAGIC | COMMERCIAL SPEC ", image: "https://img.youtube.com/vi/tbQP2YesXxI/maxresdefault.jpg", href: "https://youtu.be/tbQP2YesXxI" },
    { title: "#BLACK | SHORT FILM | CSA WINNER ", image: "https://img.youtube.com/vi/-xLbpc2JCGg/maxresdefault.jpg", href: "https://youtu.be/-xLbpc2JCGg" },
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
export type Editorial = (typeof siteConfig.editorial)[number]
