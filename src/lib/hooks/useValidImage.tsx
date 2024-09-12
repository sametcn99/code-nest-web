import { useState, useCallback, useEffect } from 'react'

const useValidImage = (url: string | null): boolean => {
	if (!url) return false
	const [isValid, setIsValid] = useState<boolean>(false)

	const checkImageValidity = useCallback((imageUrl: string) => {
		if (!imageUrl) {
			setIsValid(false)
			return
		}

		const img = new Image()
		img.onload = () => setIsValid(true)
		img.onerror = () => setIsValid(false)
		img.src = imageUrl
	}, [])

	useEffect(() => {
		checkImageValidity(url)
	}, [url, checkImageValidity])

	return isValid
}

export default useValidImage
