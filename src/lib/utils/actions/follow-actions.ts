import { toast } from "sonner";
import { Tables } from "../../../../types/supabase";
import { createClient } from "../supabase/client";

/**
 * Performs the follow or unfollow action on a user.
 * @param user - The user to perform the action on.
 * @param viewerId - The ID of the viewer performing the action.
 * @param action - The action to perform. Can be "Follow" or "Unfollow".
 * @returns A Promise that resolves to a boolean indicating whether the action was successful.
 */
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
        return true;
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

      if (error2) throw error2;

      if (error) throw error;
      else {
        return true;
      }
    }
    return false;
  } catch (error) {
    toast.error(`Failed to ${action.toLowerCase()} user`);
    return false;
  }
};
