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

export default function SignUp() {
  const router = useRouter();
  const { redirect, code, state } = router.query;
  const { setToast } = useToastify();

  useEffect(() => {
    // 서버에 인가코드 전송 및 처리 
    if (state == "kakao" && code !== null) {
      // 기본 계정 존재 시, -> toast 로 안내
      // 카카오 계정 존재 시, -> token 정보 저장 및 redirect
      // 카카오 계정 존재 X, -> 회원가입 진행 (정보 설정)
    }
  })

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
          />
          <Spacer width="100%" height="24px" />
          <SignUpInput
            placeHolder="이름"
            editable={false}
            needDefaultSpace={false}
          />
          <SignUpInput
            placeHolder="휴대폰 번호 (숫자만 입력해주세요)"
            editable={false}
            needDefaultSpace={false}
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
          <S.SignUpButton className="bold18" onClick={() => {}}>
            가입하기
          </S.SignUpButton>
        </S.FormWrapper>
      </S.Wrapper>
    </>
  );
}