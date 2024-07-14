import JSZip from "jszip";
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

/**
 * Downloads content from the database based on content_id.
 * @param {number} content_id - The ID of the content to be downloaded.
 * @returns {Promise<boolean>} - Returns true if the content was downloaded successfully, false otherwise.
 * @throws {Error} - Throws an error if there's an issue with downloading the content.
 */
export const downloadContents = async (content_id: number) => {
  const supabase = createClient();

  try {
    // Attempt to download the content with the given content_id
    const { data, error } = await supabase
      .from("files")
      .select("content")
      .eq("content_id", content_id)
      .single();

    if (error) {
      throw new Error(`Error downloading content: ${error}`);
    }

    if (!data) {
      throw new Error("No content found with the given content_id");
    }

    // Parse the content data
    const files: FileTypes[] = JSON.parse(JSON.stringify(data.content));

    if (files.length === 0) {
      throw new Error("No files found in the content");
    }

    if (files.length === 1) {
      console.log("Downloading a single file");
      // Download the file directly
      const file = files[0];
      const url = URL.createObjectURL(new Blob([file.value]));
      const a = document.createElement("a");
      a.href = url;
      a.download = file.filename;
      document.body.appendChild(a); // Append to body to ensure visibility
      a.click();
      document.body.removeChild(a); // Clean up
      URL.revokeObjectURL(url);
      return true;
    } else if (files.length > 1) {
      console.log("Downloading multiple files as a zip");
      // Download the files as a zip
      const zip = new JSZip();
      files.forEach((file) => {
        zip.file(file.filename, file.value);
      });
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "content.zip";
      document.body.appendChild(a); // Append to body to ensure visibility
      a.click();
      document.body.removeChild(a); // Clean up
      URL.revokeObjectURL(url);
      return true;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
};
