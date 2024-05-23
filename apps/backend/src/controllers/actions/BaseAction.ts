import { ActionType } from '@shared/types';
import { computeMaxExecutionCredits } from './utils';

export default class BaseAction {
  public type: ActionType;
  public executionCredits: number;
  constructor(newKind: ActionType) {
    this.type = newKind;
    this.executionCredits = computeMaxExecutionCredits();
  }
  public renewExecutionCredits() {
    this.executionCredits = computeMaxExecutionCredits();
  }

  public checkExecutionCredits() {
    if (this.executionCredits > 0) {
      this.executionCredits--;
      return true;
    }
    return false;
  }

  public async execute<T>(_param: T): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
