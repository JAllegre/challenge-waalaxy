import BaseAction from '../controllers/actions/BaseAction';
import { ACTION_QUEUE_TABLE } from '../utils/constants';
import { getDb } from './connector';

export async function addActionToQueue(action: BaseAction) {
  const db = await getDb();
  db.run(
    `INSERT INTO ${ACTION_QUEUE_TABLE} (kind,remainingCredits, data)  VALUES (?,?, json(?))`,
    [action.kind, action.executionCredits, JSON.stringify(action.getData())]
  );
}
