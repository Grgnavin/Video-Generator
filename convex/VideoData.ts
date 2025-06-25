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
        credits: v.number()
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
            status: "pending"
        });
        
        await ctx.db.patch(args.uid, {
            credits: args.credits - 1
        })
        return res;
    }
})

export const updateVideoRecord = mutation({
    args: {
        recordId: v.id("videoData"),
        audioUrl: v.string(),
        images: v.any(),
        captionJson: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args.recordId, {
            audioUrl: args.audioUrl,
            captionJson: args.captionJson,
            images: args.images,
            status: "completed"
        });
        return result;
    }
})