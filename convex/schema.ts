import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        pictureUrl: v.string(),
        credits: v.number(), 
        lastSessionId: v.optional(v.string()),
        pendingCredits: v.optional(v.number()),
    }),
    videoData: defineTable({
        title: v.string(),
        topic: v.string(),
        script: v.string(),
        videoStyle: v.string(),
        caption: v.any(),
        voice: v.string(),
        images: v.optional(v.any()),
        audioUrl: v.optional(v.string()),
        captionJson: v.optional(v.string()),
        uid: v.id("users"),
        createdBy: v.string(),
        status: v.optional(v.string()),
    })
})