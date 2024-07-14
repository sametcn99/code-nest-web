import JSZip from "jszip";
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

export const downloadContents = async (content_id: number) => {
  const supabase = createClient();

  // Download the content with the given content_id
  const { error, data } = await supabase
    .from("files")
    .select("content")
    .eq("content_id", content_id)
    .single();

  if (error) {
    console.error("Error downloading content:", error);
    return false;
  } else if (data) {
    // Assuming the content is in the first row of the data array
    if (data) {
      const files: FileTypes[] = JSON.parse(JSON.stringify(data.content));
      console.log(files);

      if (files.length === 0) {
        console.error("No files found in the content");
        return false;
      }

      if (files.length === 1) {
        console.log("Downloading a single file");
        // Download the file directly
        const file = files[0];
        const url = URL.createObjectURL(new Blob([file.value]));
        const a = document.createElement("a");
        a.href = url;
        a.download = file.filename;
        a.click();
        URL.revokeObjectURL(url);
        return true;
      }
      if (files.length > 1) {
        // Download the files as a zip
        const zip = new JSZip();
        files.forEach((file) => {
          zip.file(file.filename, file.value);
        });
        zip.generateAsync({ type: "blob" }).then((content) => {
          const url = URL.createObjectURL(content);
          const a = document.createElement("a");
          a.href = url;
          a.download = "content.zip";
          a.click();
          URL.revokeObjectURL(url);
        });
        return true;
      }
    }
  }
};
