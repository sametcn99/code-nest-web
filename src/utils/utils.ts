/**
 * Formats a given date into a string representation.
 * @param date - The date to be formatted.
 * @returns The formatted date string.
 */
export const formatDate = (date: Date): string => {
	const givenDate = new Date(date)
	const now = new Date()
	const diffInMs = now.getTime() - givenDate.getTime()
	const diffInMinutes = Math.floor(diffInMs / 60000) // Convert milliseconds to minutes

	if (diffInMinutes <= 5) return '5 dakika içinde'
	else if (diffInMinutes <= 10) return '10 dakika içinde'
	else if (diffInMinutes <= 30) return '30 dakika içinde'
	else if (diffInMinutes <= 60) return '1 saat içinde'
	else if (diffInMinutes <= 120) return '2 saat içinde'
	else if (diffInMinutes <= 180) return '3 saat içinde'
	else if (diffInMinutes <= 240) return '4 saat içinde'
	else if (diffInMinutes <= 300) return '5 saat içinde'
	else if (diffInMinutes <= 360) return '6 saat içinde'
	else if (diffInMinutes <= 720) return '12 saat içinde'
	else if (diffInMinutes <= 1440) return '1 gün içinde'
	else if (diffInMinutes <= 2880) return '1 gün önce'
	else if (diffInMinutes <= 4320) return '2 gün önce'
	else if (diffInMinutes <= 5760) return '3 gün önce'
	else return givenDate.toDateString()
}

/**
 * Truncates a string if it exceeds a certain length.
 * If the input string is longer than 100 characters, it will be truncated and "..." will be appended.
 * If the input string is shorter than or equal to 100 characters, it will be returned as is.
 *
 * @param input - The string to truncate.
 * @returns The truncated string.
 */
export function truncateString(input: string): string {
	if (input.length > 100) return input.substring(0, 100) + '...'
	else return input
}

/**
 * Debounces a callback function.
 * @param callback The callback function to be debounced.
 * @param delay The delay in milliseconds before invoking the callback.
 * @returns A debounced version of the callback function.
 */
export function debounce(callback: (...args: any[]) => void, delay: number) {
	let timeoutId: ReturnType<typeof setTimeout>
	return (...args: any[]) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => {
			callback(...args)
		}, delay)
	}
}

/**
 * Fetches the number of views for a specific ID and table.
 *
 * @param id - The ID of the item.
 * @param table - The table name.
 * @returns A promise that resolves to the number of views.
 */
export async function fetchViews(id: string, table: string): Promise<number> {
	if (process.env.NODE_ENV !== 'production') return 0 // Return a default value or handle as needed
	const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/update-views?id=${id}&table=${table}`
	const res = await fetch(url, { method: 'POST' })
	if (!res.ok) return 0
	const data = await res.json()
	return data.count || 0
}
