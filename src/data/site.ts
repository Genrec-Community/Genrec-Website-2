// Copy is drawn from each product's live site and public repository.

export type Frame = 'browser' | 'phone' | 'none';

export type Metric = { value: string; label: string };

export type CaseSection = {
  kicker: string;
  title: string;
  body: string;
  points?: string[];
};

export type Shot = { src: string; alt: string; caption: string; frame?: Frame };

export type ProjectKind = 'product' | 'open-source' | 'other';

export type Project = {
  slug: string;
  kind: ProjectKind;
  repo?: string;
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

// The brand is written "GenrecAI" everywhere it appears on the web (founder sites, product
// footers), so the site uses the same spelling. The spaced form is kept as an alternate name
// so both "genrecai" and "genrec ai" searches resolve to this domain.
export const site = {
  name: 'GenrecAI',
  altNames: ['GenRec AI', 'Genrec AI', 'Genrec', 'genrecai.com'],
  wordmark: 'GENREC',
  role: 'Software and AI studio',
  url: 'https://www.genrecai.com',
  domain: 'genrecai.com',
  description:
    'GenrecAI (GenRec AI) is a software and AI studio in Tamil Nadu, India. We build stunning websites, custom software, AI workflows, AI agents and custom CRMs, and ship our own products: Tabble, LuminaIQ, SelectStar and HailBrowser.',
  email: 'contact@genrecai.com',
  location: 'Tamil Nadu, India',
  foundingDate: '2023',
  socials: [{ label: 'LinkedIn', href: 'https://www.linkedin.com/company/genrecai' }],
};

export const founders = [
  {
    name: 'Shyamnath Sankar',
    role: 'Co-founder',
    focus: 'AI products, agents and retrieval systems',
    url: 'https://shyamnathsankar.genrecai.com/',
    host: 'shyamnathsankar.genrecai.com',
    github: 'https://github.com/Shyamnath-Sankar',
  },
  {
    name: 'Jai Samyukth B U',
    role: 'Co-founder',
    focus: 'Client software, CRMs and product delivery',
    url: 'https://jaisamyukth.genrecai.com/',
    host: 'jaisamyukth.genrecai.com',
  },
];

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

export const services = [
  {
    title: 'Websites that stop the scroll',
    short: 'Websites',
    text: 'Fast, beautiful marketing sites and launch pages with motion, real copy and the SEO done properly from day one.',
  },
  {
    title: 'Software development',
    short: 'Software',
    text: 'Web apps, mobile apps, APIs and internal tools, designed and engineered by the same people.',
  },
  {
    title: 'AI workflows',
    short: 'AI workflows',
    text: 'The repetitive work in your business, rebuilt as a pipeline: documents in, decisions and reports out, a person where it matters.',
  },
  {
    title: 'AI agents at work',
    short: 'AI agents',
    text: 'Agents that use your browser, your database and your tools, with every step visible and a stop button in reach.',
  },
  {
    title: 'Custom CRM',
    short: 'Custom CRM',
    text: 'A CRM shaped around how your team already sells, with roles, reports and the spreadsheet finally retired.',
  },
];

export const team: { name: string; role: string; line: string; url?: string; host?: string }[] = [
  {
    name: 'Shyamnath Sankar',
    role: 'Co-founder / AI products',
    line: 'Builds AI products end to end: retrieval, agent graphs, MCP servers and the interfaces on top. Creator of HailBrowser and SelectStar.',
    url: founders[0].url,
    host: founders[0].host,
  },
  {
    name: 'Jai Samyukth B U',
    role: 'Co-founder / Client software',
    line: 'Turns spreadsheets and broken workflows into software people pay for: CRMs, internal tools and Tabble.',
    url: founders[1].url,
    host: founders[1].host,
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
    slug: 'tabble',
    kind: 'product',
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
    slug: 'luminaiq',
    kind: 'product',
    repo: 'https://github.com/Shyamnath-Sankar/LuminaIQ',
    title: 'LuminaIQ',
    wordmark: 'LuminaIQ',
    sector: 'AI / Education',
    year: 2026,
    tagline: 'Read it once. Remember it for the exam.',
    summary:
      'An AI study companion. Upload a textbook or lecture PDF and get cited answers, quizzes, four kinds of notes and flashcards, then reviews timed to your memory.',
    role: 'Product, design, full-stack, AI',
    stack: 'React · TypeScript · Supabase · pgvector · OpenAI · Stripe',
    status: 'Live · 12,000+ learners',
    live: { label: 'Visit LuminaIQ', href: 'https://www.luminaiq.fun' },
    accent: '#1f5136',
    accentRgb: '31, 81, 54',
    accentInk: '#eef7d8',
    cover: {
      src: '/shots/luminaiq-hero.png',
      alt: 'LuminaIQ landing page with the headline Read it once, remember it for the exam, and a forgetting curve chart',
      caption: 'LuminaIQ / landing screen',
      frame: 'browser',
    },
    mobile: '/shots/luminaiq-mobile.png',
    featured: true,
    metrics: [
      { value: '12k+', label: 'active learners' },
      { value: '50k+', label: 'documents studied' },
      { value: '4.9/5', label: 'average rating from 2,000+ students' },
      { value: '<30s', label: 'from upload to the first quiz' },
    ],
    sections: [
      {
        kicker: '01 / The problem',
        title: 'Rereading feels like studying. It is not.',
        body:
          'Most of an evening with a textbook goes on preparation: finding what matters, writing notes, making cards. Then the memory fades in days, because nothing brings it back at the right time. Students do not need another chat box. They need the preparation done and the reviews scheduled.',
        points: [
          'A textbook has a structure. A chat window does not.',
          'Recall, not rereading, is what makes an answer stay.',
          'Without spaced reviews, most of a chapter is gone in a week.',
        ],
      },
      {
        kicker: '02 / The build',
        title: 'One upload, eight tools, one loop.',
        body:
          'Upload a PDF, DOCX or TXT. LuminaIQ extracts, chunks and embeds it, then every tool works from that same layer: chat with your documents, a quiz generator, four kinds of notes, flashcards, visual mind maps, personalised learning paths, spaced repetition and gamified progress. The loop is understand, practise, measure, revise.',
        points: [
          'Every answer cites the page it came from.',
          'Reviews arrive on day 1, day 6, day 15 and further apart each time you remember.',
          'Exam Tonight mode builds a plan for the hours that are left.',
        ],
      },
      {
        kicker: '03 / The interface',
        title: 'Calm enough to open at 11pm.',
        body:
          'Study products tend to look like dashboards. LuminaIQ looks like paper: warm cream, deep green, one lime highlight and a serif that reads like a book. A greeting, a streak and one clear next action open every session. The quiet surface is what lets eight tools feel like one product.',
      },
      {
        kicker: '04 / The result',
        title: 'A study habit, not a cram session.',
        body:
          'More than twelve thousand learners and fifty thousand documents later, the measurable win is time to first quiz, under thirty seconds, and a 4.9 rating from over two thousand students. The behavioural win is return: streaks, spaced reviews and a path that always has a next step.',
      },
    ],
    gallery: [
      {
        src: '/shots/luminaiq-features.png',
        alt: 'LuminaIQ list of eight study tools generated from one upload',
        caption: 'Eight tools / one upload',
        frame: 'browser',
      },
      {
        src: '/shots/luminaiq-loop.png',
        alt: 'LuminaIQ study loop: understand, practise, measure and revise',
        caption: 'The loop / understand, practise, measure, revise',
        frame: 'browser',
      },
      {
        src: '/shots/luminaiq-app.png',
        alt: 'LuminaIQ app home with a greeting, a study streak and a get-started checklist',
        caption: 'Inside the app / a streak and one next step',
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
      'LuminaIQ ships as a complete study system, not a feature demo. A student can go from a file they have never opened to a scored quiz in under a minute, and the product brings each topic back just before it would be forgotten.',
  },
  {
    slug: 'selectstar',
    kind: 'open-source',
    repo: 'https://github.com/Shyamnath-Sankar/SelectStar',
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
    slug: 'hailbrowser',
    kind: 'open-source',
    repo: 'https://github.com/Shyamnath-Sankar/project-hailbrowser',
    title: 'HailBrowser',
    wordmark: 'HailBrowser',
    sector: 'AI / Browser agent',
    year: 2026,
    tagline: 'Your own browser agent.',
    summary:
      'An open-source browser agent in your own Chrome. Ask in plain English, or plug the same signed-in browser into Claude Code, Cursor or Codex over MCP.',
    role: 'Product, extension engineering, agent design, MCP',
    stack: 'Chrome extension (MV3) · TypeScript · chrome.debugger · MCP server · Any model, including Ollama',
    status: 'Live · Open source, MIT',
    live: { label: 'Visit HailBrowser', href: 'https://hailbrowser.genrecai.com' },
    accent: '#4d7c0f',
    accentRgb: '77, 124, 15',
    accentInk: '#f7fee7',
    cover: {
      src: '/shots/hailbrowser-hero.png',
      alt: 'HailBrowser landing page with the headline Your own browser agent and the side panel',
      caption: 'HailBrowser / landing screen',
      frame: 'browser',
    },
    mobile: '/shots/hailbrowser-mobile.png',
    featured: true,
    metrics: [
      { value: '26/26', label: 'tasks passed, three full runs in a row' },
      { value: '4.2s', label: 'average per task in Fast mode' },
      { value: '0', label: 'false "done" claims' },
      { value: '18', label: 'browser tools exposed over MCP' },
    ],
    sections: [
      {
        kicker: '01 / The problem',
        title: 'Agents get an empty browser.',
        body:
          'Most browser agents run in a fresh browser somewhere in the cloud. No tabs, no logins, no history. Every real job starts with signing in again, and the agent works out of sight, so when it says it is done there is no way to check.',
        points: [
          'Copying a profile or opening a debug port is a security problem.',
          'A model saying done is not the same as the job being done.',
          'Coding agents need a browser too, and they should share yours.',
        ],
      },
      {
        kicker: '02 / The build',
        title: 'An extension, not a new browser.',
        body:
          'HailBrowser is a Chrome extension. It uses trusted mouse and keyboard input in the browser you are already signed into, with no separate profile and no remote debugging port. One chat does it all: Chat is a full tool-calling agent, Research reads sources in background tabs and cites every claim, Long task splits a job into planned subtasks, and Fast runs one decision per step.',
        points: [
          'Bring any model: Anthropic, OpenAI, Gemini, OpenRouter, Groq, Ollama or LM Studio.',
          'A local MCP server exposes 18 browser tools to Claude Code, Cursor, Codex and OpenCode.',
          'Schedule any goal and get a notification with the result.',
        ],
      },
      {
        kicker: '03 / The interface',
        title: 'Nothing hidden.',
        body:
          'A driven tab gets a coloured border, a cursor that shows where it clicks and a Stop button. Every step is listed in the side panel. When a field rejects a value or a dialog gets in the way, the agent says it is stuck instead of pretending.',
      },
      {
        kicker: '04 / The result',
        title: 'The fastest browser use we could measure.',
        body:
          'On a public 26-task harness, Fast mode passed every task across three full runs at a 4.2 second average, against 7.8 seconds in Chat mode on the same loop, with zero false completions. The method, the per-task times and the model are all written down.',
      },
    ],
    gallery: [
      {
        src: '/shots/hailbrowser-benchmark.png',
        alt: 'HailBrowser benchmark: 26 of 26 tasks at 4.2 seconds each',
        caption: 'The proof / 26 tasks, 4.2 seconds each',
        frame: 'browser',
      },
      {
        src: '/shots/hailbrowser-panel.png',
        alt: 'HailBrowser side panel driving a tab step by step',
        caption: 'Side panel / every step, visible and stoppable',
        frame: 'browser',
      },
      {
        src: '/shots/hailbrowser-modes.png',
        alt: 'HailBrowser side panel for everyone and MCP for developers',
        caption: 'Two ways in / side panel or MCP',
        frame: 'browser',
      },
      {
        src: '/shots/hailbrowser-mobile.png',
        alt: 'HailBrowser site on a phone',
        caption: 'The site, on a phone',
        frame: 'phone',
      },
    ],
    outcome:
      'HailBrowser is free, open source under MIT and works in Chrome, Edge and Brave. Anyone can hand a real, signed-in browser to an agent and watch every step it takes.',
  },
  {
    slug: 'vsb-feedback',
    kind: 'other',
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
    featured: false,
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

export const projectGroups: { kind: ProjectKind; label: string; title: string; note: string }[] = [
  {
    kind: 'product',
    label: 'Products',
    title: 'Our products',
    note: 'Software we build, run and sell ourselves.',
  },
  {
    kind: 'open-source',
    label: 'Open source',
    title: 'Open source',
    note: 'MIT-licensed tools anyone can read, run and fork.',
  },
  {
    kind: 'other',
    label: 'Other work',
    title: 'Other work',
    note: 'Client systems, experiments and spikes.',
  },
];

// Smaller work that does not need a full case study.
export const otherWork = [
  {
    title: 'Mobile Agent',
    sector: 'AI / Android',
    year: 2026,
    text: 'An Android app that runs the ZeroClaw agent on the phone itself and shows its dashboard in the app. A feasibility spike for on-device agents.',
    href: 'https://github.com/Shyamnath-Sankar/Mobile-agent',
    linkLabel: 'Source on GitHub',
  },
];

export const projectsByKind = (kind: ProjectKind) => projects.filter((p) => p.kind === kind);

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
