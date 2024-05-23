import { ActionKind } from '@shared/types';
import SetColorAction from './SetColorAction';
import SetSizeAction from './SetSizeAction';

export const actionKinds = {
  [ActionKind.SetColor]: new SetColorAction(),
  [ActionKind.SetSize]: new SetSizeAction(),
};

export function refreshExecutionCredits() {
  Object.values(actionKinds).forEach((action) =>
    action.refreshExecutionCredits()
  );
}
