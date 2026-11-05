import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  cutBoxes, MAX_LAYOUT_WIDTH_PX, MIN_LAYOUT_WIDTH_PX, PAGE_HEIGHT_PX, PAGE_WIDTH_PX, placeOnPages, reserveAtEnd,
} from '../js/model/pages.js';

const PAGE = 100;

/** The place of a part: where its left and top edges are, and how wide and tall it is. */
const box = (left, top, width, height) => ({ left, top, right: left + width, bottom: top + height });

test('the report may use the area of an A4 landscape page inside its margins of 10 mm', () => {
  assert.equal(Math.round(PAGE_WIDTH_PX), 1047);
  assert.equal(Math.round(PAGE_HEIGHT_PX), 718);
});

test('a layout can be at most twice as small as the page, which is as far as a browser scales', () => {
  assert.equal(MIN_LAYOUT_WIDTH_PX, 524);
  assert.ok(PAGE_WIDTH_PX / MIN_LAYOUT_WIDTH_PX <= 2);
  assert.ok(MAX_LAYOUT_WIDTH_PX > MIN_LAYOUT_WIDTH_PX);
});

test('parts that fit on their pages stay where they are', () => {
  const boxes = [box(0, 0, 50, 40), box(50, 0, 50, 40), box(0, 40, 100, 50)];

  assert.deepEqual(placeOnPages(boxes, PAGE), [0, 0, 0]);
});

test('a part that would cross a page break goes to the next page, and the parts below it go with it', () => {
  const boxes = [box(0, 0, 100, 60), box(0, 60, 100, 60), box(0, 120, 100, 30)];

  assert.deepEqual(placeOnPages(boxes, PAGE), [0, 40, 40]);
});

test('a part that fits stays on its page, also when the part beside it has to move', () => {
  const boxes = [box(0, 0, 50, 60), box(50, 0, 50, 60), box(0, 60, 50, 30), box(50, 60, 50, 60)];

  assert.deepEqual(placeOnPages(boxes, PAGE), [0, 0, 0, 40]);
});

test('only the parts below the one that moves move with it', () => {
  const boxes = [
    box(0, 0, 50, 90), // left column
    box(0, 90, 50, 60), // crosses the break: goes to the next page
    box(0, 150, 50, 30), // below it: moves with it
    box(50, 0, 50, 50), // right column
    box(50, 50, 50, 50),
    box(50, 140, 50, 30), // not below the part that moves
  ];

  assert.deepEqual(placeOnPages(boxes, PAGE), [0, 10, 10, 0, 0, 0]);
});

test('a part never goes to an earlier page than the one before it in reading order', () => {
  const boxes = [
    box(0, 0, 100, 30),
    box(0, 30, 50, 90), // read first, and has to go to the next page
    box(50, 40, 50, 30), // would fit on the first page, but it is read after the part that moved
  ];

  assert.deepEqual(placeOnPages(boxes, PAGE), [0, 70, 60]);
});

test('the parts are placed in reading order, whatever the order they are given in', () => {
  const boxes = [box(0, 120, 100, 30), box(0, 0, 100, 60), box(0, 60, 100, 60)];

  assert.deepEqual(placeOnPages(boxes, PAGE), [40, 0, 40]);
});

test('a block of text as wide as the report goes to the next page with everything that follows it', () => {
  const cover = box(0, 0, 100, 40);
  const text = box(0, 56, 100, 30);
  const widgets = [box(0, 150, 50, 40), box(50, 150, 50, 20)];

  assert.deepEqual(placeOnPages([cover, text, box(0, 100, 100, 40), ...widgets], PAGE), [0, 0, 0, 0, 0]);
  assert.deepEqual(placeOnPages([cover, text, box(0, 90, 100, 50), ...widgets], PAGE), [0, 0, 10, 10, 10]);
});

test('a part taller than a page cannot be kept whole, and starts on a page of its own', () => {
  const boxes = [box(0, 0, 100, 30), box(0, 30, 100, 150), box(0, 180, 100, 20)];

  assert.deepEqual(placeOnPages(boxes, PAGE), [0, 70, 70]);
  assert.deepEqual(placeOnPages([box(0, 0, 100, 150)], PAGE), [0]);
});

test('a part keeps the bottom margin of the page free', () => {
  const boxes = [box(0, 0, 100, 50), box(0, 50, 100, 45)];

  assert.deepEqual(placeOnPages(boxes, PAGE), [0, 0]);
  assert.deepEqual(placeOnPages(boxes, PAGE, 10), [0, 50]);
});

test('a part a hair above a page break starts on the next page', () => {
  const [, shift] = placeOnPages([box(0, 0, 100, 99.8), box(0, 99.8, 100, 50)], PAGE);

  assert.ok(Math.abs(shift - 0.2) < 1e-9, `${shift}`);
});

test('a report without parts has nothing to move', () => {
  assert.deepEqual(placeOnPages([], PAGE), []);
});

test('room for what follows the report is kept in the lowest parts only', () => {
  const boxes = [box(0, 0, 50, 70), box(50, 0, 50, 40), box(50, 40, 50, 30)];

  assert.deepEqual(reserveAtEnd(boxes, 20), [box(0, 0, 50, 90), box(50, 0, 50, 40), box(50, 40, 50, 50)]);
  assert.deepEqual(placeOnPages(reserveAtEnd(boxes, 20), PAGE), [0, 0, 0]);
  // without the room, the line at the end would be alone on a page: the part above it goes with it
  const column = [box(0, 0, 100, 30), box(0, 30, 100, 60)];
  assert.deepEqual(placeOnPages(column, PAGE), [0, 0]);
  assert.deepEqual(placeOnPages(reserveAtEnd(column, 20), PAGE), [0, 70]);
});

test('the parts that a page break cuts are found', () => {
  const boxes = [box(0, 0, 100, 100), box(0, 100, 100, 40), box(0, 140, 100, 70), box(0, 230, 100, 20)];

  assert.deepEqual(cutBoxes(boxes, PAGE), [2]);
  assert.deepEqual(cutBoxes([box(0, 99.8, 100, 50), box(0, 50, 100, 50.2)], PAGE), [], 'edges within half a pixel');
  assert.deepEqual(cutBoxes([], PAGE), []);
});
