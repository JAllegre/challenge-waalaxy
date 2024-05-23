import { MAX_EXECUTION_CREDITS } from '../../utils/constants';
import { computeMaxExecutionCredits } from './utils';

describe('computeMaxExecutionCredits', () => {
  it('should return a number between 80% and 100% of MAX_EXECUTION_CREDITS', () => {
    Array(20).forEach(() => {
      const result = computeMaxExecutionCredits();
      expect(result).toBeGreaterThanOrEqual(MAX_EXECUTION_CREDITS * 0.8);
      expect(result).toBeLessThanOrEqual(MAX_EXECUTION_CREDITS);
    });
  });
});
