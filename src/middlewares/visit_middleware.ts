import { createClient } from "@/utils/server";
import { NextResponse, type NextRequest } from "next/server";

type VisitData = {
  ip: string;
  visit_count: number;
  first_visit: Date;
  last_visit: Date;
};

const MAX_VISITS_PER_DAY = 5;

export async function visitMiddleware(request: NextRequest) {
  try {
    const ipAddress = request.headers.get("x-forwarded-for") || request.ip;
    const visitResponse = NextResponse.next();
    if (!ipAddress) return visitResponse;

    const supabase = createClient();
    const { data: user } = await supabase.auth.getUser();
    if (user.user !== null) return visitResponse;

    const visitDataCookie = request.cookies.get("visit_data")?.value;
    let visitData: VisitData = visitDataCookie
      ? JSON.parse(visitDataCookie)
      : null;

    const now = new Date();
    const resetVisitData = (ip: string): VisitData => ({
      ip,
      visit_count: 1,
      first_visit: now,
      last_visit: now,
    });

    if (visitData) {
      const firstVisitDate = new Date(visitData.first_visit);

      const isSameDay = (date1: Date, date2: Date): boolean =>
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();

      if (visitData.ip === ipAddress && isSameDay(firstVisitDate, now)) {
        visitData.visit_count += 1;
        visitData.last_visit = now;

        if (visitData.visit_count > MAX_VISITS_PER_DAY) {
          const url = request.nextUrl.clone();
          if (url.searchParams.get("error") === "rate_limit_exceeded")
            return visitResponse;
          url.searchParams.set("error", "rate_limit_exceeded");
          return NextResponse.redirect(url);
        }
      } else {
        visitData = resetVisitData(ipAddress);
      }
    } else {
      visitData = resetVisitData(ipAddress);
    }

    visitResponse.cookies.set({
      maxAge: 60 * 60 * 24,
      priority: "high",
      expires: new Date(now.getTime() + 60 * 60 * 24 * 1000),
      secure: true,
      sameSite: "strict",
      name: "visit_data",
      value: JSON.stringify(visitData),
    });
    return visitResponse;
  } catch (error) {
    console.error("Error in visitMiddleware:", error);
    return NextResponse.next();
  }
}
