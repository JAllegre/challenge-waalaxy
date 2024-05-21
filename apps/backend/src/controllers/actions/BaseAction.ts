import { ActionKind } from '../../types';

export default class BaseAction {
  public kind: ActionKind;
  public executionCredits: number;
  constructor(newKind: ActionKind, newExecutionCredits: number) {
    this.executionCredits = newExecutionCredits;
    this.kind = newKind;
  }
  public getExecutionCredits() {
    return this.executionCredits;
  }
  public getData() {
    throw new Error('Method not implemented.');
  }
}
