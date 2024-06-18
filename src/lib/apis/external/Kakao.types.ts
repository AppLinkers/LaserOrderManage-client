export type IKakaoAccessTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
  token_type: string;
}

export type IKakaoAccount = {
  name_needs_agreement: boolean;
  name: string;
  has_email: boolean;
  email_needs_agreement: boolean;
  is_email_valid: boolean;
  is_email_verified: boolean;
  email: string;
  has_phone_number: boolean;
  phone_number_needs_agreement: boolean;
  phone_number: string;
} 

export type IKakaoAccountResponse = {
  id: number;
  connected_at: string;
  kakao_account: IKakaoAccount;
}