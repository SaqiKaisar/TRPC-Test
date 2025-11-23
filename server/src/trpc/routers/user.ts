import { router, publicProcedure } from "../index";
import { z } from "zod";
import { sql } from "slonik";
import { email, object } from "zod/v4";

const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    // add other columns if needed
  });

export const userRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        email: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const name = input.name ?? "Anonymous";
      const email = input.email ?? "Not set";

      // Zod schema for the whole user row
      

      // UPSERT: insert if new, update name if email exists
      const user = await ctx.db.maybeOne(
        sql.type(userSchema)`
          INSERT INTO users(name, email)
          VALUES (
            COALESCE(NULLIF(${name}, ''), 'Anonymous'), 
            ${email}
          )
          ON CONFLICT (email) DO UPDATE SET
            name = COALESCE(NULLIF(${name}, ''), users.name)
        `
      );
      return {
        message: `Successfully submitted`,
      };
    }),
  fetch: publicProcedure.
    input(z.object({email:z.string()})).
    query(async({input, ctx})=>{
        if(input.email){
            const email = input.email
            const user = await ctx.db.maybeOne(sql.type(userSchema)`SELECT id, name, email FROM users WHERE email = ${email}`)

            if(!user){
                return { message: `No user found with email: ${email}`, user: null };
            }
            return{
                message: `User found: Name - ${user.name}  Email - ${user.email}`,
                user
            }

        }else{
            throw new Error("Email is required to fetch user");
        }
        
  })
});
