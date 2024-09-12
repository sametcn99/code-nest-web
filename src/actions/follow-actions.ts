import { Tables } from '../../types/supabase'

/**
 * Performs a follow or unfollow action on a user profile.
 *
 * @param user - The user profile to perform the action on.
 * @param viewerId - The ID of the viewer performing the action.
 * @param action - The action to perform, either "Follow" or "Unfollow".
 * @returns A promise that resolves to a boolean indicating whether the action was successful.
 */
export const followAction = async (
	user: Tables<'profiles'>,
	viewerId: string,
	action: 'Follow' | 'Unfollow'
): Promise<boolean> => {
	try {
		const response = await fetch('/api/follow-action', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user, viewerId, action }),
		})
		if (!response.ok) throw new Error('Failed to save components')
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}
