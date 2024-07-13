import { createClient } from "../supabase/client";

export const removeContent = async (content_id: number): Promise<boolean> => {
  const supabase = createClient();

  // Delete the content with the given content_id
  const { error, data } = await supabase
    .from("files")
    .delete()
    .eq("content_id", content_id);

  if (error) {
    console.error("Error removing content:", error);
    return false;
  } else {
    console.log("Content removed successfully", { content_id, data });
    return true;
  }
};

export const removeComment = async (comment_id: number): Promise<boolean> => {
  const supabase = createClient();

  // Delete the comment with the given comment_id
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("comment_id", comment_id);

  if (error) {
    console.error("Error removing comment:", error);
    return false;
  } else {
    console.log("Comment removed successfully", { comment_id });
    return true;
  }
};
