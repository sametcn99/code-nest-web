import { createClient } from "../supabase/server";

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
