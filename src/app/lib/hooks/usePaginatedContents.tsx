import { useEffect, useRef, useState } from 'react'
import useScroll from './useScroll'
import useSearch from './useSearch'
import { Tables } from '../../../../types/supabase'

/**
 * Custom hook for fetching paginated contents.
 * @param profileID - Optional profile ID to filter contents by.
 * @returns An object containing the fetched contents, user map, loading state, error message, search query, and search query setter.
 */
const usePaginatedContents = (profileID?: string) => {
	const [contents, setContents] = useState<Tables<'files'>[]>([])
	const [userMap, setUserMap] = useState<Record<string, Tables<'profiles'>>>({})
	const [page, setPage] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [hasMore, setHasMore] = useState<boolean>(true)
	const mounted = useRef(false)
	useScroll(() => setPage((prevPage) => prevPage + 1), loading, hasMore)

	const {
		searchQuery,
		setSearchQuery,
		searchResults,
		loading: searchLoading,
		error: searchError,
	} = useSearch(profileID)

	useEffect(() => {
		setError(searchError)
		setLoading(searchLoading)
	}, [searchError, searchLoading])

	useEffect(() => {
		if (!mounted.current) {
			mounted.current = true
			setPage(1)
		}
	}, [])

	/**
	 * Fetches the next page of contents.
	 */
	const fetchContents = async () => {
		if (page > 0 && hasMore && mounted.current) {
			setLoading(true)
			setError(null)
			try {
				const url = profileID
					? `/api/get?table=files&count=20&page=${page}&sort=desc&columns=created_at,title,description,id,user_id&order=created_at&profileID=${profileID}`
					: `/api/get?table=files&count=20&page=${page}&sort=desc&columns=created_at,title,description,id,user_id&order=created_at`
				const res = await fetch(url)
				const data = await res.json()
				if (data.error) throw new Error(data.error)
				setContents((prevContents) => [...prevContents, ...data])
				setHasMore(data.length > 0 ? true : false)
			} catch (error: unknown) {
				setHasMore(false)
			} finally {
				setLoading(false)
			}
		}
	}

	useEffect(() => {
		fetchContents()
	}, [page, hasMore, mounted])

	useEffect(() => {
		/**
		 * Fetches the user map for the contents.
		 */
		const fetchUserMap = async () => {
			try {
				contents.forEach(async (content) => {
					if (!userMap[content.user_id]) {
						const url = `/api/get?table=profiles&columns=avatar_url,id,username,full_name&eq=${content.user_id}`
						const res = await fetch(url)
						const data = await res.json()
						if (data.error) throw new Error(data.error)
						setUserMap((prevMap) => ({
							...prevMap,
							[content.user_id]: data[0],
						}))
					}
				})
			} catch (error) {
				console.error('Failed to fetch user profiles:', error)
			}
		}
		if (contents.length > 0) fetchUserMap()
	}, [contents])

	useEffect(() => {
		if (searchQuery.length > 2) {
			setContents(searchResults)
		} else if (searchQuery.length <= 2 && searchQuery !== '') {
			setContents([])
			setPage(1)
			setHasMore(true)
			fetchContents() // Call the function to fetch initial contents
		}
	}, [searchResults, searchQuery])

	return {
		contents,
		userMap,
		loading,
		error,
		searchQuery,
		setSearchQuery,
	}
}

export default usePaginatedContents
