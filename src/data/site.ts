// Copy is drawn from each product's live site and public repository. Everything else
// (team, positioning, contact) should be confirmed by the studio before launch.

export type Frame = 'browser' | 'phone' | 'none';

export type Metric = { value: string; label: string };

export type CaseSection = {
  kicker: string;
  title: string;
  body: string;
  points?: string[];
};

export type Shot = { src: string; alt: string; caption: string; frame?: Frame };

export type Project = {
  slug: string;
  title: string;
  wordmark: string;
  sector: string;
  year: number;
  tagline: string;
  summary: string;
  role: string;
  stack: string;
  status: string;
  live?: { label: string; href: string };
  accent: string;
  accentRgb: string;
  accentInk: string;
  cover?: Shot;
  mobile?: string;
  metrics: Metric[];
  sections: CaseSection[];
  gallery: Shot[];
  outcome: string;
  featured?: boolean;
  visual?: 'report';
};

export const site = {
  name: 'GenRec AI',
  wordmark: 'GENREC',
  role: 'Product studio',
  url: 'https://www.genrecai.com',
  description:
    'GenRec AI is a product studio in Tamil Nadu. We design and engineer software for teams that cannot afford a bad day.',
  email: 'hello@genrecai.com',
  location: 'Tamil Nadu, India',
  socials: [{ label: 'LinkedIn', href: 'https://www.linkedin.com/company/genrecai' }],
};

export const nav = [
  { label: 'Work', href: '/work' },
  { label: 'Studio', href: '/studio' },
];

export const principles = [
  {
    title: 'Find the failure first.',
    text: 'Before the first screen, we write down how the system breaks. Bad input, no signal, peak load, a tired operator. That list becomes the spec.',
  },
  {
    title: 'Ship the smallest thing that survives.',
    text: 'We cut until only the load-bearing parts remain. Fewer screens, fewer states, fewer ways to lose.',
  },
  {
    title: 'Stay for the boring part.',
    text: 'Launch starts the test. We watch it, fix it, and hand over a system your team can actually run.',
  },
];

export const capabilities = [
  { title: 'Product strategy', text: 'Scope, sequence and the one decision that makes the build smaller.' },
  { title: 'Interface design', text: 'Screens that hold up on a phone, a tablet and a bad connection.' },
  { title: 'Full-stack engineering', text: 'Web apps, APIs and the plumbing between them.' },
  { title: 'AI systems', text: 'Retrieval, evaluation and human review. Models where they earn their place.' },
  { title: 'Data and infrastructure', text: 'Schemas, queues, deploys and the quiet parts that keep a system up.' },
  { title: 'Rescue and handover', text: 'We take over a stalled build, or leave one your team can run.' },
];

export const team = [
  {
    name: 'Jai Samyukth B U',
    role: 'Strategy and product',
    line: 'Turns a business problem into a short, honest build plan.',
  },
  {
    name: 'Shyamnath Sankar',
    role: 'Operations and scale',
    line: 'Keeps the build, the budget and the people in the same room.',
  },
  {
    name: 'Harish V',
    role: 'Technical lead',
    line: 'Owns the architecture and the parts that fail when nobody is watching.',
  },
];

export const needs = [
  { title: 'A decision maker in the room.', text: 'One person who can say yes, no or not yet.' },
  { title: 'Access to the people who use it.', text: 'A week of real users beats a month of guesses.' },
  { title: 'A deadline you believe in.', text: 'A real date makes the cuts honest.' },
  { title: 'Permission to cut.', text: 'If the scope cannot shrink, the date moves.' },
];

