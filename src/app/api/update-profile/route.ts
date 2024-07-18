// pages/api/saveComponents.ts

import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { Tables } from "../../../../types/supabase";

export async function POST(req: NextRequest) {
  try {
    const { user }: { user: Tables<"profiles"> } = await req.json();
    const supabase = createClient();

    const { error: e } = await supabase
      .from("profiles")
      .update(user)
      .eq("id", user.id);

    if (e) throw e;

    return NextResponse.json({ response: "success", status: 200 });
  } catch (error) {
    return NextResponse.json({
      response: "An unknown error occurred",
      error: error,
      status: 500,
    });
  }
}
