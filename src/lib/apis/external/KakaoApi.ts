import axios from "axios";
import { IKakaoAccessTokenResponse, IKakaoAccountResponse } from "./Kakao.types";
import { KAKAO_GET_KAKAO_ACCESS_TOKEN_URL, KAKAO_GET_KAKAO_ACCOUNT_URL, KAKAO_LOGIN_REDIRECT_URL } from "../../constants/constant";

export const KakaoApi = {
  GET_KAKAO_ACCESS_TOKEN: async (code: string): Promise<IKakaoAccessTokenResponse> => {
    const response = await axios.post(KAKAO_GET_KAKAO_ACCESS_TOKEN_URL, null, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      params: {
        code: code,
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_KAKAO_API_KEY,
        redirect_url: KAKAO_LOGIN_REDIRECT_URL,
        client_secret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET
      }
    });
    return response.data;
  },
  GET_KAKAO_ACCOUNT: async (kakaoAccessToken: string): Promise<IKakaoAccountResponse> => {
    const response = await axios.post(KAKAO_GET_KAKAO_ACCOUNT_URL, null, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        "Authorization": "Bearer " + kakaoAccessToken
      },
    });
    return response.data;
  }
}