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
    { label: "LANDING DEMO", href: "/landing-page-demo" },
    { label: "CONTACT", href: "/contact" },
  ],

  // ── EDITORIAL ─────────────────────────────────────────────────────────────
  // Content for the editorial page.
  // Each entry can optionally have an image, title, and body text.
  // The layout will automatically adapt.
  editorial: [
    {
      client: "BAKED BUTTER BISCUITS",
      details: "Baked Butter Biscuits is a genre-bending, 30 minute episodic comedy series about survival and self-growth, blurring the line between realism and ridiculousness. Inspired by shows like Atlanta and Key and Peele, Biscuits examines race, friendship, and absurdity in spaces where Black life collides with societal expectations.\n\nCreated by Yvano Antonio & Ananse Arthur.[LINK]BakedButterBiscuitsSeries.com|https://bakedbutterbiscuitsseries.com\n\n### Pilot Episode Synopsis\n\nAnanse and his producing partner, Evo, are the only ones clapping to their outlandish short film, “Medicinal Pussy”,  in an otherwise silent boardroom. The executives are less than impressed as the two directors fumble through their pitch presentation. Ananse is insistent on finishing, but the board chair has had enough and activates a silent alarm.\n\nSecurity arrives, but Ananse won't surrender and ends up in a choke hold. Jada, the assistant to the board chair, bursts through the door to find her friends hemmed up. She immediately disowns them but gets fired on the spot. The boys get thrown out of the building and are left on the concrete with a tough decision to make about their future.",
      images: [
        "/projects/bbb/BBB_Pilot_Hero_V1.mp4"
      ]
    },
    /*
    {
      client: "GOOD YUTE LIFESTYLE",
      details: "",
      images: [
        "/projects/PRO_9325-Edit.jpg"
      ]
    },
    */
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
        "/projects/chj/S3_Ep_1_-_8.jpg"
      ],
      bottomVideo: "https://youtu.be/4tOHeFDRI0k?si=F5Fghx8mAVR2Fr0Y&t=25"
    },
    /*
    {
      client: "MUNDO",
      details: "",
      images: [
        "/projects/mundo/RP_Promo_Wide.mov"
      ]
    },
    */
    {
      client: "CEE CENTRE FOR YOUNG BLACK PROFESSIONALS",
      details: "The CEE Centre for Young Black Professionals is a Toronto-based registered charity dedicated to helping Black youth overcome social and economic barriers to employment, education, and training. Co-founded in 2012 by Dr. Kofi Hope, a Rhodes Scholar and civic entrepreneur, and Shereen Ashman who established CEE's core program model and foundational curriculum in 2013. Its goal is to move Black youth from the margins of the labor market into prosperous, high-demand careers by focusing on three pillars: Careers, Education, and Empowerment.\n\nAs the Storyteller at the CEE, I was responsible for planning and executing strategic media campaigns for fundraising events and program workshops, including photoshoots, documentary films, social media advertisements and livestream broadcasts. These campaigns were created to target specific demographics within Black communities across the GTA.\n\n[LINK]ceetoronto.org|https://ceetoronto.org/",
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
      type: "TV Series",
      image: "/projects/baked-butter.png"
    },
    {
      title: "Honestly - Fafiélla",
      year: "2024",
      roles: ["Director"],
      type: "Music Video",
      image: "/projects/site-images/_DSC2431.webp"
    },
    {
      title: "Black Community Mixtapes",
      year: "2023",
      roles: ["Still Photographer"],
      type: "TV Series (5 Episodes)",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2000&auto=format&fit=crop"
    },
    {
      title: "Doubles",
      year: "2023",
      roles: ["Still Photographer"],
      type: "Film",
      image: "https://image.tmdb.org/t/p/w500/jCv6NWHOx9hf5dBHUoS94lYd1vw.jpg"
    },
    {
      title: "The Legacy Awards",
      year: "2023",
      roles: ["Director Trainee"],
      type: "TV Special",
      image: "https://image.tmdb.org/t/p/w500/p2QPebmMw6axMylPOJC3kIo8Phl.jpg"
    },
    {
      title: "Erin's Guide to Kissing Girls",
      year: "2022",
      roles: ["Still Photographer"],
      type: "Film",
      image: "https://image.tmdb.org/t/p/w500/kJmau4bZMuGNUYp2owHp51rHrfz.jpg"
    },
    {
      title: "Reel Black: Our Film Stories",
      year: "2022",
      roles: ["Still Photographer"],
      type: "Short",
      image: "https://images.unsplash.com/photo-1588691522079-052a38615a13?q=80&w=2000&auto=format&fit=crop"
    },
    {
      title: "MoonGazer",
      year: "2022",
      roles: ["Director"],
      type: "Short",
      image: "https://image.tmdb.org/t/p/w500/7M6rvnXj7lQZ2I1pN1k6t0Qwzqg.jpg"
    },
    {
      title: "TallBoyz",
      year: "2022",
      roles: ["Social Media Consultant"],
      type: "TV Series (6 Episodes)",
      image: "https://image.tmdb.org/t/p/w500/hpVkAc3EaEDejSvhk1lSxOgGOsR.jpg"
    },
    {
      title: "Being Black in Toronto",
      year: "2020",
      roles: ["Mentor", "Story Editor"],
      note: "Canadian Screen Award Winner - Best Direction in a Documentary Series (2021)",
      type: "Series",
      image: "https://images.unsplash.com/photo-1486808013385-d72b22bb33f3?q=80&w=2000&auto=format&fit=crop"
    },
    {
      title: "Promise Me",
      year: "2020",
      roles: ["Still Photographer"],
      type: "Short",
      image: "https://image.tmdb.org/t/p/w500/354U0sf0BWPReBVE8z2GZYfDiD1.jpg"
    },
    {
      title: "Onyx",
      year: "2020",
      roles: ["Director"],
      type: "Short",
      image: "https://image.tmdb.org/t/p/w500/7I08D2J6n6kYyZJ9vY8v7CqL0Dk.jpg"
    },
    {
      title: "Black",
      year: "2019",
      roles: ["Director", "Still Photographer"],
      type: "Short",
      image: "https://image.tmdb.org/t/p/w500/seN6rRfN0I6n8iDXjlSMk1QjNcq.jpg"
    },
    {
      title: "Mr. Jane and Finch",
      year: "2019",
      roles: ["Still Photographer"],
      type: "Short",
      image: "https://image.tmdb.org/t/p/w500/4dib2X6kM10ghIBuYGlXZ4oJCJk.jpg"
    }
  ],

  // ── AWARDS ────────────────────────────────────────────────────────────────
  awards: [
    {
      title: "Canadian Screen Award (2021)",
      status: "Winner",
      description: "of Best Direction, Documentary Series for his work on the project Being Black in Toronto."
    },
    {
      title: "Emerging Lens Cultural Film Festival (2021)",
      status: "Winner",
      description: "of Best Documentary for his directorial debut short documentary, #BLACK."
    },
    {
      title: "Hollywood North Film Awards (2020)",
      status: "Nominated",
      description: "for Best VFX & Color and Best Editing of a Canadian Short Doc for #BLACK."
    },
    {
      title: "Gary International Black Film Festival (2020)",
      status: "Nominated / Selected",
      description: "for Best Youth Film"
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
        { label: "Executive Producer", value: "Good Yute Lifestyle & A.M Studios" },
  
        { label: "Written & Directed by", value: "Yvano Antonio & Ananse Arthur"},
       
      ]
    },
    { 
      title: "MOONGAZER | SHORT HORROR FILM", 
      image: "", 
      href: "https://youtu.be/U0j3r8ulTM4",
      credits: [
        { label: "Executive Producer", value: "OYA Media Group" },
        { label: "Directed by", value: "Yvano Antonio" },
        { label: "Cinematographer", value: "Eniola Yussuff" },
        { label: "Production Designer", value: "Sharine Taylor" },
        { label: "Special Effects Makeup", value: "Gabrielle Geneviève Martin" },
        { label: "Cast", value: "Storm Clarke, Jonathan Isaiah Tucker, Steve Kasan, Jessica Myrie, Reece Presley, Lara Tai" }
      ]
    },
    { 
      title: "FAFIÉLLA | HONESTLY | MUSIC VIDEO", 
      image: "/projects/site-images/_DSC2431.webp", 
      href: "https://vimeo.com/895031625/d4268c2880" 
    },
    { 
      title: "PRACTICALLY MAGIC | COMMERCIAL SPEC ", 
      image: "https://img.youtube.com/vi/tbQP2YesXxI/maxresdefault.jpg", 
      href: "https://youtu.be/tbQP2YesXxI",
      credits: [
        { label: "Executive Producer", value: "Khara Martin" },
        { label: "Directed by", value: "Yvano Antonio" },
        { label: "Cinematographer", value: "Ismail Ali" },
        { label: "Editor", value: "Sochima Nwakaeze" },
        { label: "Starring", value: "Khara Martin" }
      ]
    },
    { 
      title: "#BLACK | SHORT FILM | CSA WINNER ", 
      image: "https://img.youtube.com/vi/-xLbpc2JCGg/maxresdefault.jpg", 
      href: "https://youtu.be/-xLbpc2JCGg",
      credits: [
        { label: "Executive Producer", value: "Fabienne Colas Foundation" },
        { label: "Written & Directed by", value: "Yvano Antonio" }
      ]
    },
  ],

  // ── CONTACT PAGE ────────────────────────────────────────────────────────────
  contact: {
    heading: "GET IN TOUCH",
    blurb: "For bookings, collaborations, and general inquiries.",
    email: "yvanoantonio@protonmail.com",
    // Optional management / representation line. Leave "" to hide.
    repName: "",
    repEmail: "",
  },

  // ── SOCIAL LINKS (footer) ───────────────────────────────────────────────────
  // Set any to "" to hide that icon.
  social: {
    tiktok: "https://www.tiktok.com/@yvanoantonio",
    instagram: "https://www.instagram.com/yvanoantonio/",
    youtube: "",
    email: "ywickhamedwards@gmail.com",
  },
}

export type Project = (typeof siteConfig.projects)[number]
export type Editorial = (typeof siteConfig.editorial)[number]
