import { IToken } from "../apis/user/User.types";
import { axiosPrivate } from "../apis/axios";
import { setCookie, deleteCookie } from "cookies-next";

export const setCredentials = (token: IToken) => {
  axiosPrivate.defaults.headers.common[
    "Authorization"
  ] = `${token.grantType} ${token.accessToken}`;

  setCookie("refreshToken", token.refreshToken, {
    maxAge: token.refreshTokenExpirationTime / 1000,
    domain: ".kumoh.org",
    secure: true,
    sameSite: "none",
    path: "/",
  });
  setCookie("accessToken", token.accessToken, {
    maxAge: token.accessTokenExpirationTime / 1000,
  });
  setCookie("authorityList", token.authorityList);
};

export const resetCredentials = () => {
  axiosPrivate.defaults.headers.common["Authorization"] = "";
  deleteCookie("refreshToken");
  deleteCookie("accessToken");
  deleteCookie("authorityList");
};
