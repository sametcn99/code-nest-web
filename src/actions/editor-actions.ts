/**
 * Sends a POST request to save data to the server.
 * @param components - An array of file types.
 * @param title - The title of the data.
 * @param description - The description of the data.
 * @returns A Promise that resolves to the saved data, or null if an error occurs.
 */
export const postData = async (
  components: FileTypes[],
  title: string,
  description: string,
) => {
  try {
    const response = await fetch('/api/post-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ components, title, description }),
    })

    if (!response.ok) {
      throw new Error('Failed to save components')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
