import { publicProcedure, router } from "../index"
import {z} from "zod"

export const userRouter = router({
    hello: publicProcedure.
        input(z.object({name: z.string().optional()})).
            query(({input})=>{
                console.log(`Hey ${input.name}`)
                return {
                    message: `Hello ${input.name ?? "Anonymopus"} from tRPC!`,
                }
            })
})