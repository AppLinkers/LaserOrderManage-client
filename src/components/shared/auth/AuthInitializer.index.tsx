import { axiosPrivate } from "@/src/lib/apis/axios";
import { UserAuthority } from "@/src/lib/apis/user/User.types";
import { authState } from "@/src/store/auth";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

interface IAuthInitializerProps {
  children: React.JSX.Element;
}

export default function AuthInitializer({ children }: IAuthInitializerProps) {
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    const authorityList = getCookie("authorityList");
    if (accessToken && authorityList) {
      axiosPrivate.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
      setAuth({
        isAuthenticated: true,
        accessToken: accessToken,
        authorityList: JSON.parse(authorityList) as UserAuthority[],
      });
    }
  }, [setAuth]);

  return <>{children}</>;
}
