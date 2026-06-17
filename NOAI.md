# DESIGN RULES — READ BEFORE ANY FRONTEND WORK

These are hard constraints. Apply them before writing a single line of CSS or HTML.

---

## SPACING

- Never cram elements together. Every section needs breathing room.
- Use `padding` and `margin` generously. If it looks tight, double the padding.
- Whitespace is a design element, not wasted space.

---

## TYPOGRAPHY

- Max 2 fonts: one for headings/claims, one for body/reading.
- Never use Inter, Roboto, Arial, or system fonts.
- Pick fonts with character. Check the project's existing font choices first.
- For this project: match the existing typography already in use across components.

---

## BORDERS, SHADOWS, CORNERS

- Do not put borders everywhere. Use borders with intention and restraint.
- Do not scatter box-shadows on every card. One well-placed shadow beats ten generic ones.
- Rounded corners should be subtle. Avoid the default browser/Tailwind pill aesthetic.
- Sharp or near-sharp edges often look more premium than heavily rounded ones.

---

## COLORS

- Commit to a cohesive palette. Use CSS variables for all colors.
- One dominant color, one sharp accent. Timid evenly-distributed palettes feel corporate and lifeless.
- Avoid purple-gradient-on-white. Avoid teal-on-white. Avoid the standard SaaS palette.
- Draw from the project's existing color system first.
- For this project: `--yellow-color: #FAD02C`, `--dark-blue-color: #19304B`.

---

## MOTION

- Prioritize CSS-only animations for static HTML/Astro.
- Use the Motion library for React when available.
- One orchestrated page load with staggered reveals creates more delight than ten scattered micro-interactions.
- High-impact moments: entrance animations, not constant fidgeting.
- For this project: anime.js 3.x with IntersectionObserver and `sessionStorage.getItem('isRestoring')` delay.

---

## BACKGROUNDS

- Never default to flat solid colors if avoidable.
- Layer CSS gradients, geometric patterns, or contextual atmospheric effects.
- Background should have depth and match the overall aesthetic.

---

## THE AI SLOP PROBLEM

You converge toward generic "on distribution" outputs. This is the enemy.

Signs you are producing AI slop:
- The design looks like it could be any SaaS landing page.
- You used Space Grotesk, Inter, or Poppins again.
- Every card has the same border-radius and box-shadow.
- The layout is header → hero → features grid → CTA → footer. Nothing surprising.
- Purple gradients appear anywhere.

Counteraction:
- Ask: does this feel designed for THIS project specifically, or could it be copy-pasted into a hundred others?
- Make unexpected layout, font, or color choices that still serve the content.
- Vary between light and dark themes across different pages/components.
- Avoid repeating the same font or visual motif across generations.

---

## DO NOT

- Use emojis anywhere in UI output.
- Add decorative borders on every element.
- Stack shadows on shadows.
- Use more than 2 font families.
- Use Inter, Roboto, Arial, system-ui, or Space Grotesk.
- Ship purple gradients.
- Build the same predictable grid layout every time.
