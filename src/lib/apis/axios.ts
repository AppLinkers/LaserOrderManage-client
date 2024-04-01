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
import { BASE_URL } from "../constants/constant";
import { errorCodeSpliter } from "../hooks/useApiError";

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
  if (config.url === "/user/re-issue") {
    config.headers.setAuthorization('');
    return config;
  }
  const token = getCookie("accessToken");
  if (token) {
    config.headers.setAuthorization(`Bearer ${token}`);
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
    const { errorSort, status, errorNumber } = errorCodeSpliter(error);

    if (errorSort === "USER" && status === 401 && errorNumber === 2) {
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

const makeCookieString = (token: IToken) => {
  return `refreshToken=${token.refreshToken}; Path=/; domain:.kumoh.org; max-age=${token.refreshToken}; secure=true; SameSite=None`;
};
