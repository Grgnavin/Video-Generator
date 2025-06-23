import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        pictureUrl: v.string(),
        credits: v.number(), 
    }),
    videoData: defineTable({
        title: v.string(),
        topic: v.string(),
        script: v.string(),
        videoStyle: v.string(),
        voice: v.string(),
        caption: v.any(),
        captionJson: v.optional(v.string()),
        audioUrl: v.optional(v.string()),
        images: v.optional(v.any()),
        uid: v.id("users"),
        createdBy: v.string(),
    })
})