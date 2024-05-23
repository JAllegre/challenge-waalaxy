import { Avatar } from '@shared/types';
import { AVATAR_TABLE } from '../utils/constants';
import { getDb } from './connector';

export async function updateAvatarColor(color: string): Promise<void> {
  const db = await getDb();
  await db.run(`UPDATE ${AVATAR_TABLE} SET color=?`, [color]);
}

export async function updateAvatarSize(size: number): Promise<void> {
  const db = await getDb();
  await db.run(`UPDATE ${AVATAR_TABLE} SET size=?`, [size]);
}

export async function selectAvatar(): Promise<Avatar | undefined> {
  const db = await getDb();
  return db.get(`SELECT * FROM  ${AVATAR_TABLE}`);
}
