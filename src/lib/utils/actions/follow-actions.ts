import { toast } from "sonner";
import { Tables } from "../../../../types/supabase";
import { createClient } from "../supabase/client";

export const followAction = async (
  user: Tables<"profiles">,
  viewerId: string,
  action: "Follow" | "Unfollow",
): Promise<boolean> => {
  const supabase = createClient();

  try {
    let followingList: string[] = user.followings ?? [];
    let followersList: string[] = user.followers ?? [];
    console.log("followingList", followingList);
    if (action === "Follow") {
      followingList.push(user.id);
      followersList.push(viewerId);
      // add target user_id to auth user's following array
      const { error } = await supabase
        .from("profiles")
        .update({
          followings: followingList,
        })
        .eq("id", viewerId);

      // add auth user's id to target user's followers array
      const { error: error2 } = await supabase
        .from("profiles")
        .update({
          followers: followersList,
        })
        .eq("id", user.id);

      if (error2) throw error2;

      if (error) throw error;
      else {
        return true;
      }
    } else if (action === "Unfollow") {
      followingList.splice(followingList.indexOf(user.id), 1);
      followersList.splice(followersList.indexOf(viewerId), 1);
      // remove target user_id from auth user's following array
      const { error } = await supabase
        .from("profiles")
        .update({
          followings: followingList,
        })
        .eq("id", viewerId);

      // add auth user's id to target user's followers array
      const { error: error2 } = await supabase
        .from("profiles")
        .update({
          followers: followersList,
        })
        .eq("id", user.id);

      if (error2) throw error2;

      if (error) throw error;
      else {
        return true;
      }
    }
    return false; // Add this line to handle the case when action is neither "Follow" nor "Unfollow"
  } catch (error) {
    toast.error(`Failed to ${action.toLowerCase()} user`);
    return false;
  }
};
