/**
 * The pages of a printed report: how much of a page the report may use, and where the parts of the report go so that a
 * page break never cuts one of them in two.
 */

const PX_PER_MM = 96 / 25.4;

/** A pixel of a box is the pixel of the browser; two edges that touch can differ by a fraction of it. */
const EDGE_PX = 0.5;

/** The area of a page that the report may use, in CSS pixels: A4 landscape without the margins that @page sets. */
export const PAGE_WIDTH_PX = (297 - 2 * 10) * PX_PER_MM;
export const PAGE_HEIGHT_PX = (210 - 2 * 10) * PX_PER_MM;

/**
 * The widths in pixels that a report can be laid out in for a PDF. It is printed scaled to the width of the page, and a
 * browser prints at most at twice the size.
 */
export const MIN_LAYOUT_WIDTH_PX = Math.ceil(PAGE_WIDTH_PX / 2);
export const MAX_LAYOUT_WIDTH_PX = 4000;

const isAbove = (upper, lower) =>
  upper.bottom <= lower.top + EDGE_PX && upper.left < lower.right - EDGE_PX && upper.right > lower.left + EDGE_PX;

/**
 * Moves the parts of a report down so that no page break cuts one. A box is the place of a part (the cover, a block of
 * text, a widget), { top, bottom, left, right } in pixels, from the top of the report, which is the top of a page. A
 * part that would cross the bottom of its page, or come within bottomMargin of it, goes to the top of the next page,
 * and so does every part below it; a part never goes to an earlier page than the one before it in reading order (from
 * top to bottom, from left to right), so the report reads in the order it was built. A part taller than a page cannot
 * be kept whole: it starts on a page of its own.
 *
 * Returns how far each box moves down.
 */
export function placeOnPages(boxes, pageHeight, bottomMargin = 0) {
  const room = pageHeight - bottomMargin;
  const pageOf = y => Math.floor((y + EDGE_PX) / pageHeight);
  const fits = (top, height) => {
    const page = pageOf(top);
    const onTopOfPage = top - page * pageHeight < EDGE_PX;
    return top + height <= (page + 1) * pageHeight - bottomMargin + EDGE_PX || (height > room && onTopOfPage);
  };

  const shifts = new Array(boxes.length).fill(0);
  const placed = [];
  let page = 0;
  const inReadingOrder = boxes.map((_, index) => index)
    .sort((a, b) => boxes[a].top - boxes[b].top || boxes[a].left - boxes[b].left);

  for (const index of inReadingOrder) {
    const box = boxes[index];
    // a part below one that has moved moves at least as far, so that the columns stay in order
    const moved = Math.max(0, ...placed.filter(other => isAbove(boxes[other], box)).map(other => shifts[other]));
    let top = Math.max(box.top + moved, page * pageHeight);
    while (!fits(top, box.bottom - box.top)) top = (pageOf(top) + 1) * pageHeight;
    top = Math.max(top, pageOf(top) * pageHeight);
    page = pageOf(top);
    shifts[index] = top - box.top;
    placed.push(index);
  }
  return shifts;
}

/**
 * The boxes with room for something that comes after all of them, such as the line at the end of a report: the lowest
 * boxes are taller by the space, so that what follows them lands on the page that they are on if there is room.
 */
export function reserveAtEnd(boxes, space) {
  const lowest = Math.max(...boxes.map(box => box.bottom));
  return boxes.map(box => (box.bottom >= lowest - EDGE_PX ? { ...box, bottom: box.bottom + space } : box));
}

/** The indexes of the boxes that a page break cuts: those that start on one page and end on another. */
export function cutBoxes(boxes, pageHeight) {
  return boxes.flatMap((box, index) =>
    (Math.floor((box.bottom - EDGE_PX) / pageHeight) > Math.floor((box.top + EDGE_PX) / pageHeight) ? [index] : []));
}
