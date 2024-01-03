import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  isAxiosError,
} from "axios";
import { UserApi } from "./user/UserApi";
import { setCredentials } from "../utils/setCredentials";
import { IToken } from "./user/User.types";
import { getCookie } from "cookies-next";

const BASE_URL = "https://api.kumoh.org";

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosPrivate.interceptors.request.use((config) => {
  const token = getCookie("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (!isAxiosError(error)) {
      return Promise.reject(error);
    }

    const origin = error.config as AxiosRequestConfig;
    const status = Number(error.response?.status);

    if (status === 401) {
      const newToken = await UserApi.REISSUE();
      setCredentials(newToken);
      const cookieString = makeCookieString(newToken);
      axiosPrivate.defaults.headers.Cookie = cookieString;
      (origin.headers as AxiosHeaders).set("set-cookie", cookieString);
      (origin.headers as AxiosHeaders).set(
        "Authorization",
        `${newToken.grantType} ${newToken.accessToken}`,
      );

      return axios(origin);
    }

    return Promise.reject(error);
  },
);

export const makeCookieString = (token: IToken) => {
  return `refreshToken=${token.refreshToken}; Path=/; domain:.kumoh.org; max-age=${token.refreshToken}; secure=true; SameSite=None`;
};

export interface IHttpStatus {
  errorCode: string;
  httpStatus: string;
  message: string;
}
