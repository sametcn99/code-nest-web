import { createClient } from "@/lib/utils/supabase/client";
import { generateRandomNumber } from "@/lib/utils/utils";

export const postData = async (filesData: FileTypes[]): Promise<URL | null> => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  const content_id = generateRandomNumber(8);
  const user_id = user.data.user?.id;

  // get username from profiles table by user id
  const { data: username, error: profileError } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user_id)
    .single();

  if (profileError) {
    console.error("Profile error:", profileError);
    return null;
  }

  if (!user) {
    console.error("User not found");
    return null;
  }

  const data = {
    user_id: user_id,
    user_name: username.full_name,
    content: JSON.stringify(filesData),
    created_at: new Date(),
    content_id: content_id,
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
