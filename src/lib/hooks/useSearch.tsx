import { useState, useEffect } from 'react'
import { debounce } from '@/utils/utils'
import { Tables } from '../../../types/supabase'

/**
 * Custom hook for performing search functionality.
 *
 * @param profileID - Optional profile ID for filtering search results.
 * @returns An object containing search query, search results, loading state, and error message.
 */
const useSearch = (profileID?: string) => {
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [searchResults, setSearchResults] = useState<Tables<'files'>[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		/**
		 * Performs the search based on the search query.
		 */
		const searchContents = async () => {
			if (searchQuery.length > 2) {
				setLoading(true)
				setError(null)
				try {
					const url = profileID
						? `/api/search?q=${searchQuery}&table=files&profileID=${profileID}`
						: `/api/search?q=${searchQuery}&table=files`

					const res = await fetch(url)
					const data = await res.json()
					if (data.error) {
						throw new Error(data.error)
					}
					setSearchResults(data)
				} catch (error) {
					setError(
						error instanceof Error ? error.message : 'An unknown error occurred'
					)
				} finally {
					setLoading(false)
				}
			} else {
				setSearchResults([])
			}
		}

		const debouncedSearch = debounce(searchContents, 500)
		debouncedSearch()
	}, [searchQuery, profileID])

	return { searchQuery, setSearchQuery, searchResults, loading, error }
}

export default useSearch
