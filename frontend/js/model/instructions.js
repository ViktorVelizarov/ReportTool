/**
 * What the author tells the AI before it writes: what the report shows, and what to look out for in its results. The
 * two answers go into the prompt (prompt.js).
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

export const newInstructions = () => ({ subject: '', focus: '' });

/** Whether every question is answered; the AI is not asked before. */
export const instructionsComplete = ({ subject, focus }) => Boolean(subject.trim() && focus.trim());
