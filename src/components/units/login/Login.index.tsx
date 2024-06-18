import * as S from "./Login.styles";
import { useState, KeyboardEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { UserApi } from "@/src/lib/apis/user/UserApi";
import { AxiosError } from "axios";
import { useSetRecoilState } from "recoil";
import { authState } from "@/src/store/auth";
import { setCredentials } from "@/src/lib/utils/setCredentials";
import { useRouter } from "next/router";
import { useInput } from "@/src/lib/hooks/useInput";
import { emailRegex, passwordRegex } from "@/src/lib/constants/regex";
import { AppPages } from "@/src/lib/constants/appPages";
import KumohHead from "../../shared/layout/head/NextHead.index";
import { errorCodeSpliter } from "@/src/lib/hooks/useApiError";
import { KAKAO_LOGIN_URL } from "@/src/lib/constants/constant";

export default function Login() {
  const [email, onChangeEmail] = useInput();
  const [password, onChangePassword] = useInput();
  const [errorMsg, setErrorMsg] = useState("");
  const setAuth = useSetRecoilState(authState);
  const router = useRouter();
  const { redirect } = router.query;
  const [apiSending, setApiSending] = useState(false);

  const { mutate } = useMutation({
    mutationFn: UserApi.LOGIN,
    onSuccess: (data) => {
      setApiSending(false);
      setCredentials(data);
      setAuth({ isAuthenticated: true, ...data });
      router.replace(redirect ? String(redirect) : AppPages.HOME);
    },
    onError: (error: AxiosError) => {
      setApiSending(false);
      const { errorSort, status, errorNumber, message } =
        errorCodeSpliter(error);
      if (errorSort === "USER" && status === 400 && errorNumber === 2) {
        setErrorMsg(message);
      }
    },
  });

  const onClickLogin = () => {
    if (apiSending) return;
    if (email === "") {
      setErrorMsg("이메일을 입력해주세요.");
      return;
    }
    if (!emailRegex.test(email)) {
      setErrorMsg("올바른 형식의 이메일을 입력해주세요.");
      return;
    }
    if (password === "") {
      setErrorMsg("비밀번호를 입력해주세요.");
      return;
    }
    if (!passwordRegex.test(password)) {
      setErrorMsg("비밀번호는 8자리 이상 영문, 숫자, 특수문자를 사용하세요.");
      return;
    }
    setApiSending(true);
    mutate({ email, password });
  };

  const onActiveEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClickLogin();
    }
  };

  const onClickKakaoLogin = () => {
    if (apiSending) return;
    router.replace(KAKAO_LOGIN_URL);
  }

  return (
    <>
      <KumohHead title="로그인 | 금오거래센터" />
      <S.Wrapper className="flex-center">
        <S.FormWrapper className="flex-column-center">
          <S.Header className="bold28">로그인</S.Header>
          <S.LoginInput
            className="medium18"
            placeholder="이메일"
            type="text"
            onChange={onChangeEmail}
            onKeyDown={onActiveEnter}
          />
          <S.LoginInput
            className="medium18"
            placeholder="비밀번호"
            type="password"
            onChange={onChangePassword}
            onKeyDown={onActiveEnter}
          />
          <S.ErrorMessage className="regular14">{errorMsg}</S.ErrorMessage>
          <S.LoginButton className="bold18" onClick={onClickLogin}>
            로그인
          </S.LoginButton>
          <S.MenuWrapper className="flex-center regular14">
            <a onClick={() => router.push(AppPages.FIND_EMAIL)}>이메일 찾기</a>
            <S.MenuDivider>|</S.MenuDivider>
            <a onClick={() => router.push(AppPages.FIND_PASSWORD)}>
              비밀번호 찾기
            </a>
            <S.MenuDivider>|</S.MenuDivider>
            <a onClick={() => router.push(AppPages.SIGN_UP)}>회원가입</a>
          </S.MenuWrapper>
          <S.SocialLoginButton className="bold18" onClick={onClickKakaoLogin}>
            카카오로 로그인
          </S.SocialLoginButton>
        </S.FormWrapper>
      </S.Wrapper>
    </>
  );
}
