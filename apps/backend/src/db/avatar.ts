import { AVATAR_TABLE } from '../utils/constants';
import { getDb } from './connector';

export async function updateAvatarColor(color: string): Promise<void> {
  const db = await getDb();
  await db.run(`UPDATE ${AVATAR_TABLE} SET color=?`, [color]);
}

export async function updateAvatarSize(size: number): Promise<void> {
  await (await getDb()).run(`UPDATE ${AVATAR_TABLE} SET size=?`, [size]);
}

export async function selectAvatar(): Promise<void> {
  return (await getDb()).get(`SELECT * FROM  ${AVATAR_TABLE}`);
}
