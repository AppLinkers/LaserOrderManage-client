import * as S from "../SignUp.styles";
import KumohHead from "../../../shared/layout/head/NextHead.index";
import SignUpInput from "@/src/components/commons/inputs/signup/SingUpInput.index";
import Spacer from "@/src/components/commons/spacer/Spacer.index";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useInputWithError, useInputWithMaxLength } from "@/src/lib/hooks/useInput";
import { Address } from "react-daum-postcode";
import { useDaumPostPopup } from "@/src/lib/hooks/useDaumPostPopup";
import { useToastify } from "@/src/lib/hooks/useToastify";
import { useMutation } from "@tanstack/react-query";
import { UserApi } from "@/src/lib/apis/user/UserApi";
import { setCredentials } from "@/src/lib/utils/setCredentials";
import { useSetRecoilState } from "recoil";
import { authState } from "@/src/store/auth";
import { AppPages } from "@/src/lib/constants/appPages";
import { AxiosError } from "axios";
import { errorCodeSpliter } from "@/src/lib/hooks/useApiError";
import { KakaoApi } from "@/src/lib/apis/external/KakaoApi";
import { formattedPhoneNumber } from "@/src/lib/utils/utils";
import { IKakaoJoinRequest } from "@/src/lib/apis/user/User.types";

export default function SignUp() {
  const router = useRouter();
  const setAuth = useSetRecoilState(authState);
  const { code } = router.query;
  const { setToast } = useToastify();
  const [kakaoAccessToken, setKakaoAccessToken] = useState("");

  const { mutate: getKakaoAccessTokenMutate } = useMutation({
    mutationFn: KakaoApi.GET_KAKAO_ACCESS_TOKEN,
    onSuccess: (data) => {
      // 카카오 Token 을 활용한 카카오 로그인 수행
      setKakaoAccessToken(data.access_token);
    }
  })

  const { mutate: getKakaoAccountMutate } = useMutation({
    mutationFn: KakaoApi.GET_KAKAO_ACCOUNT,
    onSuccess: (data) => {
      setEmail(data.kakao_account.email);
      setName(data.kakao_account.name);
      setPhone(formattedPhoneNumber(data.kakao_account.phone_number));
    }
  })

  const { mutate: kakaoLoginMutate } = useMutation({
    mutationFn: UserApi.KAKAO_LOGIN,
    onSuccess: (data) => {
      setCredentials(data);
      setAuth({ isAuthenticated: true, ...data });
      router.replace(AppPages.HOME);
    },
    onError: (error: AxiosError) => {
      const { errorSort, status, errorNumber, message } = errorCodeSpliter(error);
      if (errorSort === "USER" && status === 400 && errorNumber === 4) {
        setToast({comment: "동일한 이메일의 계정이 존재합니다."});
        router.push(AppPages.LOGIN);
      }
      if (errorSort === "USER" && status === 404 && errorNumber === 1){
        // 회원 정보 수신 및 설정
        getKakaoAccountMutate(kakaoAccessToken);
      }
    },
  });

  useEffect(() => {
    if (code !== undefined && !Array.isArray(code)) {
      // 카카오 인가코드를 활용한 카카오 Token 받기
      getKakaoAccessTokenMutate(code);
    }
  }, [code]);

  useEffect(() => {
    if (kakaoAccessToken) {
      kakaoLoginMutate({kakaoAccessToken});
    }
  }, [kakaoAccessToken]);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

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

  const kakaoJoinMutate = useMutation({
    mutationFn: UserApi.KAKAO_JOIN,
    onSuccess: (data) => {
      if (data.status === "003") {
        setToast({ comment: "회원가입을 완료했어요" });
        router.replace(AppPages.LOGIN);
      }
    },
  });

  const joinAccount = () => {
    const addressPass = addressInputArgs.passError();
    if (
      !(addressPass)
    ) {
      return;
    }
    const payload: IKakaoJoinRequest = {
      email: email.trim(),
      name: name.trim(),
      companyName:
        companyInputArgs.value.trim() !== ""
          ? companyInputArgs.value.trim()
          : null,
      phone: phone.trim(),
      zipCode: zoneCode,
      address: addressInputArgs.value,
      detailAddress:
        detailAddressInputArgs.value.trim() !== ""
          ? detailAddressInputArgs.value.trim()
          : null,
    };
    kakaoJoinMutate.mutate(payload);
  };

  return (
    <>
      <KumohHead title="카카오 회원가입 | 금오거래센터" />
      <S.Wrapper className="flex-center">
        <S.FormWrapper className="flex-column-center">
          <S.Header className="bold28">카카오로 가입하기</S.Header>
          <SignUpInput
            placeHolder="이메일"
            needDefaultSpace={false}
            editable={false}
            value={email}
          />
          <Spacer width="100%" height="24px" />
          <SignUpInput
            placeHolder="이름"
            editable={false}
            needDefaultSpace={false}
            value={name}
          />
          <SignUpInput
            placeHolder="휴대폰 번호 (숫자만 입력해주세요)"
            editable={false}
            needDefaultSpace={false}
            value={phone}
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