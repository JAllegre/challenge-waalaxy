import { MAX_EXECUTION_CREDITS } from '../../utils/constants';

// compute the max execution credits for this action as a random number between 80% and 100% of the MAX_EXECUTION_CREDITS
export function computeMaxExecutionCredits() {
  return Math.round(
    Math.random() * (MAX_EXECUTION_CREDITS - MAX_EXECUTION_CREDITS * 0.8) +
      MAX_EXECUTION_CREDITS * 0.8
  );
}
