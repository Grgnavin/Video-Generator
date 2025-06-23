import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createVideoData = mutation({
    args: {
        title: v.string(),
        topic: v.string(),
        script: v.string(),
        videoStyle: v.string(),
        voice: v.string(),
        caption: v.any(),
        createdBy: v.string(),
        uid: v.id("users"),
    },
    handler: async (ctx, args) => {
        const res = await ctx.db.insert("videoData", {
            title: args.title,
            topic: args.topic,
            script: args.script,
            videoStyle: args.videoStyle,
            voice: args.voice,
            caption: args.caption,
            createdBy: args.createdBy,
            uid: args.uid,
        });
        return res;
    }
})