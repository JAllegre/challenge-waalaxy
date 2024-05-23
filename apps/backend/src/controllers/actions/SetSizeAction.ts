import { ActionType } from '@shared/types';
import { updateAvatarSize } from '../../db/avatar';
import BaseAction from './BaseAction';

export default class SetSizeAction extends BaseAction {
  constructor() {
    super(ActionType.SetSize);
  }

  public async execute<T>(data: T): Promise<void> {
    const { size } = data as { size: number };
    updateAvatarSize(size);
  }
}
