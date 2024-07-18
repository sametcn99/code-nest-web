import { createClient } from "../supabase/client";

// Define a TypeScript type for the parameters needed to update a user's banner URL
type UpdateBannerUrlParams = {
  /**The new banner URL to be set for the user */
  bannerUrl: string;
  /**The unique identifier of the user whose banner URL is to be updated */
  userId: string;
};

// Define a TypeScript type for the parameters needed to update a user's banner URL
type UpdateUserNameParams = {
  /**The new user name to be set for the user */
  username: string;
  /**The unique identifier of the user whose banner URL is to be updated */
  userId: string;
};

// Define a TypeScript type for the parameters needed to update a user's bio
type UpdateBioParams = {
  /**The new bio to be set for the user */
  bio: string;
  /**The unique identifier of the user whose bio is to be updated */
  userId: string;
};

/**
 * Updates the banner URL for a user profile.
 * @param {Object} params - The parameters object.
 * @param {string} params.bannerUrl - The new banner URL to be set for the user.
 * @param {string} params.userId - The unique identifier of the user whose banner URL is to be updated.
 * @returns {Promise<boolean>} - Returns true if the banner URL was updated successfully, false otherwise.
 */
export async function updateBannerUrl({
  bannerUrl,
  userId,
}: UpdateBannerUrlParams): Promise<boolean> {
  try {
    const supabase = createClient();
    if (!supabase) {
      throw new Error("Supabase client is not initialized");
    }

    if (!bannerUrl) {
      throw new Error("Banner URL cannot be empty");
    }
    const { data, error } = await supabase
      .from("profiles")
      .update({ banner_url: bannerUrl })
      .eq("id", userId);

    if (error) {
      throw new Error("Error updating banner URL: " + error);
    }

    console.log("Banner URL updated successfully:", data);
    return true;
  } catch (error) {
    console.error("Error updating banner URL:", error);
    return false;
  }
}

/**
 * Updates the username for a user profile.
 * @param {Object} params - The parameters object.
 * @param {string} params.username - The new username to be set for the user.
 * @param {string} params.userId - The unique identifier of the user whose username is to be updated.
 * @returns {Promise<boolean>} - Returns true if the username was updated successfully, false otherwise.
 */
export async function updateUserName({
  username,
  userId,
}: UpdateUserNameParams): Promise<boolean> {
  try {
    const supabase = createClient();
    if (!supabase) {
      throw new Error("Supabase client is not initialized");
    }

    if (!username) {
      throw new Error("Username cannot be empty");
    }

    // Step 1: Query the database to check if the username already exists
    const { data: existingUser, error: queryError } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username)
      .not("id", "eq", userId); // Exclude the current user's record

    if (queryError) {
      throw new Error(
        "Error querying existing username: " + queryError.message,
      );
    }

    // Step 2: Check if the username already exists
    if (existingUser.length > 0) {
      throw new Error("Username already exists");
    }

    // Step 3: Proceed with the update if the username does not exist
    const { data, error } = await supabase
      .from("profiles")
      .update({ username })
      .eq("id", userId);

    if (error) {
      throw new Error("Error updating username: " + error.message);
    }

    console.log("Username updated successfully:", data);
    return true;
  } catch (error) {
    console.error("Error updating username:", error);
    return false;
  }
}

/**
 * Updates the bio for a user profile.
 * @param {Object} params - The parameters object.
 * @param {string} params.bio - The new bio to be set for the user.
 * @param {string} params.userId - The unique identifier of the user whose bio is to be updated.
 * @returns {Promise<boolean>} - Returns true if the bio was updated successfully, false otherwise.
 */
export const updateBio = async ({
  bio,
  userId,
}: UpdateBioParams): Promise<boolean> => {
  try {
    const supabase = createClient();
    if (!supabase) {
      throw new Error("Supabase client is not initialized");
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({ bio })
      .eq("id", userId);

    if (error) {
      throw new Error("Error updating bio: " + error.message);
    }

    console.log("Bio updated successfully:", data);
    return true;
  } catch (error) {
    console.error("Error updating bio:", error);
    return false;
  }
};
