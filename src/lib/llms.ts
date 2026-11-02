import { founders, otherWork, projectGroups, projects, projectsByKind, services, site, team } from '@/data/site';

// Plain-text summaries for AI assistants and answer engines (llmstxt.org). Built from the same
// content file as the pages, so they never drift from what the site says.

const updated = '2026-11-02';
const url = (path: string) => `${site.url}${path}`;

const identity = [
  `# ${site.name}`,
  '',
  `> ${site.description}`,
  '',
  `${site.name} (also written GenRec AI or Genrec AI) is the company at ${site.domain}. It was founded in ${site.foundingDate} by ${founders
    .map((f) => f.name)
    .join(' and ')} and is based in ${site.location}, working worldwide.`,
  '',
  '## Founders',
  '',
  ...founders.map((f) => `- [${f.name}](${f.url}): ${f.role} of ${site.name}. ${f.focus}.`),
  '',
  '## Services',
  '',
  ...services.map((s) => `- ${s.title}: ${s.text}`),
];

const contact = [
  '## Contact',
  '',
  `- Email: ${site.email}`,
  `- Website: ${site.url}`,
  ...site.socials.map((s) => `- ${s.label}: ${s.href}`),
  `- Location: ${site.location}, working worldwide`,
];

export function llmsTxt() {
  const groups = projectGroups.flatMap((group) => {
    const items = projectsByKind(group.kind).map(
      (p) => `- [${p.title}](${url(`/work/${p.slug}`)}): ${p.summary}${p.live ? ` Live at ${p.live.href}.` : ''}`,
    );
    const extra =
      group.kind === 'other' ? otherWork.map((w) => `- [${w.title}](${w.href}): ${w.text}`) : [];
    if (!items.length && !extra.length) return [];
    return [`## ${group.title}`, '', ...items, ...extra, ''];
  });

  return [
    ...identity,
    '',
    ...groups,
    '## Pages',
    '',
    `- [Home](${url('/')}): Services, products, open source and the studio.`,
    `- [Work](${url('/work')}): Products, open source and other work, with case studies.`,
    `- [Studio](${url('/studio')}): The founders, the team and how a build runs.`,
    `- [Full context](${url('/llms-full.txt')}): Every case study in plain text.`,
    '',
    ...contact,
    '',
    `Last updated: ${updated}`,
    '',
  ].join('\n');
}

export function llmsFullTxt() {
  const cases = projects.flatMap((p) => [
    `## ${p.title}`,
    '',
    `URL: ${url(`/work/${p.slug}`)}`,
    `Type: ${projectGroups.find((g) => g.kind === p.kind)?.label}`,
    `Sector: ${p.sector}`,
    `Year: ${p.year}`,
    `Status: ${p.status}`,
    ...(p.live ? [`Live product: ${p.live.href}`] : []),
    ...(p.repo ? [`Source: ${p.repo}`] : []),
    `Stack: ${p.stack}`,
    '',
    `${p.tagline} ${p.summary}`,
    '',
    `Key numbers: ${p.metrics.map((m) => `${m.value} ${m.label}`).join('; ')}.`,
    '',
    ...p.sections.flatMap((s) => [
      `### ${s.title}`,
      '',
      s.body,
      ...(s.points ? ['', ...s.points.map((pt) => `- ${pt}`)] : []),
      '',
    ]),
    `Outcome: ${p.outcome}`,
    '',
  ]);

  return [
    ...identity,
    '',
    '## Team',
    '',
    ...team.map((t) => `- ${t.name}, ${t.role}: ${t.line}${t.url ? ` Personal site: ${t.url}` : ''}`),
    '',
    ...cases,
    '## Other work',
    '',
    ...otherWork.map((w) => `- ${w.title} (${w.sector}, ${w.year}): ${w.text} ${w.href}`),
    '',
    ...contact,
    '',
    '## Technical notes',
    '',
    `- Canonical host: ${site.url}`,
    `- Sitemap: ${url('/sitemap.xml')}`,
    '- All page content is server-rendered. AI crawlers are allowed in robots.txt.',
    '',
    `Last updated: ${updated}`,
    '',
  ].join('\n');
}
