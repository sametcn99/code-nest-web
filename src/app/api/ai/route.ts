import { generateText } from "@/lib/ai";
import { createClient } from "@/lib/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const content = await request.json();
    const supabase = createClient();
    const auth = await supabase.auth.getUser();
    if (auth.data.user === null) {
      return NextResponse.json(
        { response: "You must be logged in to access this route." },
        { status: 401 },
      );
    }

    const response = await generateText(JSON.stringify(content));
    const responseData = { response };
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 400 },
    );
  }
}
