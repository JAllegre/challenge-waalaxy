import { ActionType } from '@shared/types';
import SetColorAction from './SetColorAction';
import SetSizeAction from './SetSizeAction';

export const actionTypes = {
  [ActionType.SetColor]: new SetColorAction(),
  [ActionType.SetSize]: new SetSizeAction(),
};

export function refreshExecutionCredits() {
  Object.values(actionTypes).forEach((action) =>
    action.refreshExecutionCredits()
  );
}
