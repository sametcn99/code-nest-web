import { createClient } from "../supabase/server";

/**
 * Modifies the star count for a content entry based on the action.
 * @param {string} content_id - The ID of the content whose star count is being modified.
 * @param {"Add" | "Remove"} action - The action to perform ("Add" to increment, "Remove" to decrement).
 * @returns {Promise<boolean>} - Returns true if the star count was modified successfully, false otherwise.
 */
export const starCountChange = async (
  content_id: string,
  action: "Add" | "Remove",
): Promise<boolean> => {
  const supabase = createClient();

  // Retrieve the current star count for the given content_id
  const { data: selectData, error: selectError } = await supabase
    .from("files")
    .select("star_count")
    .eq("content_id", content_id)
    .single(); // Assuming each content_id has a unique entry

  if (selectError) {
    console.error("Error fetching star count:", selectError);
    return false;
  }

  // Validate selectData and its star_count property
  if (!selectData || typeof selectData.star_count !== "number") {
    console.error("Invalid data received:", selectData);
    return false;
  }

  // Calculate the new star count based on the action
  const newStarCount =
    action === "Add" ? selectData.star_count + 1 : selectData.star_count - 1;

  // Update the star count for the content_id
  const { error: updateError } = await supabase
    .from("files")
    .update({ star_count: newStarCount })
    .eq("content_id", content_id);

  if (updateError) {
    console.error("Error updating star count:", updateError);
    return false;
  } else {
    console.log("Star count updated successfully", {
      content_id,
      newStarCount,
    });
    return true;
  }
};
