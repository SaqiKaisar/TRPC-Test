import { pool } from './index';
import {sql} from "slonik"

export async function initUserTable() {
  await pool.query(sql.unsafe`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
}
