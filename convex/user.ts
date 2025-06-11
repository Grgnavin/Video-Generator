import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createNewUser = mutation({
    args:{
        name: v.string(),
        email: v.string(),
        pictureUrl: v.string(),
    },
    handler: async (ctx, args) => {
        //check if the user a;ready exists
        const user = await ctx.db.query("users")
                .filter((q) => q.eq(q.field("email"), args.email))
                .collect();
        if(!user.length) {
            const userData = {
                name: args.name,
                email: args.email,
                pictureUrl: args.pictureUrl,
                credits: 5
            }
            //if not add user
            await ctx.db.insert("users", userData)
            return userData;
        }
        return user[0];
    }
});