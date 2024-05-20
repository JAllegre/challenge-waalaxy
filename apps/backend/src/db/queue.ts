import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { DB_FILENAME, TABLE_FRUIT_CREDIT, TABLE_FRUIT_QUEUE } from '../utils/constants';

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
    `CREATE TABLE IF NOT EXISTS ${TABLE_FRUIT_QUEUE} ( id INTEGER PRIMARY KEY, type INTEGER , credit INTEGER )`
  );

  await db?.exec(
    `CREATE TABLE IF NOT EXISTS ${TABLE_FRUIT_CREDIT} ( id INTEGER PRIMARY KEY, type INTEGER , max_credit INTEGER)`
  );
  // Ensure mode is no more CREATE
  await db?.close();
  db = undefined;
  return openDB();
}

export async function getDb() {
  return openDB();
}

export async function insertFruitToQueue(){

    (await getDb()).run(
        `INSERT INTO ${TABLE_FRUIT_QUEUE} ()  VALUES ()`,
        {}
      );
}

export async function removeFruitFromQueue(){

    (await getDb()).run(
        `DELETE FROM table
        WHERE search_condition;`,
        {}
      );
}