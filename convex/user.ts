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

export const markPendingCredits = mutation({
  args: {
    email: v.string(),
    sessionId: v.string(),
    pendingCredits: v.number(),
  },
  handler: async (ctx, { email, sessionId, pendingCredits }) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .first();

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, {
      lastSessionId: sessionId,
      pendingCredits,
    });
  },
});

export const grantCredits = mutation({
  args: {
    email: v.string(),
    credits: v.number(),
  },
  handler: async (ctx, { email, credits }) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .first();

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, {
      credits: user.credits + credits,
    });
  },
});





