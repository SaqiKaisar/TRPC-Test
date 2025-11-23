import express from "express"
import cors from "cors"
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import { appRouter } from "./trpc/routers/_app"
import { createContext } from "./trpc/context"


const app = express()
app.use(cors())
app.use(express.json())

app.use(
    "/trpc",
    createExpressMiddleware({
        router: appRouter,
        createContext,
    })
)

const PORT = 4000
app.listen(PORT,()=>{
    console.log(`tRPC server running at https://localhost:${PORT}`)
})

export type AppRouter = typeof appRouter