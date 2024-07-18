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
  try {
    const response = await fetch("/api/star-action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contentId, starredBy, action, userId }),
    });
    if (!response.ok) {
      throw new Error("Failed to save components");
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
