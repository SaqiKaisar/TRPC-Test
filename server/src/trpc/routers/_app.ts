import {router} from "../index.ts"
import { userRouter } from "./user.ts"

export const appRouter = router({
    user: userRouter,
})