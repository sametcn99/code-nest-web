import { useState, useEffect, useCallback } from 'react'

const useValidImage = (url: string): boolean => {
	const [isValid, setIsValid] = useState<boolean >(false)

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
