import { createClient } from "@/utils/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url);
    const id = requestUrl.searchParams.get("id");
    const supabase = createClient();

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: "An unexpected error occurred", details: error },
        { status: 500 },
      );
    }

    return NextResponse.json(data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "An unexpected error occurred", details: err },
      { status: 500 },
    );
  }
}
