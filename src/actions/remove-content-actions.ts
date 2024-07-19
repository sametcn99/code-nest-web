/**
 * Removes content with the specified content_id.
 * @param content_id - The ID of the content to be removed.
 * @returns A Promise that resolves to a boolean indicating whether the content was successfully removed.
 */
export const removeContent = async (content_id: number): Promise<boolean> => {
  try {
    const response = await fetch("/api/remove-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content_id }),
    });

    if (!response.ok) {
      throw new Error("Failed to save components");
    }
    return true;
  } catch (error) {
    console.error(
      "An unexpected error occurred while removing content:",
      error,
    );
    return false;
  }
};
