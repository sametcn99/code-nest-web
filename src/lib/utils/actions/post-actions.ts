import { createClient } from "../supabase/client";

/**
 * Removes content from the database based on content_id.
 * @param {number} content_id - The ID of the content to be removed.
 * @returns {Promise<boolean>} - Returns true if the content was removed successfully, false otherwise.
 * @throws {Error} - Throws an error if content_id is not provided or if there's an issue with deletion.
 */
export const removeContent = async (content_id: number): Promise<boolean> => {
  if (!content_id) throw new Error("content_id is required");

  const supabase = createClient();

  try {
    const { error, data } = await supabase
      .from("files")
      .delete()
      .eq("content_id", content_id);

    if (error) throw new Error(`Error removing content: ${error}`);

    console.log("Content removed successfully", { content_id, data });
    return true;
  } catch (error) {
    console.error(
      "An unexpected error occurred while removing content:",
      error,
    );
    return false;
  }
};

/**
 * Removes a comment from the database based on comment_id.
 * @param {number} comment_id - The ID of the comment to be removed.
 * @returns {Promise<boolean>} - Returns true if the comment was removed successfully, false otherwise.
 * @throws {Error} - Throws an error if there's an issue with deletion.
 */
export const removeComment = async (comment_id: number): Promise<boolean> => {
  const supabase = createClient();

  try {
    // Delete the comment with the given comment_id
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("comment_id", comment_id);

    if (error) throw new Error(`Error removing comment: ${error}`);

    console.log("Comment removed successfully", { comment_id });
    return true;
  } catch (error) {
    console.error(
      "An unexpected error occurred while removing comment:",
      error,
    );
    return false;
  }
};
