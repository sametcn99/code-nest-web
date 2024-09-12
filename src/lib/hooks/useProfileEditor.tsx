import { updateProfile } from '@/actions/user-actions'
import { isValidImageUrl } from '@/utils/image-validate'
import { useDisclosure } from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import { Tables } from '../../../types/supabase'

/**
 * Custom hook for managing profile editing functionality.
 * @param user - The user profile data.
 * @param viewerID - The ID of the viewer (optional).
 * @returns An object containing various functions and state variables for profile editing.
 */
const useProfileEditor = (user: Tables<'profiles'>, viewerID?: string) => {
	const [userData, setUserData] = useState(user)
	const [bannerUrl, setBannerUrl] = useState(user.banner_url)
	const [isChangesSaved, setIsChangesSaved] = useState(true)
	const [isFollowed, setIsFollowed] = useState(false)
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	useEffect(() => {
		if (viewerID) {
			setIsFollowed(user.followers?.includes(viewerID) || false)
		}
	}, [user.followers, viewerID])

	/**
	 * Handles the change event for the banner URL input field.
	 * @param e - The change event.
	 */
	const handleBannerUrlChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setBannerUrl(e.target.value)
		},
		[]
	)

	/**
	 * Handles the change event for the bio input field.
	 * @param e - The change event.
	 */
	const handleBioChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setUserData((prevData) => ({ ...prevData, bio: e.target.value }))
			setIsChangesSaved(false)
		},
		[]
	)

	/**
	 * Handles the change event for the username input field.
	 * @param e - The change event.
	 */
	const handleUsernameChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setUserData((prevData) => ({ ...prevData, username: e.target.value }))
			setIsChangesSaved(false)
		},
		[]
	)

	/**
	 * Handles the save changes action.
	 */
	const handleSaveChanges = useCallback(async () => {
		try {
			await updateProfile(userData)
			setIsChangesSaved(true)
		} catch (error) {
			console.error('Failed to save changes:', error)
		}
	}, [userData])

	/**
	 * Handles the save banner URL action.
	 */
	const handleSaveBannerUrl = useCallback(async () => {
		if (!bannerUrl) {
			alert('Banner URL cannot be empty.')
			return
		}
		const isValid = await isValidImageUrl(bannerUrl)
		if (!isValid) {
			alert('Invalid banner URL.')
			return
		}
		setUserData((prevData) => ({ ...prevData, banner_url: bannerUrl }))
		setIsChangesSaved(false)
	}, [bannerUrl])

	return {
		userData,
		bannerUrl,
		isOpen,
		isChangesSaved,
		isFollowed,
		setIsChangesSaved,
		handleBannerUrlChange,
		handleBioChange,
		handleUsernameChange,
		handleSaveChanges,
		handleSaveBannerUrl,
		onOpen,
		onOpenChange,
		setIsFollowed,
	}
}

export default useProfileEditor
