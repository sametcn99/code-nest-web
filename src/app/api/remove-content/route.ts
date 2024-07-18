// pages/api/saveComponents.ts

import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { content_id }: { content_id: string } = await req.json();
    const supabase = createClient();

    const { error: e } = await supabase
      .from("files")
      .delete()
      .eq("content_id", content_id);

    if (e) throw new Error(`Error removing content: ${e}`);

    if (e) {
      throw e;
    } else {
      return NextResponse.json({
        response: "success",
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { response: "An unknown error occurred", error: error, status: 500 },
    );
  }
}
