import { addActionToQueue } from '../db/queue';
import SetColorAction from './actions/SetColorAction';
import SetSizeAction from './actions/SetSizeAction';

export default {
  setColor: (color: string) => {
    addActionToQueue(new SetColorAction(color));
    console.log(`Setting color to ${color}`);
  },
  setSize: (size: number) => {
    addActionToQueue(new SetSizeAction(size));
    console.log(`Setting size to ${size}`);
  },
};
