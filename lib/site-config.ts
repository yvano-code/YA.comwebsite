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
    { label: "DEMO REEL", href: "/" },
    { label: "FILM & TV", href: "/film-tv" },
    { label: "EDITORIAL", href: "/editorial" },
    { label: "ACCREDITATIONS", href: "/imdb" },
    { label: "CONTACT", href: "/contact" },
  ],

  // ── EDITORIAL ─────────────────────────────────────────────────────────────
  // Content for the editorial page.
  // Each entry can optionally have an image, title, and body text.
  // The layout will automatically adapt.
  editorial: [
    {
      client: "BAKED BUTTER BISCUITS",
      details: "Baked Butter Biscuits is a genre-bending, 30 minute episodic comedy series about survival and self-growth, blurring the line between realism and ridiculousness. Created by award winning director Yvano Antonio and cinematographer Ananse-Tony, and inspired by shows like Atlanta and Key and Peele, Biscuits examines race, friendship, and absurdity in spaces where Black life collides with societal expectations.",
      showPhotoCarousel: true,
      images: [
        "/projects/bbb/BBB_Pilot_Hero_V1.mp4",
        "/projects/bbb/Still 2025-09-09_1.29.1.jpg",
        "/projects/bbb/Still 2025-09-09_2.8.1.jpg",
        "/projects/bbb/Still 2025-09-09_3.13.1.jpg",
        "/projects/bbb/Still 2025-09-09_3.20.1.jpg",
        "/projects/bbb/Still 2025-09-12 211118_1.19.1.png",
        "/projects/bbb/Still 2025-09-12 211349_1.32.1.png"
      ]
    },
    {
      client: "GOOD YUTE LIFESTYLE",
      details: "",
      images: [
        "/projects/PRO_9325-Edit.jpg"
      ]
    },
    {
      client: "THE CLUBHOUSE JAMZ EXPERIENCE",
      details: "Clubhouse Jamz is a weekly live music countdown show just like 106 & Park. The show is hosted by Splash GB, who interviews guest artists and puts their talents and skills to the test with tough questions, theme game shows and requests for encore performances. Based in Toronto, Canada, Clubhouse Jamz is performed in front of a live studio audience and broadcasted live to Twitch and YouTube.\n\nExecutive Producer: HNTRS CLUB INC.\nDirected by: Yvano Antonio\nTechnical Director: Ismael Machado\nVideo by: London Rich / Set In Film",
      showPhotoCarousel: true,
      images: [
        "https://www.youtube.com/watch?v=y2CfIy8dmeA",
        "/projects/chj/DSC00335.jpg",
        "/projects/chj/DSC00393.jpg",
        "/projects/chj/DSC07202.jpg",
        "/projects/chj/DSC07237.jpg",
        "/projects/chj/DSC08590.jpg",
        "/projects/chj/DSC08726.jpg",
        "/projects/chj/S3 Ep 1 - 8.jpg"
      ]
    },
    {
      client: "MUNDO",
      details: "",
      images: [
        "/projects/mundo/RP_Promo_Wide.mov"
      ]
    },
    {
      client: "CEE CENTRE FOR YOUNG BLACK PROFESSIONALS",
      details: "",
      showControls: true,
      images: [
        "https://youtu.be/Rb9oltIDkwc?si=Nio7HMz0EaJmh9Bk&t=3",
        "https://www.youtube.com/watch?v=1OkmBc1Cs-Q&t=3s",
        "https://www.youtube.com/live/GF6R-dyaDXQ?si=Wn26NnoPJ5_cf1io&t=458"
      ]
    }
  ],

  // ── IMDB CREDITS ──────────────────────────────────────────────────────────
  // Manually entered IMDB credits to display on the native /imdb page.
  imdbBio: "Yvano Antonio is an award-winning Canadian film director, best known for \"Being Black in Toronto (2020)\", which earned him the 2021 Canadian Screen Award for Best Direction in a Documentary Series. Known for blending cinematic realism with social impact, Yvano's work—featured on CBC Gem—spotlights identity, resilience, and community with visual and emotional depth.",
  imdbBioLink: {
    title: "Canadian Screen Award Details",
    url: "https://www.academy.ca/2021/omolola-ajao/"
  },
  imdbCredits: [
    {
      title: "Baked Butter Biscuits",
      year: "2025",
      roles: ["Co-Director"],
      type: "TV Series"
    },
    {
      title: "Honestly - Fafiélla",
      year: "2024",
      roles: ["Director"],
      type: "Music Video"
    },
    {
      title: "Black Community Mixtapes",
      year: "2023",
      roles: ["Still Photographer"],
      type: "TV Series (5 Episodes)"
    },
    {
      title: "Doubles",
      year: "2023",
      roles: ["Still Photographer"],
      type: "Film"
    },
    {
      title: "The Legacy Awards",
      year: "2023",
      roles: ["Director Trainee"],
      type: "TV Special"
    },
    {
      title: "Erin's Guide to Kissing Girls",
      year: "2022",
      roles: ["Still Photographer"],
      type: "Film"
    },
    {
      title: "Reel Black: Our Film Stories",
      year: "2022",
      roles: ["Still Photographer"],
      type: "Short"
    },
    {
      title: "MoonGazer",
      year: "2022",
      roles: ["Director"],
      type: "Short"
    },
    {
      title: "TallBoyz",
      year: "2022",
      roles: ["Social Media Consultant"],
      type: "TV Series (6 Episodes)"
    },
    {
      title: "Being Black in Toronto",
      year: "2020",
      roles: ["Director"],
      type: "Short",
      note: "Winner: 2021 Canadian Screen Award"
    },
    {
      title: "Promise Me",
      year: "2020",
      roles: ["Still Photographer"],
      type: "Short"
    },
    {
      title: "Black",
      year: "2019",
      roles: ["Director", "Still Photographer"],
      type: "Short"
    },
    {
      title: "Mr. Jane and Finch",
      year: "2019",
      roles: ["Still Photographer"],
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
      href: "/projects/bbb/BBB_Pilot_Hero_V1.mp4",
      subtitle: "In a world where absurdity and reality constantly collide, three Black twenty-somethings navigate their identity and personal chaos with sharp humour and surreal twists.",
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
