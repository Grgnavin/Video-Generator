import { generateScript } from "@/configs/AIModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const { topic } = await req.json();
    const result = await generateScript(topic);
    return NextResponse.json(result);
}