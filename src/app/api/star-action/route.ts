// pages/api/saveComponents.ts

import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      contentId,
      starredBy,
      userId,
      action,
    }: {
      starredBy: string[];
      userId: string;
      action: "Add" | "Remove";
      contentId: string;
    } = await req.json();
    const supabase = createClient();
    if (action === "Add") {
      starredBy.push(userId);
    } else if (action === "Remove") {
      starredBy.splice(starredBy.indexOf(userId), 1);
    }
    const { error: e } = await supabase
      .from("files")
      .update({ starred_by: starredBy })
      .eq("id", contentId);

    if (e) {
      throw e;
    } else {
      return NextResponse.json(
        {
          response: "success",
        },
        {
          status: 200,
        },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { response: "An unknown error occurred", error: error },
      { status: 500 },
    );
  }
}
