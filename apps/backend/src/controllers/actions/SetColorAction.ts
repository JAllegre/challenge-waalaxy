import { ActionKind } from '@shared/types';
import { updateAvatarColor } from '../../db/avatar';
import BaseAction from './BaseAction';

export default class SetColorAction extends BaseAction {
  constructor() {
    super(ActionKind.SetColor);
  }

  public async execute<T>(data: T): Promise<boolean> {
    if (this.executionCredits <= 0) {
      return false;
    }
    const { color } = data as { color: string };
    updateAvatarColor(color);
    this.executionCredits--;
    return true;
  }
}
