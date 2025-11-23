import { createPool, sql } from 'slonik';

export let pool: import('slonik').DatabasePool;

export async function initDb() {
    pool = await createPool('postgresql://postgres:secret@localhost:5432/mydb');
}



// Example function (can remove later)
export async function testConnection() {
  const result = await pool.any(sql.unsafe`SELECT 1+1 AS result`);
  console.log(result); // [{ result: 2 }]
}
