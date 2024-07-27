import { useEffect } from 'react'

const useScroll = (
	callback: () => void,
	loading: boolean,
	hasMore: boolean
) => {
	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 &&
				!loading &&
				hasMore
			) {
				callback()
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [loading, hasMore, callback])
}

export default useScroll
