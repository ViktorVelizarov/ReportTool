/** A block of generated text that the author reviews: approve it, edit it or remove it. */

import { h, keepFocus, replaceChildren } from '../dom.js';
import { approveBlock, editBlock, removeBlock } from '../state.js';
import { icon } from './icons.js';

const MIN_EDIT_ROWS = 3;
const MAX_EDIT_ROWS = 10;
const CHARS_PER_ROW = 80;

/**
 * The view of one block (id) of the generated text. update(ai) shows what the state holds for it, and only redraws
 * when the block changed. A block that is being edited is left alone for as long as it exists.
 */
export function createBlockView(store, id, title) {
  const element = h('div', { class: 'ai-block', 'data-row': id, hidden: true });
  let shown = null;
  let editing = false;

  const label = () => [
    h('span', { class: 'ai-tag' }, icon('creation', 13), 'AI'),
    h('span', { class: 'ai-title' }, title),
  ];

  function action(text, iconName, name, onclick, showText = false) {
    return h('button', {
      type: 'button',
      class: 'btn btn-sm ghost',
      title: text,
      'aria-label': showText ? undefined : text,
      'data-action': name,
      'data-focus': `${id}:${name}`,
      onclick,
    }, icon(iconName, 14), showText && text);
  }

  function draw(block) {
    element.hidden = false;
    element.dataset.state = block.state;
    replaceChildren(element,
      h('div', { class: 'ai-block-head' },
        label(),
        h('span', { class: `status-tag ${block.state}` }, block.state === 'draft' ? 'Draft' : 'Approved'),
        h('div', { class: 'ai-block-actions' },
          block.state === 'draft'
            && action('Approve', 'check', 'approve', () => store.update(s => approveBlock(s, id)), true),
          action('Edit', 'pencil', 'edit', startEdit),
          action('Remove', 'delete', 'remove', () => store.update(s => removeBlock(s, id)))),
      ),
      h('p', { class: 'ai-text' }, block.text));
  }

  function drawLoading() {
    element.hidden = false;
    element.dataset.state = 'loading';
    replaceChildren(element,
      h('div', { class: 'ai-block-head' }, label(), h('span', { class: 'status-tag loading' }, 'Writing…')),
      h('div', { class: 'skeleton line' }),
      h('div', { class: 'skeleton line short' }));
  }

  function startEdit() {
    editing = true;
    const area = h('textarea', {
      class: 'ai-edit',
      rows: Math.min(MAX_EDIT_ROWS, Math.max(MIN_EDIT_ROWS, Math.ceil(shown.text.length / CHARS_PER_ROW))),
      'aria-label': `Edit: ${title}`,
      onkeydown: event => {
        if (event.key === 'Escape') {
          event.stopPropagation();
          cancel();
        } else if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
          save();
        }
      },
    });
    area.value = shown.text;

    function save() {
      const text = area.value.trim();
      editing = false;
      store.update(s => (text ? approveBlock(editBlock(s, id, text), id) : removeBlock(s, id)));
    }

    function cancel() {
      editing = false;
      draw(shown);
      element.querySelector('[data-action="edit"]').focus();
    }

    replaceChildren(element,
      h('div', { class: 'ai-block-head' }, label(), h('span', { class: 'status-tag draft' }, 'Editing')),
      area,
      h('div', { class: 'ai-edit-actions' },
        h('button', { type: 'button', class: 'btn btn-sm primary', onclick: save }, 'Save and approve'),
        h('button', { type: 'button', class: 'btn btn-sm', onclick: cancel }, 'Cancel')));
    area.focus();
  }

  return {
    element,
    update(ai) {
      const block = ai?.status === 'ready' ? ai.blocks[id] : undefined;
      if (editing) {
        if (block) return;
        editing = false; // the text was discarded or replaced while it was being edited
      }
      if (ai?.status === 'loading') {
        shown = null;
        drawLoading();
      } else if (!block) {
        shown = null;
        element.hidden = true;
        delete element.dataset.state;
      } else if (block !== shown) {
        shown = block;
        keepFocus(element, () => draw(block));
      }
    },
  };
}
