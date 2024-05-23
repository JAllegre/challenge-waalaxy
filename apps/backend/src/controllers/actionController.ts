import { ActionType } from '@shared/types';
import {
  addActionToQueue,
  getActionQueue,
  getFirstQueueAction,
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

export function refreshAllExecutionCredits() {
  Object.values(actionTypes).forEach((action) =>
    action.refreshExecutionCredits()
  );
}

export async function refreshClientQueue() {
  const actionItems = await getActionQueue();
  await emitToAllSockets('wsc-actions', actionItems);
}

export async function refreshClientAvatar() {
  const avatar = await selectAvatar();
  await emitToAllSockets('wsc-avatar', avatar);
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
    const action = await getFirstQueueAction();
    if (!action) {
      return;
    }
    const isExecuted = await actionTypes[action.type].execute(
      JSON.parse(action.data)
    );
    if (isExecuted) {
      await removeQueueAction(action.id);
    }
    await refreshClientQueue();
    await refreshClientAvatar();
  } catch (error) {
    console.error('executionManager.ts', 'Error executing action: ', error);
  }
}
