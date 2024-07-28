import { useState, useEffect, useMemo } from 'react'

type FetchOptions = RequestInit

type FetchResult<T> = {
	data: T | null
	loading: boolean
	error: string | null
}

const useFetch = <T = unknown,>(
	url: string,
	options?: FetchOptions
): FetchResult<T> => {
	const [data, setData] = useState<T | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const memoizedOptions = useMemo(() => options, [options])

	useEffect(() => {
		const controller = new AbortController()
		const { signal } = controller

		const fetchData = async () => {
			setLoading(true)
			setError(null)

			try {
				const response = await fetch(url, { ...memoizedOptions, signal })

				if (!response.ok) {
					throw new Error(`Network response was not ok: ${response.statusText}`)
				}

				const result: T = await response.json()
				setData(result)
			} catch (err) {
				if (err !== 'AbortError') {
					const error = err as Error
					setError(error.message)
				}
			} finally {
				setLoading(false)
			}
		}

		fetchData()

		return () => {
			controller.abort()
		}
	}, [url, memoizedOptions])

	return { data, loading, error }
}

export default useFetch
