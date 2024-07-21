import { createClient } from "@/utils/server";
import { generateRandomNumber } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

/**
 * Handles the POST request for saving components to the database.
 * @param req - The NextRequest object containing the request data.
 * @returns A NextResponse object with the response data.
 */
export async function POST(req: NextRequest) {
  try {
    const { components, title, description } = await req.json();

    const supabase = createClient();
    const auth = await supabase.auth.getUser();

    const data = {
      user_id: auth.data.user?.id,
      content: components,
      created_at: new Date(),
      title: title,
      description: description,
    };

    const {
      error,
      statusText,
      status,
      data: res,
    } = await supabase.from("files").insert(data).select("*");
    console.log(res);

    if (error) {
      throw new Error("An error occurred while saving the components" + error);
    }

    return NextResponse.json({
      response: "Components saved successfully",
      pathname: path.join("/code", res[0].id),
      statusText: statusText,
      status: status,
    });
  } catch (error) {
    return NextResponse.json({
      response: "An unknown error occurred",
      error: error,
      status: 500,
    });
  }
}
