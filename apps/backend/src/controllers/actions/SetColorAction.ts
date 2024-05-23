import { ActionType } from '@shared/types';
import { updateAvatarColor } from '../../db/avatar';
import BaseAction from './BaseAction';

export default class SetColorAction extends BaseAction {
  constructor() {
    super(ActionType.SetColor);
  }

  public async execute<T>(data: T): Promise<void> {
    const { color } = data as { color: string };
    updateAvatarColor(color);
  }
}
