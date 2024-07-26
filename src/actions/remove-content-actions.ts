/**
 * Removes content with the specified id.
 * @param id - The ID of the content to be removed.
 * @returns A Promise that resolves to a boolean indicating whether the content was successfully removed.
 */
export const removeContent = async (id: string): Promise<boolean> => {
	try {
		const response = await fetch('/api/remove-content', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id }),
		})

		if (!response.ok) {
			throw new Error('Failed to save components')
		}
		return true
	} catch (error) {
		console.error('An unexpected error occurred while removing content:', error)
		return false
	}
}
