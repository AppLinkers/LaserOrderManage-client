import * as S from "./Login.styles";
import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { UserApi } from "@/src/lib/apis/user/UserApi";
import { AxiosError } from "axios";
import { IHttpStatus } from "@/src/lib/apis/axios";
import { useSetRecoilState } from "recoil";
import { authState } from "@/src/store/auth";
import { setCredentials } from "@/src/lib/utils/setCredentials";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const setAuth = useSetRecoilState(authState);
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: UserApi.LOGIN,
    onSuccess: (data) => {
      setCredentials(data);
      setAuth({ isAuthenticated: true, ...data });
      router.replace("/");
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        const status = error.response.data as IHttpStatus;
        setErrorMsg(status.message);
      }
    },
  });

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const emailRegex = new RegExp(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  );

  const onClickLogin = () => {
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
    mutate({ email, password });
  };

  return (
    <S.Wrapper className="flex-center">
      <S.FormWrapper className="flex-column-center">
        <S.Header className="bold28">로그인</S.Header>
        <S.LoginInput
          className="medium18"
          placeholder="이메일"
          type="text"
          onChange={onChangeEmail}
        />
        <S.LoginInput
          className="medium18"
          placeholder="비밀번호"
          type="password"
          onChange={onChangePassword}
        />
        <S.ErrorMessage className="regular14">{errorMsg}</S.ErrorMessage>
        <S.LoginButton className="bold18" onClick={onClickLogin}>
          로그인
        </S.LoginButton>
        <S.MenuWrapper className="flex-center regular14">
          <a>이메일 찾기</a>
          <S.MenuDivider>|</S.MenuDivider>
          <a>비밀번호 찾기</a>
          <S.MenuDivider>|</S.MenuDivider>
          <a>회원가입</a>
        </S.MenuWrapper>
      </S.FormWrapper>
    </S.Wrapper>
  );
}
