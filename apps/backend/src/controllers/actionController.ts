import { selectAvatar } from '../db/avatar';
import {
  addActionToQueue,
  getActionQueue,
  getFirstQueueAction,
  removeQueueAction,
} from '../db/queue';
import { getSocketServer } from '../socketServer';
import { ActionKind } from '../types';
import { actionKinds } from './actions/actionKinds';

async function refreshClientQueue() {
  const rows = await getActionQueue();
  (await getSocketServer().fetchSockets()).forEach((socket) => {
    socket.emit('actions', rows);
  });
}

async function refreshClientAvatar() {
  const row = await selectAvatar();
  (await getSocketServer().fetchSockets()).forEach((socket) => {
    socket.emit('avatar', row);
  });
}

export default {
  setColor: async (color: string) => {
    await addActionToQueue(ActionKind.SetColor, { color });
    await refreshClientQueue();
    console.log(`Setting color to ${color}`);
  },
  setSize: async (size: number) => {
    addActionToQueue(ActionKind.SetSize, { size });
    await refreshClientQueue();
    console.log(`Setting size to ${size}`);
  },
  executeNextAction: async () => {
    try {
      const action = await getFirstQueueAction();
      if (!action) {
        return;
      }
      actionKinds[action.kind].execute(JSON.parse(action.data));
      await removeQueueAction(action.id);
      await refreshClientQueue();
      await refreshClientAvatar();
    } catch (error) {
      console.error('executionManager.ts', 'Error executing action: ', error);
    }
  },
};
