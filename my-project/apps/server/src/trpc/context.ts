import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import {pool} from "../db/index"

// The context gives every request shared data.
// For example:
// authenticated user
// database connection
// API keys
// config
// You will expand this as the project grows.

export const createContext = ({req,res}:CreateExpressContextOptions) => {
    if(!pool) throw new Error('Database not initialized')
    return {
        req,
        res,
        db: pool,
    }
}
 
export type Context = ReturnType<typeof createContext>