export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export type Database = {
	public: {
		Tables: {
			comments: {
				Row: {
					comment: string | null
					content_id: number | null
					created_at: string
					id: number
					user_id: string | null
				}
				Insert: {
					comment?: string | null
					content_id?: number | null
					created_at?: string
					id?: number
					user_id?: string | null
				}
				Update: {
					comment?: string | null
					content_id?: number | null
					created_at?: string
					id?: number
					user_id?: string | null
				}
				Relationships: []
			}
			files: {
				Row: {
					content: Json
					created_at: string
					description: string | null
					id: string
					starred_by: string[] | null
					title: string
					user_id: string
				}
				Insert: {
					content: Json
					created_at?: string
					description?: string | null
					id?: string
					starred_by?: string[] | null
					title: string
					user_id: string
				}
				Update: {
					content?: Json
					created_at?: string
					description?: string | null
					id?: string
					starred_by?: string[] | null
					title?: string
					user_id?: string
				}
				Relationships: []
			}
			profiles: {
				Row: {
					avatar_url: string | null
					banner_url: string | null
					bio: string | null
					email: string | null
					followers: string[] | null
					followings: string[] | null
					full_name: string | null
					id: string
					roles: string[] | null
					sub: string
					username: string | null
					website: string | null
				}
				Insert: {
					avatar_url?: string | null
					banner_url?: string | null
					bio?: string | null
					email?: string | null
					followers?: string[] | null
					followings?: string[] | null
					full_name?: string | null
					id: string
					roles?: string[] | null
					sub: string
					username?: string | null
					website?: string | null
				}
				Update: {
					avatar_url?: string | null
					banner_url?: string | null
					bio?: string | null
					email?: string | null
					followers?: string[] | null
					followings?: string[] | null
					full_name?: string | null
					id?: string
					roles?: string[] | null
					sub?: string
					username?: string | null
					website?: string | null
				}
				Relationships: [
					{
						foreignKeyName: 'profiles_id_fkey'
						columns: ['id']
						isOneToOne: true
						referencedRelation: 'users'
						referencedColumns: ['id']
					},
				]
			}
			views: {
				Row: {
					_id: string | null
					count: number
					id: string
					table: string | null
				}
				Insert: {
					_id?: string | null
					count: number
					id?: string
					table?: string | null
				}
				Update: {
					_id?: string | null
					count?: number
					id?: string
					table?: string | null
				}
				Relationships: []
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
				PublicSchema['Views'])
		? (PublicSchema['Tables'] &
				PublicSchema['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R
			}
			? R
			: never
		: never

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I
			}
			? I
			: never
		: never

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U
			}
			? U
			: never
		: never

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema['Enums']
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
		? PublicSchema['Enums'][PublicEnumNameOrOptions]
		: never
