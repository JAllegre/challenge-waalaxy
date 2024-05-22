import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';
import {
  ACTION_KIND_TABLE,
  ACTION_QUEUE_TABLE,
  AVATAR_TABLE,
  DB_FILENAME,
} from '../utils/constants';

let db: Database | undefined = undefined;

async function openDB(create?: boolean): Promise<Database> {
  if (!db) {
    let mode = sqlite3.OPEN_READWRITE;
    if (create) {
      mode |= sqlite3.OPEN_CREATE;
    }

    db = await open({
      filename: DB_FILENAME,
      driver: sqlite3.Database,
      mode,
    });
  }
  return db;
}

/**
 * create DB and table if not exist , otherwise open it
 */
export async function initDB(): Promise<Database> {
  await openDB(true);
  if (!db) {
    throw new Error('Unable to open the DB');
  }

  await db?.exec(
    `CREATE TABLE IF NOT EXISTS ${ACTION_QUEUE_TABLE} ( id INTEGER PRIMARY KEY, kind INTEGER , data JSON )`
  );

  await db?.exec(
    `CREATE TABLE IF NOT EXISTS ${ACTION_KIND_TABLE} ( kind INTEGER PRIMARY KEY, remainingCredits INTEGER )`
  );

  await db?.exec(
    `INSERT OR REPLACE INTO ${ACTION_KIND_TABLE} (kind,remainingCredits) VALUES (1,0), (2,0) `
  );

  await db?.exec(
    `CREATE TABLE IF NOT EXISTS ${AVATAR_TABLE} ( id INTEGER PRIMARY KEY, color TEXT , size INTEGER )`
  );

  await db?.exec(
    `INSERT OR REPLACE INTO ${AVATAR_TABLE} (color,size) VALUES ('',0)`
  );
  // Ensure mode is no more CREATE
  await db?.close();
  db = undefined;
  return openDB();
}

export async function getDb() {
  if (db) {
    return db;
  }
  return openDB();
}
