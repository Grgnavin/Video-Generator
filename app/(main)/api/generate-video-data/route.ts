import { inngest } from "@/inngest/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const formData = await req.json();
    const res = await inngest.send({
        name: "generate-video-data",
        data: {
            ...formData
        }
    })
    return NextResponse.json({
        result: res
    })
}