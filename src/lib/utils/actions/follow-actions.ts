import { createClient } from "../supabase/server";

export const followAction = async (
  user_id: string,
  action: "Add" | "Remove",
): Promise<boolean> => {
  const supabase = createClient();

  // Retrieve the current follow count for the given user_id
  const { data: selectData, error: selectError } = await supabase
    .from("users")
    .select("follow_count")
    .eq("user_id", user_id)
    .single(); // Assuming each user_id has a unique entry

  if (selectError) {
    console.error("Error fetching follow count:", selectError);
    return false;
  }

  // Validate selectData and its follow_count property
  if (!selectData || typeof selectData.follow_count !== "number") {
    console.error("Invalid data received:", selectData);
    return false;
  }

  // Calculate the new follow count based on the action
  const newFollowCount =
    action === "Add"
      ? selectData.follow_count + 1
      : selectData.follow_count - 1;

  // Update the follow count for the user_id
  const { error: updateError } = await supabase
    .from("users")
    .update({ follow_count: newFollowCount })
    .eq("user_id", user_id);

  if (updateError) {
    console.error("Error updating follow count:", updateError);
    return false;
  } else {
    console.log("Follow count updated successfully", {
      user_id,
      newFollowCount,
    });
    return true;
  }
};

export const toggleFollowUser = async (
  follower_id: string,
  following_id: string,
  action: "follow" | "unfollow",
): Promise<boolean> => {
  const supabase = createClient();

  try {
    if (action === "follow") {
      // Insert follower_id into the followers column for the following_id in the profiles table
      const { error } = await supabase
        .from("profiles")
        .update({
          followers: supabase.rpc("array_append", {
            column: "followers",
            value: follower_id,
          }),
        })
        .eq("user_id", following_id);
      if (error) throw error;
    } else if (action === "unfollow") {
      // Remove follower_id from the followers column for the following_id in the profiles table
      const { error } = await supabase
        .from("profiles")
        .update({
          followers: supabase.rpc("array_remove", {
            column: "followers",
            value: follower_id,
          }),
        })
        .eq("user_id", following_id);
      if (error) throw error;
    }

    console.log(
      `${action.charAt(0).toUpperCase() + action.slice(1)}ed user successfully`,
      { follower_id, following_id },
    );
    return true;
  } catch (error) {
    console.error(`Error ${action}ing user:`, error);
    return false;
  }
};
