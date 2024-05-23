import { ActionKind } from '@shared/types';
import { updateAvatarColor } from '../../db/avatar';
import BaseAction from './BaseAction';

export default class SetColorAction extends BaseAction {
  constructor() {
    super(ActionKind.SetColor);
  }

  public async execute<T>(data: T): Promise<boolean> {
    if (this.checkExecutionCredits()) {
      const { color } = data as { color: string };
      updateAvatarColor(color);
      return true;
    }
    return false;
  }
}
