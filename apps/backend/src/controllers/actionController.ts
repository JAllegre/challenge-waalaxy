import { ActionItem, ActionType, Avatar } from '@shared/types';
import {
  addActionToQueue,
  getActionQueue,
  getFirstQueueAction,
  removeQueueAction,
} from '../db/actionQueue';
import { selectAvatar } from '../db/avatar';
import { getSocketServer } from '../socketServer';
import { actionTypes } from './actions/actionTypes';

async function emitToAllSockets(message: string, data?: ActionItem[] | Avatar) {
  (await getSocketServer().fetchSockets()).forEach((socket) => {
    if (data && message) {
      socket.emit(message, data);
    }
  });
}

export async function refreshClientQueue() {
  const actionItems = await getActionQueue();
  await emitToAllSockets('wsc-actions', actionItems);
}

export async function refreshClientAvatar() {
  const avatar = await selectAvatar();
  await emitToAllSockets('wsc-avatar', avatar);
}

export default {
  setColor: async (color: string) => {
    await addActionToQueue(ActionType.SetColor, { color });
    await refreshClientQueue();
    console.log(`Setting color to ${color}`);
  },
  setSize: async (size: number) => {
    addActionToQueue(ActionType.SetSize, { size });
    await refreshClientQueue();
    console.log(`Setting size to ${size}`);
  },
  executeNextAction: async () => {
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
  },
};
