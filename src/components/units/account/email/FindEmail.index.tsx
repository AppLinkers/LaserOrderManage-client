import AccountInput from "@/src/components/commons/inputs/account/AccountInput.index";
import Spacer from "@/src/components/commons/spacer/Spacer.index";
import KumohHead from "@/src/components/shared/layout/head/NextHead.index";
import * as S from "@/src/components/units/account/Accout.styles";
import { IFindEmailResponse } from "@/src/lib/apis/user/User.types";
import { UserApi } from "@/src/lib/apis/user/UserApi";
import { AppPages } from "@/src/lib/constants/appPages";
import { numberRegex, phoneRegex } from "@/src/lib/constants/regex";
import { useInputWithError } from "@/src/lib/hooks/useInput";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { getSignupMethod } from "@/src/lib/utils/utils";

export default function FindEmail() {
  const [result, setResult] = useState<IFindEmailResponse | null>(null);
  const router = useRouter();

  const nameInputArgs = useInputWithError(
    "이름은 두 글자 이상입니다",
    (value: string) => value.length > 1,
    (value: string) => value.length > 1,
  );

  const phoneInputArgs = useInputWithError(
    "올바른 휴대폰 번호를 입력해주세요.",
    (value: string) => phoneRegex.test(value),
    (value: string) => phoneRegex.test(value),
    numberRegex,
  );

  const { mutate } = useMutation({
    mutationFn: UserApi.FIND_EMAIL,
    onSuccess: (data) => {
      setResult(data);
    },
  });

  const findEmail = () => {
    const namePass = nameInputArgs.passError();
    const phonePass = phoneInputArgs.passError();
    if (!(namePass && phonePass)) return;
    mutate({
      name: nameInputArgs.value.trim(),
      phone: phoneInputArgs.value.trim(),
    });
  };

  return (
    <>
      <KumohHead title="이메일 찾기 | 금오거래센터" />
      <S.Wrapper className="flex-center">
        <S.FormWrapper>
          <S.Title className="bold28">이메일 찾기</S.Title>
          <Spacer width="100%" height="52px" />
          {result === null && (
            <>
              <AccountInput
                placeholder="이름"
                maxLength={20}
                value={nameInputArgs.value}
                isError={nameInputArgs.error}
                errorMessage={nameInputArgs.errorMessage}
                onChange={nameInputArgs.onChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") findEmail();
                }}
              />
              <Spacer width="100%" height="14px" />
              <AccountInput
                placeholder="휴대폰 번호 (숫자만 입력해주세요)"
                value={phoneInputArgs.value}
                isError={phoneInputArgs.error}
                errorMessage={phoneInputArgs.errorMessage}
                onChange={phoneInputArgs.onChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") findEmail();
                }}
              />
              <Spacer width="100%" height="40px" />
              <S.Button className="bold18" onClick={findEmail}>
                이메일 찾기
              </S.Button>
            </>
          )}
          {result && result.totalElements !== 0 && (
            <>
              <S.ResultWrapper>
                <p className="regular14">{`${nameInputArgs.value}님의 이메일`}</p>
                <Spacer width="100%" height="20px" />
                <div>
                  {result.contents.map((el) => (
                    <S.ResultItem key={el.email}>
                      <S.Result className="bold18">{`(${getSignupMethod(el.signupMethod)}) ${el.email}`}</S.Result>
                    </S.ResultItem>
                  ))}
                </div>
              </S.ResultWrapper>
              <Spacer width="100%" height="40px" />
              <div className="flex-row">
                <S.SubButton
                  className="bold18"
                  onClick={() => router.replace(AppPages.FIND_PASSWORD)}
                >
                  비밀번호 찾기
                </S.SubButton>
                <Spacer width="10px" height="100%" />
                <S.Button
                  className="bold18"
                  onClick={() => router.replace(AppPages.LOGIN)}
                >
                  로그인
                </S.Button>
              </div>
            </>
          )}
          {result && result.totalElements === 0 && (
            <>
              <S.ResultWrapper>
                <p className="medium16">가입한 내역이 없습니다</p>
                <Spacer width="100%" height="60px" />
                <div className="flex-row">
                  <S.SubButton
                    className="bold18"
                    onClick={() => setResult(null)}
                  >
                    다시 찾기
                  </S.SubButton>
                  <Spacer width="10px" height="100%" />
                  <S.Button
                    className="bold18"
                    onClick={() => router.replace(AppPages.LOGIN)}
                  >
                    로그인
                  </S.Button>
                </div>
              </S.ResultWrapper>
            </>
          )}
        </S.FormWrapper>
      </S.Wrapper>
    </>
  );
}
