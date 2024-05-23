import { ActionKind } from '@shared/types';
import { computeMaxExecutionCredits } from './utils';

export default class BaseAction {
  public kind: ActionKind;
  public executionCredits: number;
  constructor(newKind: ActionKind) {
    this.kind = newKind;
    this.executionCredits = computeMaxExecutionCredits();
  }
  public refreshExecutionCredits() {
    this.executionCredits = computeMaxExecutionCredits();
  }

  public checkExecutionCredits() {
    if (this.executionCredits > 0) {
      this.executionCredits--;
      return true;
    }
    return false;
  }

  public async execute<T>(_param: T): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
