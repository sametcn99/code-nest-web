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
