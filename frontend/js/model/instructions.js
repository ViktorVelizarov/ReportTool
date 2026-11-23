/**
 * What the author tells the AI before it writes: what the report shows, what to look out for in its results, and which
 * figures the AI is given besides those that the widgets show. The answers and the switches go into the prompt
 * (prompt.js), and are saved with the report.
 */

/** The longest an answer can be. */
export const MAX_LENGTH = 1000;

/** The questions, in the order they are asked. The id is the key of the answer in the instructions. */
export const QUESTIONS = [
  {
    id: 'subject',
    label: 'What does this report show?',
    hint: 'Describe the page as you would to someone who has not seen it.',
    placeholder: 'e.g. A weekly overview of the main assets: their load per day and their current status.',
  },
  {
    id: 'focus',
    label: 'What should the AI look out for?',
    hint: 'Say what matters when the results are summarised: limits, comparisons, anything to flag.',
    placeholder: 'e.g. Flag values outside the normal range and sudden drops. Compare with the previous period.',
  },
];

/**
 * The switches for what the AI is given besides what the widgets show, in the order they are shown. The id is the key
 * of the switch in the instructions. Both are on unless the author turns them off.
 */
export const SWITCHES = [
  {
    id: 'beyondWidgets',
    label: 'Add insights beyond the widgets',
    hint: 'Rises and drops, the trend, the highest and lowest hours and days, unusual values and gaps of each '
      + 'attribute, also of the attributes that gauges and images show.',
  },
  {
    id: 'previousPeriod',
    label: 'Compare with the previous period',
    hint: 'The same figures for the time just before, as long as the time frame.',
  },
];

const answer = value => (typeof value === 'string' ? value.trim() : '');

/**
 * The instructions in value, as the report keeps them: the answers without the spaces around them, and each switch on
 * unless it is off. What value lacks, for example in a report that was saved before there were switches, is filled in.
 */
export const instructionsOf = value => ({
  subject: answer(value?.subject),
  focus: answer(value?.focus),
  ...Object.fromEntries(SWITCHES.map(({ id }) => [id, value?.[id] !== false])),
});

export const newInstructions = () => instructionsOf(null);

/** Whether every question is answered; the AI is not asked before. */
export const instructionsComplete = ({ subject, focus }) => Boolean(subject.trim() && focus.trim());
