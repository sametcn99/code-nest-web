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

export const downloadContents = async (content_id: number): Promise<boolean> => {
  const supabase = createClient();

  // Download the content with the given content_id
  const { error, data } = await supabase
    .from("files")
    .select("content")
    .eq("content_id", content_id);

  if (error) {
    console.error("Error downloading content:", error);
    return false;
  } else if (data && data.length > 0) {
    // Assuming the content is in the first row of the data array
    const content = data[0].content;
    if (content) {
      // Convert the content to a Blob
      const blob = new Blob([content], { type: 'application/octet-stream' });
      
      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);
      
      // Create an anchor element and trigger a download
      const a = document.createElement('a');
      a.href = url;
      a.download = `content-${content_id}.txt`; // Specify the filename here
      document.body.appendChild(a); // Append the anchor to the body
      a.click(); // Trigger the download
      
      // Clean up by revoking the Blob URL and removing the anchor element
      URL.revokeObjectURL(url);
      document.body.removeChild(a);

      console.log("Content downloaded successfully", { content_id, data });
      return true;
    }
  }
  return false;
};