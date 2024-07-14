import { createClient } from "../supabase/server";

/**
 * Handles the action of adding or removing a comment for a specific content.
 *
 * This function first retrieves the current comment count for the given content ID from the 'comments' table.
 * If the content ID is found, it proceeds to either add a new comment or remove an existing comment based on the action specified.
 *
 * Note: It's assumed that each content_id has a unique entry in the 'comments' table.
 *
 * @param {string} content_id - The ID of the content for which the comment action is to be performed.
 * @param {"Add" | "Remove"} action - The action to be performed. Can be either "Add" to insert a new comment or "Remove" to delete an existing comment.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean value. `true` if the action (add/remove) was successful, `false` otherwise.
 *
 * @example
 * // To add a comment
 * handleCommentAction("123", "Add").then(result => {
 *   if(result) {
 *     console.log("Comment added successfully");
 *   } else {
 *     console.error("Failed to add comment");
 *   }
 * });
 *
 * @example
 * // To remove a comment
 * handleCommentAction("123", "Remove").then(result => {
 *   if(result) {
 *     console.log("Comment removed successfully");
 *   } else {
 *     console.error("Failed to remove comment");
 *   }
 * });
 */
export const handleCommentAction = async (
  content_id: string,
  action: "Add" | "Remove",
): Promise<boolean> => {
  const supabase = createClient();

  // Retrieve the current comment count for the given content_id
  const { data: selectData, error: selectError } = await supabase
    .from("comments")
    .select("*")
    .eq("content_id", content_id)
    .single(); // Assuming each content_id has a unique entry

  if (selectError) {
    console.error("Error fetching comment count:", selectError);
    return false;
  }

  // insert new comment into the comments table or remove the comment
  const commentAction =
    action === "Add"
      ? await supabase.from("comments").insert({
          content_id: content_id,
          comment: "new comment",
          user_id: "user_id",
        })
      : await supabase.from("comments").delete().eq("content_id", content_id);

  if (commentAction.error) {
    console.error("Error inserting comment:", commentAction.error);
    return false;
  } else {
    console.log("Comment inserted successfully", {
      content_id,
    });
    return true;
  }
};
