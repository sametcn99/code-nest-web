// pages/api/saveComponents.ts

import { createClient } from "@/utils/supabase/server";
import { generateRandomNumber } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { components, title, description } = await req.json();

    const supabase = createClient();
    const auth = await supabase.auth.getUser();

    const data = {
      user_id: auth.data.user?.id,
      content: components,
      created_at: new Date(),
      content_id: generateRandomNumber(8),
      title: title,
      description: description,
    };

    const { error, statusText, status } = await supabase
      .from("files")
      .insert(data);

    if (error) {
      throw new Error("An error occurred while saving the components" + error);
    }

    return NextResponse.json({
      response: "Components saved successfully",
      statusText: statusText,
      status: status,
    });
  } catch (error) {
    return NextResponse.json(
      { response: "An unknown error occurred", error: error },
      { status: 500 },
    );
  }
}
