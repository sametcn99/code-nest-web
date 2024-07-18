import { toast } from "sonner";
import { createClient } from "../supabase/client";

/**
 * Adds or removes a star to the contents based on the action provided.
 * @param contentId - The ID of the content.
 * @param starredBy - The list of users who have starred the content.
 * @param userId - The ID of the user performing the action.
 * @param action - The action to perform. Can be "Add" or "Remove".
 * @returns A Promise that resolves to a boolean indicating the success of the operation.
 */
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

/**
 * Checks if the user is authenticated.
 * @returns A promise that resolves to a boolean indicating whether the user is authenticated.
 */
const isAuthenticated = async (): Promise<boolean> => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  return !error && !!data.user;
};

/**
 * Displays an authentication error message.
 * This function is called when a user tries to add content to favorites without being logged in.
 */
const displayAuthenticationError = () => {
  toast.error("İçeriği favorilere ekleyebilmek için giriş yapmalısınız.");
};

/**
 * Updates the list of users who have starred an item.
 * 
 * @param starredBy - The current list of users who have starred the item.
 * @param userId - The ID of the user performing the action.
 * @param action - The action to perform. Can be "Add" or "Remove".
 * @returns The updated list of users who have starred the item.
 */
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

/**
 * Updates the stars of a content in the database.
 * 
 * @param {string} contentId - The ID of the content to update.
 * @param {string[]} starredBy - The array of users who have starred the content.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the update was successful.
 */
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

/**
 * Updates the starred projects table for a given user.
 * @param projectId - The ID of the project to be starred or unstarred.
 * @param userId - The ID of the user performing the action.
 * @param action - The action to be performed. Can be "Add" or "Remove".
 * @returns A Promise that resolves to a boolean indicating whether the update was successful.
 */
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
