// pages/api/saveComponents.ts

import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles the POST request for follow/unfollow action.
 * @param req - The NextRequest object containing the request details.
 * @returns A NextResponse object with the response data.
 */
export async function POST(req: NextRequest) {
  try {
    const { user, viewerId, action } = await req.json();
    const supabase = createClient();
    let followingList: string[] = user.followings ?? [];
    let followersList: string[] = user.followers ?? [];
    if (action === "Follow") {
      followingList.push(user.id);
      followersList.push(viewerId);
      const { error } = await supabase
        .from("profiles")
        .update({
          followings: followingList,
        })
        .eq("id", viewerId);

      const { error: error2 } = await supabase
        .from("profiles")
        .update({
          followers: followersList,
        })
        .eq("id", user.id);

      if (error2) throw error2;
      if (error) throw error;
      else {
        return NextResponse.json({
          response: "success",
          status: 200,
        });
      }
    } else if (action === "Unfollow") {
      followingList.splice(followingList.indexOf(user.id), 1);
      followersList.splice(followersList.indexOf(viewerId), 1);
      const { error } = await supabase
        .from("profiles")
        .update({
          followings: followingList,
        })
        .eq("id", viewerId);
      const { error: error2 } = await supabase
        .from("profiles")
        .update({
          followers: followersList,
        })
        .eq("id", user.id);

      if (error) throw error;
      if (error2) throw error2;
      else {
        return NextResponse.json({
          response: "success",
          status: 200,
        });
      }
    }
  } catch (error) {
    return NextResponse.json({
      response: "An unknown error occurred",
      error: error,
      status: 500,
    });
  }
}
