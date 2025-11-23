import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './trpc/routers/_app';
import { initDb, testConnection, pool } from './db/index'; // make sure to export pool
import {initUserTable} from "./db/initUserTable"

async function main() {
  const app = express()
  const PORT = 4000

  // Enable CORS for frontend
  app.use(cors())

  // Initialize DB
  await initDb()
  await testConnection()
  await initUserTable()

  // tRPC middleware
  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext: () => ({ db: pool, req: {} as any, res: {} as any }), // simplified
    })
  )

  // Start server
  app.listen(PORT, () => {
    console.log(`tRPC server running at http://localhost:${PORT}`);
  })
}

// Call the async function and catch errors
main().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
