import {
  useInputWithError,
  useInputWithMaxLength,
} from "@/src/lib/hooks/useInput";
import SignUpInput from "../../commons/inputs/signup/SingUpInput.index";
import Spacer from "../../commons/spacer/Spacer.index";
import * as S from "./SignUp.styles";
import {
  emailRegex,
  numberRegex,
  passwordRegex,
  phoneRegex,
} from "@/src/lib/constants/regex";
import { useState } from "react";
import { Address } from "react-daum-postcode";
import { useRouter } from "next/router";
import { useDaumPostPopup } from "@/src/lib/hooks/useDaumPostPopup";
import { useMutation } from "@tanstack/react-query";
import { UserApi } from "@/src/lib/apis/user/UserApi";
import { AxiosError } from "axios";
import { useToastify } from "@/src/lib/hooks/useToastify";
import { IJoinRequest } from "@/src/lib/apis/user/User.types";
import { AppPages } from "@/src/lib/constants/appPages";
import KumohHead from "../../shared/layout/head/NextHead.index";
import { errorCodeSpliter } from "@/src/lib/hooks/useApiError";

export default function SignUp() {
  const [sendCode, setSendCode] = useState(false);
  const [codeSending, setCodeSending] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const emailInputArgs = useInputWithError(
    "이메일을 인증해주세요.",
    (value: string) => emailRegex.test(value),
    (value: string) => sendCode && emailRegex.test(value),
  );

  const [codeChecked, setCodeChecked] = useState(false);
  const codeInputArgs = useInputWithError(
    "인증 코드를 다시 확인해주세요.",
    (value: string) => value.length === 6,
    (value: string) => sendCode && codeChecked && value.length === 6,
  );

  const passwordInputArgs = useInputWithError(
    "영문, 숫자, 특수문자를 조합하여 8자리 이상 입력해주세요.",
    (value: string) => passwordRegex.test(value),
    (value: string) => passwordRegex.test(value),
  );

  const rePasswordInputArgs = useInputWithError(
    "비밀번호가 일치하지 않습니다.",
    (value: string) => value === passwordInputArgs.value,
    (value: string) => value !== "" && value === passwordInputArgs.value,
  );

  const nameInputArgs = useInputWithError(
    "이름을 입력해주세요.",
    (value: string) => value.length > 1,
    (value: string) => value.length > 1,
  );

  const phoneInputArgs = useInputWithError(
    "올바른 휴대폰 번호를 입력해주세요.",
    (value: string) => phoneRegex.test(value),
    (value: string) => phoneRegex.test(value),
    numberRegex,
  );

  const companyInputArgs = useInputWithMaxLength(10);

  const [zoneCode, setZoneCode] = useState("");
  const addressInputArgs = useInputWithError(
    "주소를 입력해주세요.",
    (value: string) => value !== "",
    (value: string) => value !== "",
  );

  const detailAddressInputArgs = useInputWithMaxLength(30);

  const addressCallback = (data: Address) => {
    setZoneCode(data.zonecode);
    addressInputArgs.setValue(data.address);
    addressInputArgs.hideError();
  };
  const openPostPopup = useDaumPostPopup(addressCallback);
  const { setToast } = useToastify();
  const router = useRouter();

  const requestVerifyMutate = useMutation({
    mutationFn: UserApi.REQUEST_VERIFY,
    onSuccess: (data) => {
      setCodeSending(false);
      if (data.status === "001" && data.email) {
        //이메일 중복인 경우 => 이미 회원인 경우
        emailInputArgs.showError("이미 존재하는 회원입니다.");
        return;
      }
      if (data.status === "002") {
        setToast({ comment: "메일로 인증 코드를 전송했어요" });
        setSendCode(true);
        emailInputArgs.hideError();
        codeInputArgs.hideError();
      }
    },
    onError: (error: AxiosError) => {
      setCodeSending(false);
      const { errorSort, status, errorNumber } = errorCodeSpliter(error);
      if (errorSort === "COMMON" && status === 500 && errorNumber === 3) {
        emailInputArgs.showError("메일 전송이 불가능해요");
      }
    },
  });

  const verifyEmailMutate = useMutation({
    mutationFn: UserApi.VERIFY_EMAIL,
    onSuccess: (data) => {
      if (data.status === "002") {
        setToast({ comment: "메일 인증을 성공했어요" });
        emailInputArgs.setValue(sentEmail);
        setCodeChecked(true);
        codeInputArgs.hideError();
      }
    },
    onError: (error: AxiosError) => {
      const { errorSort, status, errorNumber } = errorCodeSpliter(error);
      if (errorSort === "USER") {
        if (status === 401 && errorNumber === 7) {
          codeInputArgs.showError();
        }
        if (status === 404 && errorNumber === 2) {
          codeInputArgs.showError("인증 코드를 재전송해주세요.");
        }
      }
    },
  });

  const joinMutate = useMutation({
    mutationFn: UserApi.JOIN,
    onSuccess: (data) => {
      if (data.status === "003") {
        setToast({ comment: "회원가입을 완료했어요" });
        router.replace(AppPages.LOGIN);
      }
    },
  });

  const sendCodeToEmail = () => {
    if (!emailInputArgs.isCorrect) {
      emailInputArgs.showError();
      return;
    }
    if (!codeSending) {
      setCodeSending(true);
      setSentEmail(emailInputArgs.value);
      setToast({ comment: "인증 코드 전송중..." });
      requestVerifyMutate.mutate(emailInputArgs.value);
    }
  };

  const checkEmailCode = () => {
    if (codeInputArgs.isCorrect) {
      verifyEmailMutate.mutate({ email: sentEmail, code: codeInputArgs.value });
    }
  };

  const joinAccount = () => {
    const emailPass = emailInputArgs.passError();
    const codePass = codeInputArgs.passError();
    const passwordPass = passwordInputArgs.passError();
    const rePasswordPass = rePasswordInputArgs.passError();
    const namePass = nameInputArgs.passError();
    const phonePass = phoneInputArgs.passError();
    const addressPass = addressInputArgs.passError();
    if (
      !(
        emailPass &&
        codePass &&
        passwordPass &&
        rePasswordPass &&
        namePass &&
        phonePass &&
        addressPass
      )
    ) {
      return;
    }
    const payload: IJoinRequest = {
      email: emailInputArgs.value.trim(),
      password: passwordInputArgs.value.trim(),
      name: nameInputArgs.value.trim(),
      companyName:
        companyInputArgs.value.trim() !== ""
          ? companyInputArgs.value.trim()
          : null,
      phone: phoneInputArgs.value.trim(),
      zipCode: zoneCode,
      address: addressInputArgs.value,
      detailAddress:
        detailAddressInputArgs.value.trim() !== ""
          ? detailAddressInputArgs.value.trim()
          : null,
    };
    joinMutate.mutate(payload);
  };

  return (
    <>
      <KumohHead title="회원가입 | 금오거래센터" />
      <S.Wrapper className="flex-center">
        <S.FormWrapper className="flex-column-center">
          <S.Header className="bold28">회원가입</S.Header>
          <SignUpInput
            placeHolder="이메일"
            needDefaultSpace={false}
            editable={!codeChecked && !codeSending}
            isError={emailInputArgs.error}
            errorMessage={emailInputArgs.errorMessage}
            tailButtonTitle={
              codeChecked ? "인증완료" : sendCode ? "재요청" : "인증요청"
            }
            tailButtonValidate={emailInputArgs.isCorrect && !codeChecked}
            onChange={emailInputArgs.onChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendCodeToEmail();
            }}
            onClickTailButton={sendCodeToEmail}
          />
          {sendCode && !codeChecked ? (
            <SignUpInput
              placeHolder="이메일 인증 코드"
              needDefaultSpace
              maxLength={6}
              editable={!codeChecked}
              isError={codeInputArgs.error}
              errorMessage={codeInputArgs.errorMessage}
              tailButtonTitle="확인"
              tailButtonValidate={codeInputArgs.isCorrect}
              onChange={codeInputArgs.onChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") checkEmailCode();
              }}
              onClickTailButton={checkEmailCode}
            />
          ) : (
            <Spacer width="100%" height="24px" />
          )}
          <SignUpInput
            placeHolder="비밀번호"
            hideInput
            editable
            isError={
              passwordInputArgs.errorWithEmpty || passwordInputArgs.error
            }
            errorMessage={passwordInputArgs.errorMessage}
            needDefaultSpace
            onChange={passwordInputArgs.onChange}
          />
          <SignUpInput
            placeHolder="비밀번호 확인"
            hideInput
            editable
            needDefaultSpace
            isError={
              (passwordInputArgs.value !== "" &&
                rePasswordInputArgs.errorWithEmpty) ||
              rePasswordInputArgs.error
            }
            errorMessage={rePasswordInputArgs.errorMessage}
            onChange={rePasswordInputArgs.onChange}
          />
          <SignUpInput
            placeHolder="이름"
            editable
            needDefaultSpace
            value={nameInputArgs.value}
            isError={nameInputArgs.error}
            errorMessage={nameInputArgs.errorMessage}
            maxLength={10}
            onChange={nameInputArgs.onChange}
          />
          <SignUpInput
            placeHolder="휴대폰 번호 (숫자만 입력해주세요)"
            editable
            needDefaultSpace
            value={phoneInputArgs.value}
            isError={phoneInputArgs.error}
            errorMessage={phoneInputArgs.errorMessage}
            onChange={phoneInputArgs.onChange}
          />
          <SignUpInput
            placeHolder="업체명 (선택)"
            editable
            needDefaultSpace
            value={companyInputArgs.value}
            maxLength={20}
            onChange={companyInputArgs.onChange}
          />
          <SignUpInput
            placeHolder="주소 (배송지)"
            value={addressInputArgs.value}
            editable
            readonly
            tailButtonTitle="검색하기"
            isError={addressInputArgs.error}
            errorMessage={addressInputArgs.errorMessage}
            needDefaultSpace={false}
            onClickInput={openPostPopup}
          />
          <SignUpInput
            placeHolder="상세 주소 (선택)"
            value={detailAddressInputArgs.value}
            editable
            needDefaultSpace={false}
            maxLength={30}
            onChange={detailAddressInputArgs.onChange}
          />
          <Spacer width="100%" height="100px" />
          <S.SignUpButton className="bold18" onClick={joinAccount}>
            가입하기
          </S.SignUpButton>
        </S.FormWrapper>
      </S.Wrapper>
    </>
  );
}
