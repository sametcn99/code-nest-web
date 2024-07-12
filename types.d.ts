type FileTypes = {
  value: string;
  filename: string;
};

type Content = {
  id: number;
  created_at: string;
  title: string;
  star_count: number;
  user_id: number;
  description: string;
  content: FileTypes[];
};

type UserMetadata = {
  iss: string;
  sub: string;
  name: string;
  email: string;
  picture: string;
  full_name: string;
  avatar_url: string;
  provider_id: string;
  custom_claims: {
    global_name: string;
  };
  email_verified: boolean;
  phone_verified: boolean;
  is_super_admin: boolean | null;
  created_at: any;
  updated_at: string;
  phone: string | null;
  phone_confirmed_at: string | null;
  phone_change: string;
  phone_change_token: string;
  phone_change_sent_at: string | null;
  confirmed_at: string;
  email_change_token_current: string;
  email_change_confirm_status: number;
  banned_until: string | null;
  reauthentication_token: string;
  reauthentication_sent_at: string | null;
  is_sso_user: boolean;
  deleted_at: string | null;
  is_anonymous: boolean;
};
