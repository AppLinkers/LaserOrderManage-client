import { IBaseListSimpleResponse } from "@/src/lib/apis/base/base.types";

export type UserAuthority = "ROLE_CUSTOMER" | "ROLE_FACTORY" | "AUTHORITY_ADMIN" | null;

export type SignupMethodName = "" | "(카카오)";
export type SignupMethod = "BASIC" | "OAUTH_KAKAO";

export type ILoginRequest = {
  email: string;
  password: string;
};

export type IKakaoLoginRequest = {
  kakaoAccessToken: string;
}

export type IToken = {
  authorityList: UserAuthority[];
  grantType: string;
  accessToken: string;
  accessTokenExpirationTime: number;
  refreshToken: string;
  refreshTokenExpirationTime: number;
};

export type IRequestVerifyResponse = {
  email: string | null;
  name: string | null;
  createdAt: any | null;
  status: string;
};

export type IVerifyEmailRequest = {
  email: string;
  code: string;
};

export type IVerifyEmailResponse = {
  email: string | null;
  name: string | null;
  createdAt: any | null;
  status: string;
};

export type IJoinRequest = {
  email: string;
  password: string;
  name: string;
  companyName: string | null;
  phone: string;
  zipCode: string;
  address: string;
  detailAddress: string | null;
};

export type IKakaoJoinRequest = {
  email: string;
  name: string;
  companyName: string | null;
  phone: string;
  zipCode: string;
  address: string;
  detailAddress: string | null;
}

export type IJoinResponse = {
  email: string;
  name: string;
  createdAt: any;
  status: string;
};

export type IFindEmailRequest = {
  name: string;
  phone: string;
};

export type IFindEmail = {
  name: string;
  signupMethod: SignupMethod;
  email: string;
};

export type IFindEmailResponse = IBaseListSimpleResponse<IFindEmail>;

export type IFindPasswordRequest = {
  email: string;
  baseUrl: string;
};

export type IEditPasswordRequest = {
  password: string;
};

export type IAccountResponse = {
  email: string;
  name: string;
  phone: string;
  zipCode: string;
  address: string;
  detailAddress: string | null;
  emailNotification: boolean;
  signupMethod: SignupMethod;
}

export type IAccountRequest = {
  name: string;
  phone: string;
  zipCode: string;
  address: string;
  detailAddress: string | null;
}
