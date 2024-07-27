export async function runWebHook(
	title: string,
	description: string,
	url?: string
) {
	// if (process.env.NODE_ENV !== 'production') return // Skip in development
	const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL
	// Prepare the payload for Discord webhook
	const payload = {
		embeds: [
			{
				author: {
					name: 'CodeNest',
				},
				title: title,
				description: description,
				color: 0x2b2d31, // Dark color
				timestamp: new Date().toISOString(), // Add timestamp if needed
				url: url,
			},
		],
	}
	if (!DISCORD_WEBHOOK_URL) throw Error('Discord webhook URL is missing')

	// Send the log to Discord webhook
	await fetch(DISCORD_WEBHOOK_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	})
}
