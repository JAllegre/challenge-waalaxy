import { updateAvatarSize } from '../../db/avatar';
import { ActionKind } from '../../types';
import BaseAction from './BaseAction';

export default class SetSizeAction extends BaseAction {
  constructor() {
    super(ActionKind.SetSize);
  }

  public async execute<T>(data: T): Promise<boolean> {
    if (this.executionCredits <= 0) {
      return false;
    }
    const { size } = data as { size: number };
    updateAvatarSize(size);
    this.executionCredits--;
    return true;
  }
}
