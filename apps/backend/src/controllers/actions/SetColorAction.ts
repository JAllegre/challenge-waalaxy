import { ActionKind } from '../../types';
import BaseAction from './BaseAction';
import { computeMaxExecutionCredits } from './utils';

const executionCreditsForSetColorAction = computeMaxExecutionCredits();

export default class SetColorAction extends BaseAction {
  private color: string;
  constructor(newColor: string) {
    super(ActionKind.SetColor, executionCreditsForSetColorAction);
    this.color = newColor;
  }
  public getData() {
    return { color: this.color };
  }
}
