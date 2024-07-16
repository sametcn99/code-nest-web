import { toast } from "sonner";
import { createClient } from "../supabase/client";

export const addOrRemoveStarToContents = async (
  contentId: string,
  starredBy: string[],
  userId: string,
  action: "Add" | "Remove",
): Promise<boolean> => {
  if (!(await isAuthenticated())) {
    displayAuthenticationError();
    return false;
  }

  const updatedStarredBy = updateStarredByList(starredBy, userId, action);
  const contentUpdateSuccess = await updateContentStars(
    contentId,
    updatedStarredBy,
  );
  const profileUpdateSuccess = await updateStarredProjectsTable(
    contentId,
    userId,
    action,
  );

  return contentUpdateSuccess && profileUpdateSuccess;
};

const isAuthenticated = async (): Promise<boolean> => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  return !error && !!data.user;
};

const displayAuthenticationError = () => {
  toast.error("İçeriği favorilere ekleyebilmek için giriş yapmalısınız.");
};

const updateStarredByList = (
  starredBy: string[],
  userId: string,
  action: "Add" | "Remove",
): string[] => {
  if (action === "Add") {
    return [...starredBy, userId];
  } else {
    return starredBy.filter((id) => id !== userId);
  }
};

const updateContentStars = async (
  contentId: string,
  starredBy: string[],
): Promise<boolean> => {
  const supabase = createClient();
  const { error } = await supabase
    .from("files")
    .update({ starred_by: starredBy })
    .eq("id", contentId);

  if (error) {
    toast.error(`Bir hata oluştu. Lütfen tekrar deneyin.\n${error.message}`);
    return false;
  }
  return true;
};

const updateStarredProjectsTable = async (
  projectId: string,
  userId: string,
  action: "Add" | "Remove",
): Promise<boolean> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("starred_projects")
    .eq("id", userId)
    .single();

  console.log(data);
  console.log(data?.starred_projects);

  if (error) {
    toast.error(`Bir hata oluştu. Lütfen tekrar deneyin.\n${error.message}`);
    return false;
  }

  const starredProjects: string[] = data.starred_projects || [];
  const updatedStarredProjects =
    action === "Add"
      ? [...starredProjects, projectId]
      : starredProjects.filter((id) => id !== projectId);

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ starred_projects: updatedStarredProjects })
    .eq("id", userId);

  if (updateError) {
    toast.error(
      `Bir hata oluştu. Lütfen tekrar deneyin.\n${updateError.message}`,
    );
    return false;
  }

  toast.success(
    action === "Add"
      ? "İçerik favorilere eklendi."
      : "İçerik favorilerden kaldırıldı.",
  );
  return true;
};
