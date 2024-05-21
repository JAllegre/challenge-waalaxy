import { ActionKind } from '../../types';
import BaseAction from './BaseAction';
import { computeMaxExecutionCredits } from './utils';

const executionCreditsForSetSizeAction = computeMaxExecutionCredits();

export default class SetSizeAction extends BaseAction {
  private size: number;
  constructor(newSize: number) {
    super(ActionKind.SetSize, executionCreditsForSetSizeAction);
    this.size = newSize;
  }
  public getData() {
    return { size: this.size };
  }
}
