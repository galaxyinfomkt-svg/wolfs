/* ═══════════════════════════════════════════════════════
   META HELPERS — hard caps + build-time assertion
   Title ≤ 60 chars, description ≤ 158 chars.
   assertMeta() runs inside generateMetadata (build time for
   static params), so an over-length string fails the build.
   ═══════════════════════════════════════════════════════ */

import { BUSINESS } from "./business";

export const TITLE_MAX = 60;
export const DESC_MAX = 158;

const BRAND = "Wolf's Siding";

/** Fail the build loudly if a generated title/description blows the cap. */
export function assertMeta(title: string, description: string, ctx: string) {
  if (title.length > TITLE_MAX) {
    throw new Error(
      `[meta] Title exceeds ${TITLE_MAX} chars (${title.length}) on ${ctx}: "${title}"`
    );
  }
  if (description.length > DESC_MAX) {
    throw new Error(
      `[meta] Description exceeds ${DESC_MAX} chars (${description.length}) on ${ctx}: "${description}"`
    );
  }
}

/**
 * Build a title that fits the cap. If "{lead} in {place}, MA | {BRAND}" is too
 * long, the place (city) is truncated first — never the brand or the service.
 */
export function cappedTitle(lead: string, place: string): string {
  const suffix = `, MA | ${BRAND}`;
  let title = `${lead} in ${place}${suffix}`;
  if (title.length <= TITLE_MAX) return title;
  // Truncate the place to make room.
  const room = TITLE_MAX - (`${lead} in ${suffix}`.length);
  const clippedPlace = place.slice(0, Math.max(0, room)).trimEnd();
  title = `${lead} in ${clippedPlace}${suffix}`;
  return title.slice(0, TITLE_MAX);
}

/** Clamp a description to the cap on a word boundary, keeping the phone at the end. */
export function cappedDescription(body: string): string {
  const phone = BUSINESS.phone;
  const withPhone = body.includes(phone) ? body : `${body} ${phone}`;
  if (withPhone.length <= DESC_MAX) return withPhone;
  // Trim the body (not the phone) back to a word boundary, then re-append phone.
  const tail = ` ${phone}`;
  const room = DESC_MAX - tail.length;
  let head = body.slice(0, room);
  const lastSpace = head.lastIndexOf(" ");
  if (lastSpace > 40) head = head.slice(0, lastSpace);
  head = head.replace(/[\s,.;:—-]+$/, "");
  return `${head}.${tail}`.slice(0, DESC_MAX);
}
