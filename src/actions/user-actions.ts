import { Tables } from '../../types/supabase'

/**
 * Updates the user profile by making a POST request to the "/api/update-profile" endpoint.
 * @param user The user profile to be updated.
 * @returns A Promise that resolves to the updated user profile data, or null if an error occurs.
 */
export const updateProfile = async (user: Tables<'profiles'>) => {
	try {
		const response = await fetch('/api/update-profile', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user }),
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
