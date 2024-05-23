import { ActionType } from '@shared/types';
import {
  addActionToQueue,
  getActionQueue,
  removeQueueAction,
} from '../db/actionQueue';
import { selectAvatar } from '../db/avatar';
import { emitToAllSockets } from '../socketServer';
import SetColorAction from './actions/SetColorAction';
import SetSizeAction from './actions/SetSizeAction';

export const actionTypes = {
  [ActionType.SetColor]: new SetColorAction(),
  [ActionType.SetSize]: new SetSizeAction(),
};

export async function refreshClientQueue() {
  const actionItems = await getActionQueue();
  await emitToAllSockets('wsc-actions', actionItems);
}

export async function refreshClientAvatar() {
  const avatar = await selectAvatar();
  await emitToAllSockets('wsc-avatar', avatar);
}

export async function refreshClientCredits() {
  const remainingCredits = {};
  Object.values(actionTypes).forEach((actionType) => {
    remainingCredits[actionType.type] = actionType.executionCredits;
  });
  emitToAllSockets('wsc-credits', remainingCredits);
}

export function renewAllExecutionCredits() {
  Object.values(actionTypes).forEach((actionType) => {
    actionType.renewExecutionCredits();
  });
}

export async function addSetColorAction(color: string) {
  await addActionToQueue(ActionType.SetColor, { color });
  await refreshClientQueue();
  console.log(`Setting color to ${color}`);
}

export async function addSetSizeAction(size: number) {
  addActionToQueue(ActionType.SetSize, { size });
  await refreshClientQueue();
  console.log(`Setting size to ${size}`);
}

export async function executeNextAction() {
  try {
    const actions = await getActionQueue();

    // Find the next action type that can be executed depending on the remaining credits
    const foundActionType = actions.find((action) => {
      const actionType = actionTypes[action.type];
      if (actionType.checkExecutionCredits()) {
        return true;
      }

      return false;
    });

    if (!foundActionType) {
      return;
    }
    await actionTypes[foundActionType.type].execute(
      JSON.parse(foundActionType.data)
    );

    await removeQueueAction(foundActionType.id);
    await refreshClientQueue();
    await refreshClientAvatar();
    await refreshClientCredits();
  } catch (error) {
    console.error('executionManager.ts', 'Error executing action: ', error);
  }
}
