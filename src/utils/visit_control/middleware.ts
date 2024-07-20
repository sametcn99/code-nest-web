import { createClient } from "@/utils/server";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

/**
 * The shape of the visit data object stored in the cookie.
 */
type VisitData = {
  ip: string;
  visit_count: number;
  first_visit: Date;
  last_visit: Date;
};

/**
 * The maximum number of visits allowed per day.
 */
const MAX_VISITS_PER_DAY = 5;

/**
 * Middleware function that handles visit tracking for each request.
 * @param request - The NextRequest object representing the incoming request.
 * @returns A NextResponse object representing the response to the request.
 */
export async function visitMiddleware(request: NextRequest) {
  try {
    const ipAddress = request.headers.get("x-forwarded-for") || request.ip;
    const visitResponse = NextResponse.next();
    if (!ipAddress) return visitResponse;


     // do some validation
    const supabase = createClient();
    const { data: user } = await supabase.auth.getUser();
    if (user.user === null) {
      const cookieStore = cookies().getAll();

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

      cookieStore.push({
        name: "visit_data",
        value: JSON.stringify(visitData),
      });
      cookieStore.forEach((cookie) => {
        visitResponse.cookies.set(cookie);
      });
      return visitResponse;
    }
  } catch (error) {
    console.error("Error in visitMiddleware:", error);
    return NextResponse.next();
  }
}