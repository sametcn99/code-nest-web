import { toast } from "sonner";
import { createClient } from "../supabase/client";

export const addOrRemoveStarToContents = async (
  content_id: string,
  starred_by: string[],
  user_id: string,
  action: "Add" | "Remove",
): Promise<boolean> => {
  if (!(await isAuthenticated())) {
    displayAuthenticationError();
    return false;
  }

  const updatedStarredBy = updateStarredByList(starred_by, user_id, action);
  return await updateContentStars(content_id, updatedStarredBy);
};

const isAuthenticated = async (): Promise<boolean> => {
  const supabase = createClient();
  const auth = await supabase.auth.getUser();
  return !!auth;
};

const displayAuthenticationError = () => {
  toast.error("İçeriği favorilere ekleyebilmek için giriş yapmalısınız.");
};

const updateStarredByList = (
  starred_by: string[],
  user_id: string,
  action: "Add" | "Remove",
): string[] => {
  if (action === "Add") {
    return [...starred_by, user_id];
  } else {
    return starred_by.filter((id) => id !== user_id);
  }
};

const updateContentStars = async (
  content_id: string,
  starred_by: string[],
): Promise<boolean> => {
  const supabase = createClient();
  const { error } = await supabase
    .from("files")
    .update({ starred_by })
    .match({ id: content_id });

  if (error) {
    toast.error(`Bir hata oluştu. Lütfen tekrar deneyin.\n${error.message}`);
    return false;
  }

  toast.success(
    `İçerik favorilere ${starred_by.includes(content_id) ? "eklendi" : "kaldırıldı"}.`,
  );
  return true;
};
