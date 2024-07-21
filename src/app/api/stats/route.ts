import { createClient } from "@/utils/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const reqURL = new URL(request.url);
    let data = {};

    // Initialize Supabase client
    const supabase = createClient();

    /**
     * Fetch total number of users
     */
    const { data: totalUsers, error: e1 } = await supabase
      .from("profiles")
      .select("id", { count: "exact" });

    /**
     * Fetch total number of content
     */
    const { data: totalContent, error: e2 } = await supabase
      .from("files")
      .select("id", { count: "exact" });

    if (e1 || e2) {
      return NextResponse.json(
        { error: "An error occurred while fetching data", details: e1 || e2 },
        { status: 500 },
      );
    }

    data = {
      totalUsers: totalUsers.length,
      totalContent: totalContent.length,
    };

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
