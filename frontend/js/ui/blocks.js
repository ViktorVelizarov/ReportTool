/** A block of generated text that the author reviews: approve it, edit it or remove it. */

import { h, keepFocus, replaceChildren } from '../dom.js';
import '../kit/inputs.js';
import { approveBlock, editBlock, removeBlock } from '../state.js';
import { icon } from './icons.js';

/**
 * The view of one block (id) of the generated text: a card with the title of the block as a heading of the level
 * titleLevel, badges for the state of the text, the text, and the buttons that review it. update(ai) shows what the
 * state holds for it, and only redraws when the block changed. A block that is being edited is left alone for as long
 * as it exists.
 */
export function createBlockView(store, id, title, titleLevel = 2) {
  const aiTag = h('or-vaadin-badge', { theme: 'neutral small' }, icon('creation', 14, 'icon'), 'AI');
  const badges = h('div', { slot: 'header-suffix', class: 'ai-badges' });
  const content = h('div');
  const actions = h('div', { slot: 'footer', class: 'ai-actions' });
  const element = h('vaadin-card', {
    class: 'ai-block',
    theme: 'outlined',
    'card-title': title,
    'title-heading-level': titleLevel,
    'data-row': id,
    hidden: true,
  }, badges, content);
  let shown = null;
  let editing = false;

  function button(text, iconName, name, theme, onclick) {
    return h('or-vaadin-button', { theme, 'data-action': name, 'data-focus': `${id}:${name}`, onclick },
      iconName && icon(iconName, 16, 'prefix'), text);
  }

  /**
   * Shows the card in a state: the badges at the right of the title, the content, and the buttons below. The AI tag
   * marks text that is not approved yet. A card without buttons has no footer, so that no empty space is left.
   */
  function show(state, { badge, body, buttons = [] }) {
    element.hidden = false;
    element.dataset.state = state;
    replaceChildren(badges, state !== 'approved' && aiTag, badge);
    replaceChildren(content, body);
    replaceChildren(actions, buttons);
    if (buttons.length) element.append(actions);
    else actions.remove();
  }

  const stateBadge = (theme, text, iconName) =>
    h('or-vaadin-badge', { theme: `${theme} small` }, iconName && icon(iconName, 14, 'icon'), text);

  function draw(block) {
    const draft = block.state === 'draft';
    show(block.state, {
      badge: draft ? stateBadge('warning', 'Draft') : stateBadge('success', 'Approved', 'check'),
      body: h('p', { class: 'ai-text' }, block.text),
      buttons: [
        draft && button('Approve', 'check', 'approve', 'small', () => store.update(s => approveBlock(s, id))),
        button('Edit', 'pencil', 'edit', 'tertiary small', startEdit),
        button('Remove', 'delete', 'remove', 'tertiary error small', () => store.update(s => removeBlock(s, id))),
      ],
    });
  }

  function drawLoading() {
    show('loading', {
      body: [
        h('p', { class: 'ai-loading-label' }, 'Writing…'),
        h('vaadin-progress-bar', { indeterminate: true, 'aria-label': `Writing: ${title}` }),
      ],
    });
  }

  function startEdit() {
    editing = true;
    const area = h('or-vaadin-text-area', {
      class: 'ai-edit',
      'accessible-name': `Edit: ${title}`,
      'data-focus': `${id}:text`,
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
      keepFocus(element, () => draw(shown), '[data-action="edit"]');
    }

    show(shown.state, {
      badge: stateBadge('warning', 'Editing'),
      body: area,
      buttons: [
        button('Save and approve', null, 'save', 'primary small', save),
        button('Cancel', null, 'cancel', 'tertiary small', cancel),
      ],
    });
    area.updateComplete.then(() => area.focus());
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
