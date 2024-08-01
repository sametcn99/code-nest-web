export async function runWebHook(
	payload: WebHookPayload,
	channel: 'login' | 'share' | 'edit'
) {
	// if (process.env.NODE_ENV !== 'production') return // Skip in development
	const DISCORD_WEBHOOK_URL =
		process.env[`DISCORD_WEBHOOK_URL_${channel.toUpperCase()}`]
	// Prepare the payload for Discord webhook

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
