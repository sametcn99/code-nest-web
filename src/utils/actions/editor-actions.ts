// actions.ts

export const postData = async (
  components: FileTypes[],
  title: string,
  description: string,
) => {
  try {
    const response = await fetch("/api/post-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ components, title, description }),
    });

    if (!response.ok) {
      throw new Error("Failed to save components");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