export const projects: Project[] = [
  {
    slug: 'selectstar',
    title: 'SelectStar',
    wordmark: 'SelectStar',
    sector: 'AI / Data tools',
    year: 2026,
    tagline: 'Talk to your database in plain English.',
    summary:
      'An open-source agentic database analyst. Ask a question in plain English and six specialised agents write the SQL, profile the data, build the charts and run the models.',
    role: 'Product, interface, front-end, agent UX',
    stack: 'Next.js 16 · TypeScript · Prisma · SQLite / Postgres · Vega-Lite',
    status: 'Live · Open source, MIT',
    live: { label: 'Visit SelectStar', href: 'https://selectstar.genrecai.com' },
    accent: '#0d9488',
    accentRgb: '13, 148, 136',
    accentInk: '#f1efe8',
    cover: {
      src: '/shots/selectstar-hero.png',
      alt: 'SelectStar landing page with the headline Talk to your database in plain English',
      caption: 'SelectStar / landing screen',
      frame: 'browser',
    },
    mobile: '/shots/selectstar-mobile.png',
    featured: true,
    metrics: [
      { value: '94%', label: 'task success, versus ~72% for a ReAct loop' },
      { value: '7.4s', label: 'end-to-end, from question to streamed answer' },
      { value: '45%', label: 'fewer tokens through scoped agent context' },
      { value: '6', label: 'agents under one graph orchestrator' },
    ],
    sections: [
      {
        kicker: '01 / The problem',
        title: 'A chat box was the wrong shape.',
        body:
          'Most AI data tools wrap a language model around a ReAct loop. The model decides which tool to call, over and over, until it thinks it is done. It is flexible, and it is exactly wrong for a database. Queries wander. Writes are gated by a prompt. A missing join can look like a confident answer.',
        points: [
          'Unbounded reasoning is hard to diagnose when an answer is wrong.',
          'Write safety cannot depend on the model remembering a rule.',
          'Full history on every step makes latency and token cost climb.',
        ],
      },
      {
        kicker: '02 / The build',
        title: 'A graph, not a loop.',
        body:
          'SelectStar classifies intent before any SQL is written. The Router reads the question once, picks the agents that are actually needed, and hands them a deterministic path. EDA, Viz and ML fork-join in parallel after a SELECT. Synthesis is the only agent allowed to write prose. One retry on failure, then a clean error.',
        points: [
          'The SQL agent is the only agent that can touch the database.',
          'Zen mode intercepts writes at the graph edge and waits for a person.',
          'Every turn leaves typed artifacts in the canvas: tables, charts, SQL, models.',
        ],
      },
      {
        kicker: '03 / The interface',
        title: 'The answer is more than a paragraph.',
        body:
          'A question about orders can produce a query, a profile, a chart and a forecast. We designed the canvas as a working surface, not a chat log. Each artifact is typed, exportable and sits beside the answer that references it. In Classic Mode, a spreadsheet and its in-memory SQLite tables are the same object, so editing a cell changes the next query live.',
      },
      {
        kicker: '04 / The result',
        title: 'Discipline beats improvisation.',
        body:
          'On the same questions, the graph completes more tasks, finishes almost twice as fast and spends fewer tokens than the ReAct baseline. More importantly, its failure modes are legible: an error has a place to live, and a write has a person in front of it.',
      },
    ],
    gallery: [
      {
        src: '/shots/selectstar-pipeline.png',
        alt: 'SelectStar agent pipeline in a terminal, from Router to Synthesis',
        caption: 'One turn / Router → SQL → fork(EDA, Viz, ML) → Synthesis',
        frame: 'browser',
      },
      {
        src: '/shots/selectstar-graph.png',
        alt: 'SelectStar graph orchestrator section',
        caption: 'The graph orchestrator / six agents, zero loops',
        frame: 'browser',
      },
      {
        src: '/shots/selectstar-mobile.png',
        alt: 'SelectStar on a phone',
        caption: 'Same pipeline, small screen',
        frame: 'phone',
      },
    ],
    outcome:
      'SelectStar is live and open source. The graph is the product: a small team can read the path an answer took, and a database owner can see exactly where a write stops.',
  },
  {
    slug: 'luminaiq',
    title: 'LuminaIQ',
    wordmark: 'LuminaIQ',
    sector: 'AI / Education',
    year: 2026,
    tagline: 'Learn the whole book, even tonight.',
    summary:
      'An AI study platform that turns any textbook into a prerequisite-ordered learning path, cited answers, quizzes, notes and flashcards. Built for the night before the exam.',
    role: 'Product, design, full-stack, AI',
    stack: 'React · TypeScript · Supabase · pgvector · OpenAI · Stripe',
    status: 'Live · 12,000+ learners',
    live: { label: 'Visit LuminaIQ', href: 'https://www.luminaiq.fun' },
    accent: '#a56b4f',
    accentRgb: '165, 107, 79',
    accentInk: '#f7f0e8',
    cover: {
      src: '/shots/luminaiq-hero.png',
      alt: 'LuminaIQ landing page with the headline Learn the whole book, even tonight',
      caption: 'LuminaIQ / landing screen',
      frame: 'browser',
    },
    mobile: '/shots/luminaiq-mobile.png',
    featured: true,
    metrics: [
      { value: '12k+', label: 'active learners' },
      { value: '50k+', label: 'documents turned into study kits' },
      { value: '<30s', label: 'from upload to first quiz' },
      { value: '8', label: 'study tools on one document layer' },
    ],
    sections: [
      {
        kicker: '01 / The problem',
        title: 'The exam is tomorrow. The book is 600 pages.',
        body:
          'Students do not need another chat box. They need a plan: what to learn first, what carries the most marks, what they have already forgotten. The prep around studying, the notes, the flashcards, the quiz writing, is where the night disappears.',
        points: [
          'A textbook has a structure. A chat window does not.',
          'Re-reading feels productive and teaches very little.',
          'The last 48 hours need triage, not a table of contents.',
        ],
      },
      {
        kicker: '02 / The build',
        title: 'One document, eight ways to learn it.',
        body:
          'Upload a PDF, DOCX or TXT. LuminaIQ extracts the text, chunks it, embeds it and builds a knowledge graph of topics and prerequisites. Every tool works from that same layer: cited chat, auto-generated quizzes, four kinds of notes, 3D flashcards, mindmaps, a visual lab and a spaced-repetition scheduler.',
        points: [
          'Exam Tonight mode weighs coverage against prerequisite depth and builds a plan for the hours left.',
          'The SM-2 scheduler brings a card back just before it would be forgotten.',
          'Visual Lab turns a topic into a working simulation, not a diagram.',
        ],
      },
      {
        kicker: '03 / The interface',
        title: 'Calm enough to open at 11pm.',
        body:
          'Study products tend to look like dashboards. LuminaIQ looks like paper and warm light: a single column, generous type, one clear next action. Progress is visible without turning learning into a slot machine. The quiet surface is what lets the eight tools feel like one product.',
      },
      {
        kicker: '04 / The result',
        title: 'A study habit, not a cram session.',
        body:
          'The product now supports more than twelve thousand learners and fifty thousand documents. The measurable win is time to first quiz, under thirty seconds, and the behavioural win is return: streaks, spaced reviews and a path that always has a next step.',
      },
    ],
    gallery: [
      {
        src: '/shots/luminaiq-features.png',
        alt: 'LuminaIQ feature grid with eight AI study tools',
        caption: 'Eight tools / one document layer',
        frame: 'browser',
      },
      {
        src: '/shots/luminaiq-steps.png',
        alt: 'LuminaIQ how it works section',
        caption: 'Upload → study kit → a path that adapts',
        frame: 'browser',
      },
      {
        src: '/shots/luminaiq-mobile.png',
        alt: 'LuminaIQ on a phone',
        caption: 'The same calm surface on a phone',
        frame: 'phone',
      },
    ],
    outcome:
      'LuminaIQ ships as a complete study system, not a feature demo. A student can go from a file they have never opened to a scored quiz in under a minute, and the product remembers what they need next.',
  },
  {
    slug: 'tabble',
    title: 'Tabble',
    wordmark: 'Tabble.',
    sector: 'Hospitality / Commerce',
    year: 2026,
    tagline: 'Every table becomes your best waiter.',
    summary:
      'QR ordering and a live kitchen display for restaurants. Guests scan, order and pay from the table. Every ticket lands in the kitchen the moment they tap.',
    role: 'Product, design, engineering',
    stack: 'Next.js · TypeScript · Postgres · Razorpay / UPI · Realtime',
    status: 'Live · Founding cohort open',
    live: { label: 'Visit Tabble', href: 'https://www.tabble.in' },
    accent: '#ea580c',
    accentRgb: '234, 88, 12',
    accentInk: '#1a0d05',
    cover: {
      src: '/shots/tabble-hero.png',
      alt: 'Tabble landing page with the headline Every table becomes your best waiter',
      caption: 'Tabble / landing screen',
      frame: 'browser',
    },
    mobile: '/shots/tabble-mobile.png',
    featured: true,
    metrics: [
      { value: '0', label: 'app downloads for guests' },
      { value: '3', label: 'taps from scan to order' },
      { value: '0', label: 'orders re-typed by staff' },
      { value: '50', label: 'founding restaurants, one per table' },
    ],
    sections: [
      {
        kicker: '01 / The problem',
        title: 'Rush hour is lost at the table.',
        body:
          'On a Friday at nine, the kitchen is not the bottleneck. Everything between a guest deciding to order and the kitchen hearing about it is. A party waits for a free waiter. A modification gets shouted across the room. The bill takes three laps. The table sits occupied and does not turn.',
        points: [
          'Orders cool while guests wait to catch someone’s eye.',
          'Every hand-off between pad, POS and kitchen is a place to lose the ticket.',
          'The last twenty minutes of a meal are the slowest.',
        ],
      },
      {
        kicker: '02 / The build',
        title: 'One order, one path, no re-entry.',
        body:
          'Tabble puts a photo-first menu behind a QR code on the table. No app, no sign-up. Guests add dishes, leave a note for the kitchen, and pay by UPI when they are ready. The order appears on a live kitchen display on any tablet or browser the restaurant already owns. Marking it served closes the loop for the floor.',
        points: [
          'Menus, modifiers, sold-out states and prices update live.',
          'Guest notes reach the chef unedited, with the table number attached.',
          'Multi-outlet menus, prices and reports run from one login.',
        ],
      },
      {
        kicker: '03 / The interface',
        title: 'Built to be read across a kitchen.',
        body:
          'The kitchen screen is not a dashboard. It is a queue of tickets with one job each: read the table, read the items, mark it served. Large type, high contrast, no nested menus. The guest side borrows the language of a menu, not a checkout: photography, sections, a visible total, one orange action.',
      },
      {
        kicker: '04 / The result',
        title: 'Fewer steps between hunger and the kitchen.',
        body:
          'The first fifty restaurants lock founding pricing for life. The product is deliberately narrow: no new hardware, no app install, no commission on orders. Tabble does one loop well, from a guest’s thumb to the chef’s screen, and gets out of the way of the floor.',
      },
    ],
    gallery: [
      {
        src: '/shots/tabble-phone.png',
        alt: 'Tabble guest ordering flow on a phone',
        caption: 'Guest flow / scan, order, pay',
        frame: 'browser',
      },
      {
        src: '/shots/tabble-kitchen.png',
        alt: 'Tabble kitchen display and order flow',
        caption: 'Kitchen display / every order lands once',
        frame: 'browser',
      },
      {
        src: '/shots/tabble-mobile.png',
        alt: 'Tabble on a phone',
        caption: 'The menu, in the guest’s hand',
        frame: 'phone',
      },
    ],
    outcome:
      'Tabble is live with its founding cohort. A restaurant can be running on it in days, with its own menu set up by the team, and every order still lands in one place: the kitchen.',
  },
  {
    slug: 'vsb-feedback',
    title: 'VSB Feedback',
    wordmark: 'VSB',
    sector: 'Education / Internal tools',
    year: 2024,
    tagline: 'Feedback that reaches the people who can act on it.',
    summary:
      'A faculty feedback system for VSB Engineering College. Students rate ten teaching parameters once per term; HODs and administrators get clean, department-level reports.',
    role: 'Product, backend, data',
    stack: 'Flask · SQLite · Bootstrap · pandas / openpyxl · Cryptography',
    status: 'Internal deployment · VSB Engineering College',
    accent: '#1d4ed8',
    accentRgb: '29, 78, 216',
    accentInk: '#eef2ff',
    visual: 'report',
    metrics: [
      { value: '10', label: 'standard teaching parameters per faculty' },
      { value: '3', label: 'roles: student, HOD, administrator' },
      { value: '1', label: 'submission per student, per term' },
      { value: '100%', label: 'of mappings importable from Excel' },
    ],
    sections: [
      {
        kicker: '01 / The problem',
        title: 'Paper feedback dies in a cupboard.',
        body:
          'End-of-term feedback arrived on forms, was counted by hand and reached departments weeks later, if it arrived at all. Students could not see that their input mattered. HODs could not compare a faculty member against the department without rebuilding the spreadsheet themselves.',
        points: [
          'Low response rates made the averages weak.',
          'Duplicate and missing submissions were invisible until report day.',
          'The report was a document, not a decision tool.',
        ],
      },
      {
        kicker: '02 / The build',
        title: 'A small system with real roles.',
        body:
          'Students sign in with their college registration number and rate each faculty member across ten parameters. One submission per student is enforced at the database. Administrators map staff to subjects manually or by Excel upload, add students in bulk, and generate reports. HODs see their own department: averages, faculty performance and a non-submission list.',
        points: [
          'Registration numbers are encrypted at rest.',
          'Bulk Excel import with duplicate detection and sample templates.',
          'Reports and non-submission lists export cleanly for department meetings.',
        ],
      },
      {
        kicker: '03 / The interface',
        title: 'A form a student will finish.',
        body:
          'The feedback screen is mobile-first and short: one faculty member at a time, ten clear rows, color-coded ratings that say what a score means. Administration screens are dense where they need to be, with tables, bulk actions and visible state. Nothing requires a manual.',
      },
      {
        kicker: '04 / The result',
        title: 'A term’s feedback, the same week.',
        body:
          'The system replaced the paper loop for the college. Departments can see participation while the window is open, chase the gaps, and walk into a review with the same numbers everyone else has. The data stays useful after the meeting.',
      },
    ],
    gallery: [],
    outcome:
      'VSB runs faculty feedback on its own system, with a complete audit of who submitted and a department view that is ready before the meeting starts.',
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
