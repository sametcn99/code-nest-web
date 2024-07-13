import { createClient } from "@/lib/utils/supabase/client";
import { generateRandomNumber } from "@/lib/utils/utils";

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
    console.error("User not found");
    return null;
  }

  const data = {
    user_id: user_id,
    content: filesData,
    created_at: new Date(),
    content_id: content_id,
    title: title,
    description: description,
    star_count: 0,
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
