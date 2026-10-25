# GenRec AI: design system and concept

## Concept card

```
Idea:        A software studio is a structure under load, so the site is a live load test.
Metaphor:    A structural test rig: a beam, hangers, a needle, a deflection readout.
Signature:   The beam under the hero. It bends under the pointer, loads on press, and
             settles back. The headline sits above it and moves with it. The readout
             reports the same input (load, deflection, input device).
Emotion:     Precise, physical, quietly confident. A workshop, not a pitch deck.
Motion verb: settle under load. Weight goes on, the structure answers, then it returns.
Screenshot:  The wide headline over a sagging hairline with a red needle at the load point.
```

The concept survives the footer (the giant wordmark carries a red needle), the case pages
(each project is a specimen with load cases), the work index (the rows are a test log), and
the 404 (a snapped beam).

## Art direction

**Palette** (roles, not hues)

| Role | Value | Use |
|---|---|---|
| ground | `#ECEAE3` | paper, main field |
| ink | `#14171A` | text, rules, fills |
| muted | `#565B5D` | secondary text (5.9:1 on ground) |
| line | `rgba(20 23 26 / 0.16)` | hairlines |
| accent | `#E23A1F` | needle, focus ring, load state, large marks only |
| panel | `#171A1C` | the approach stage, footer, covers |
| panel ink | `#ECEAE3` | text on panel |
| panel muted | `#A9ABA6` | secondary text on panel |

Red is a signal, not a brand wash: it marks a load, a focus ring, a live state. It is never
small body text on paper (3.6:1).

**Type**

- Display: **Panchang** 500/600/700. Wide, architectural caps. Headlines are uppercase at
  -0.025em tracking, leading 0.82. Used for h1, h2, the footer wordmark, cover titles.
- Text: **General Sans** 400/500/600. Body, navigation, buttons, captions that are not data.
- Instrument: **Martian Mono** 300/400. Live readouts, years, project counters. Nothing else.
- Body 17 to 18 px, leading 1.55, measure 34 to 60 characters.

**Grid and rhythm**

12 columns, outer margin equals the gutter. Text hangs from columns 1, 5 and 9. Section
rhythm changes per section: hero is full viewport, work is tight, approach is a tall sticky
pair, studio is airy, contact and footer are the dark finale.

**Shape**

Radius 0 everywhere. The only circle is the load needle (a component, not a container).
Hairlines are 1 px. The CTA is a rectangle with a 1 px ink border that floods with ink from
the pointer.

**Motion language**

- Entrances use `expo.out`, 1.1 to 1.3 s, line masks.
- Presses and page transitions use `expo.inOut`, 0.55 to 0.9 s: a press closes on the page.
- Hovers are 0.25 to 0.5 s. All primary targets answer with weight or tension, never with a
  color swap alone.
- One idle input: the beam breathes by a few units on the GSAP ticker and the LIVE dot pulses.
  Paused off screen, zero under reduced motion.

**Signature implementation**

`src/components/LoadBeam.tsx` owns one state object (`load`, `point`, `pressed`) and fans it
out to the SVG curve, the needle, the headline offset and the readout. The curve is two
cubics that meet at the load point. Values are honest: they measure the interaction, not the
company. Under reduced motion the beam shows a fixed sag and the readout reads STATIC.

**Composition plan**

```
HOME
  hero        poster: meta row / BUILT TO HOLD. / beam / lede + CTA / readout
  work        index list: 3 full-width rows, pointer preview on desktop, thumbnails on phone
  approach    asymmetric pair: sticky dark stage left, 3 chapters right
  studio      statement: large line left, copy + link right
  footer      finale: contact, links, giant GENREC

WORK        index list + intro
CASE        16:9 specimen, title + meta, context, idea, load cases, craft, outcome, next
STUDIO      statement, capabilities table, team table, what we need
404         snapped beam, NO LOAD.
```

## Genericness test

A generic model given "award winning website for a software studio" would produce a dark
gradient hero, three equal service cards, and a purple-blue AI glow. This site has a paper
ground, a single physical instrument as the hero, no cards, no gradients, and a palette drawn
from a test rig. The one risky default is the near-black panel plus red signal, so red is kept
to needles and states and the light ground carries most of the site.

## Content assumptions and placeholders

- The three case studies (Northwind, Semaphore, Relay) are invented, `placeholder: true` in
  `src/data/site.ts`. No metrics, logos, awards or real clients are claimed.
- `hello@genrecai.com` is a placeholder inbox.
- Team names and roles come from public profiles and need confirmation.
- Studio location is Tamil Nadu, India.
- Copy is new. None of it is taken from the previous site.

## QA decisions

- No WebGL. The signature is SVG and DOM so a mid-range phone holds 60 fps.
- The approach stage is the only dark block before the footer; it marks the chapter change.
- Reduced motion: beam static, no line masks, no Lenis, no idle. All content visible.
- Native cursor kept. No follower; the index preview is the pointer craft.
