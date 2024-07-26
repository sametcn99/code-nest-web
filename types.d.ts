/**
 * Represents the types of files including their values and filenames.
 */
type FileTypes = {
	/** The value or content of the file. */
	value: string
	/** The name of the file. */
	filename: string
}

/**
 * Describes the content structure including its metadata and associated files.
 */
type Content = {
	/** Unique identifier for the content. */
	id: number
	/** The creation date of the content. */
	created_at: string
	/** The title of the content. */
	title: string
	/** The number of stars the content has received. */
	star_count: number
	/** The user ID of the content creator. */
	user_id: number
	/** A brief description of the content. */
	description: string
	/** An array of files associated with the content. */
	content: FileTypes[]
}

/**
 * Contains metadata about a user, including authentication and personal information.
 */
type UserMetadata = {
	/** Issuer of the token. */
	iss: string
	/** Subject of the token (usually user ID). */
	sub: string
	/** Name of the user. */
	name: string
	/** Email address of the user. */
	email: string
	/** URL to the user's profile picture. */
	picture: string
	/** Full name of the user. */
	full_name: string
	/** URL to the user's avatar. */
	avatar_url: string
	/** Provider-specific user ID. */
	provider_id: string
	/** Custom claims attached to the user. */
	custom_claims: {
		/** A global name identifier for the user. */
		global_name: string
	}
	/** Indicates if the user's email is verified. */
	email_verified: boolean
	/** Indicates if the user's phone number is verified. */
	phone_verified: boolean
	/** Indicates if the user is a super admin. */
	is_super_admin: boolean | null
	/** Creation date of the user record. */
	created_at: any
	/** Last update date of the user record. */
	updated_at: string
	/** The user's phone number. */
	phone: string | null
	/** Date when the phone number was confirmed. */
	phone_confirmed_at: string | null
	/** Pending phone number change. */
	phone_change: string
	/** Token for phone number change verification. */
	phone_change_token: string
	/** Date when the phone change token was sent. */
	phone_change_sent_at: string | null
	/** Date when the email was confirmed. */
	confirmed_at: string
	/** Current token for email change verification. */
	email_change_token_current: string
	/** Status of the email change confirmation. */
	email_change_confirm_status: number
	/** Date until which the user is banned. */
	banned_until: string | null
	/** Token for reauthentication. */
	reauthentication_token: string
	/** Date when the reauthentication token was sent. */
	reauthentication_sent_at: string | null
	/** Indicates if the user is an SSO user. */
	is_sso_user: boolean
	/** Date when the user was deleted, if applicable. */
	deleted_at: string | null
	/** Indicates if the user is anonymous. */
	is_anonymous: boolean
}
