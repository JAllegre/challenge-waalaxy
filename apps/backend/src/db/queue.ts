import { ActionKind } from '../types';
import { ACTION_QUEUE_TABLE } from '../utils/constants';
import { getDb } from './connector';

interface ActionQueueRow {
  id: number;
  kind: string;
  remainingCredits: number;
  data: string;
}

export async function addActionToQueue(
  kind: ActionKind,
  data: object
): Promise<void> {
  const db = await getDb();
  await db.run(
    `INSERT INTO ${ACTION_QUEUE_TABLE} (kind, data)  VALUES (?,json(?))`,
    [kind, JSON.stringify(data)]
  );
}

export async function getActionQueue(): Promise<ActionQueueRow[]> {
  const db = await getDb();
  const rows = await db.all(`SELECT * FROM  ${ACTION_QUEUE_TABLE}`);
  return rows;
}

export async function removeQueueAction(actionId: number): Promise<void> {
  const db = await getDb();
  await db.all(`DELETE FROM ${ACTION_QUEUE_TABLE} WHERE id = ${actionId}`);
}

export async function getFirstQueueAction(): Promise<
  ActionQueueRow | undefined
> {
  const db = await getDb();
  const row = await db.get(
    `SELECT * FROM  ${ACTION_QUEUE_TABLE} ORDER BY id ASC LIMIT 1`
  );
  return row;
}
