/**
 * The top of the page, after the header of an asset in OpenRemote's manager: the name of the report and what it is
 * about, and the buttons that save it and switch between editing and previewing it.
 */

import { ReportContext } from '../data/report-context.js';
import { h, onChange, replaceChildren } from '../dom.js';
import '../kit/inputs.js';
import { saveReport, setEditMode, setName } from '../state.js';
import { icon } from './icons.js';
import { showToast } from './toast.js';

const UNTITLED = 'Untitled report';
const PROTOTYPE_NOTE = 'The generated text, the exports, the schedules and the saved reports are still mock';

/** Saves the report under its name, which replaces a saved report with the same name. */
export function saveCurrent(store) {
  if (!store.get().template.widgets.length) return;
  const before = store.get().saved.length;
  store.update(saveReport);
  const state = store.get();
  const name = state.name.trim() || UNTITLED;
  showToast(`${state.saved.length > before ? 'Saved' : 'Updated'} “${name}”`, { tone: 'success' });
}

export function mountHeader(root, store) {
  const name = h('or-vaadin-text-field', {
    label: 'Report name',
    maxlength: 80,
    placeholder: UNTITLED,
    oninput: event => store.update(state => setName(state, event.target.value)),
  });
  const title = h('h1', { class: 'page-name' });
  const saveButton = h('or-vaadin-button', { onclick: () => saveCurrent(store) }, 'Save');
  const modeButton = h('or-vaadin-button', {
    onclick: () => store.update(state => setEditMode(state, !state.editMode)),
  });
  const realm = ReportContext.realm;

  replaceChildren(root,
    h('div', { class: 'page-id' },
      icon('file-document-outline', 28),
      h('div', { class: 'page-name-block' },
        name,
        title,
        h('div', { class: 'page-meta' },
          realm && h('span', null, `Realm: ${realm}`),
          h('or-vaadin-badge', { theme: 'neutral small', title: PROTOTYPE_NOTE }, 'Prototype')))),
    h('div', { class: 'page-buttons' }, saveButton, modeButton));

  const drawButtons = onChange(state => `${state.editMode}|${state.template.widgets.length === 0}`, state => {
    const editing = state.editMode;
    root.dataset.mode = editing ? 'edit' : 'preview';
    name.hidden = !editing;
    title.hidden = editing;
    saveButton.disabled = state.template.widgets.length === 0;
    saveButton.setAttribute('theme', editing ? 'primary' : '');
    modeButton.setAttribute('theme', editing ? 'primary contrast' : 'primary');
    replaceChildren(modeButton, icon(editing ? 'eye-outline' : 'pencil', 18, 'prefix'), editing ? 'Preview' : 'Edit');
  });

  function render(state) {
    if (name.value !== state.name) name.value = state.name;
    title.textContent = state.name.trim() || UNTITLED;
    drawButtons(state);
  }

  render(store.get());
  store.subscribe(render);
}
