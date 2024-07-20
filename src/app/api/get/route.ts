import { createClient } from "@/utils/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const reqURL = new URL(request.url);
    const count = reqURL.searchParams.get("count") as number | null;
    const page = reqURL.searchParams.get("page") as number | null;
    const table = reqURL.searchParams.get("table") as string | null;
    const columns = reqURL.searchParams.get("columns") as string | null;
    const sort = reqURL.searchParams.get("sort") as string | null;
    const order = reqURL.searchParams.get("order") as string | null;
    const eq = reqURL.searchParams.get("eq") as string | null;

    // Initialize Supabase client
    const supabase = createClient();

    if (eq && table === "profiles" && columns) {
      const { data, error } = await supabase
        .from(table)
        .select(columns)
        .eq("id", eq);
      if (error) {
        return NextResponse.json(
          { error: "An error occurred while fetching data", details: error },
          { status: 500 },
        );
      }
      if (!data || data.length === 0)
        return NextResponse.json({ error: "No data found" }, { status: 404 });

      return NextResponse.json(data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (count && page && table === "files" && columns && sort && order) {
      // Fetch data from Supabase
      const { data, error } = await supabase
        .from(table)
        .select(columns)
        .order(order, { ascending: sort === "asc" })
        .range((page - 1) * count, page * count - 1);

      // Handle potential errors from Supabase
      if (error) {
        return NextResponse.json(
          { error: "An error occurred while fetching data", details: error },
          { status: 500 },
        );
      }

      // Handle case where no data is found
      if (!data || data.length === 0)
        return NextResponse.json({ error: "No data found" }, { status: 404 });

      // Respond with fetched data
      return NextResponse.json(data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (err) {
    return NextResponse.json(
      { error: "An unexpected error occurred", details: err },
      { status: 500 },
    );
  }
}
