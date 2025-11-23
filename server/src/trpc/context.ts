import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

// The context gives every request shared data.
// For example:
// authenticated user
// database connection
// API keys
// config
// You will expand this as the project grows.

export const createContext = ({req,res}:CreateExpressContextOptions) => {
    return {}
}
 
export type Context = ReturnType<typeof createContext>