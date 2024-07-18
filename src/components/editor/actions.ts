import { createClient } from "@/utils/supabase/client";
import { generateRandomNumber } from "@/utils/utils";
import { toast } from "sonner";

/**
 * Posts data to the server.
 *
 * @param filesData - An array of file data.
 * @param title - The title of the content.
 * @param description - The description of the content.
 * @returns A Promise that resolves to a URL or null.
 */
export const postData = async (
  filesData: FileTypes[],
  title: string,
  description: string,
): Promise<URL | null> => {
  const supabase = createClient();
  const auth = await supabase.auth.getUser();
  const content_id = generateRandomNumber(8);
  const user_id = auth.data.user?.id;

  if (!auth) {
    toast.error("User not found");
    return null;
  }

  const data = {
    user_id: user_id,
    content: filesData,
    created_at: new Date(),
    content_id: content_id,
    title: title,
    description: description,
  };

  const { error, statusText, status } = await supabase
    .from("files")
    .insert(data);

  if (error) {
    console.error("Error:", error, status, statusText);
    return null;
  } else {
    console.log("Data saved successfully", status, statusText);
    const url = new URL(`/code/${content_id}`, window.location.href);
    console.log("URL:", url);
    return url;
  }
};
