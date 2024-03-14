import Spacer from "@/src/components/commons/spacer/Spacer.index";
import * as S from "./OrderDetailSection.styles";
import EditIcon from "@/src/components/commons/icons/EditIcon.index";
import styled from "@emotion/styled";
import { getCost, getDate } from "@/src/lib/utils/utils";
import { IQuotationInfoSectionProps } from "./OrderDetailSection.types";
import { useState } from "react";
import QuotationModal from "@/src/components/commons/modal/detail/QuotationModal.index";
import { IDetailQuotation } from "@/src/lib/apis/order/detail/OrderDetail.types";
import OrderDetailBottombar from "../bottombar/OrderDetailBottombar.index";

export default function QuotationInfoSection({
  sectionRef,
  data,
  authorityList,
  status,
  orderId,
  scrollPage,
}: IQuotationInfoSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [quotation, setQuotation] = useState(data);

  const editQuotationCallback = (newQuotation: IDetailQuotation) => {
    setQuotation(newQuotation);
  };

  return (
    <>
      <S.Wrapper ref={sectionRef}>
        <S.TitleWrapper className="flex-row-between">
          <S.Title className="bold18">견적서</S.Title>
          {authorityList.includes("ROLE_FACTORY") && status === "견적 대기" && (
            <S.EditBox className="flex-row" onClick={() => setShowModal(true)}>
              <EditIcon size={20} />
              <Spacer width="5px" height="100%" />
              <S.EditBoxText className="regular16">
                견적서 추가/수정하기
              </S.EditBoxText>
            </S.EditBox>
          )}
        </S.TitleWrapper>
        <S.Section className="flex-row">
          {quotation === null ? (
            <EmptyQuotation className="regular16 flex-center">
              {authorityList.includes("ROLE_FACTORY") && status === "견적 대기"
                ? "견적서를 추가해주세요"
                : "아직 견적서가 등록되지 않았어요"}
            </EmptyQuotation>
          ) : (
            <>
              <QuotationName
                className="medium20 flex-column"
                href={quotation.fileUrl}
                download={true}
                target="_blank"
              >
                {quotation.fileName}
              </QuotationName>
              <S.SideWrapper>
                <S.SideBox>
                  <S.SideLabel className="regular14">발행 일자</S.SideLabel>
                  <S.SideContent className="regular14">
                    {getDate(quotation.createdAt)}
                  </S.SideContent>
                </S.SideBox>
                <S.SideBox>
                  <S.SideLabel className="regular14">납기일</S.SideLabel>
                  <S.SideContent className="regular14">
                    {getDate(quotation.deliveryDate)}
                  </S.SideContent>
                </S.SideBox>
                <S.SideBox>
                  <S.SideLabel className="regular14">총 견적 비용</S.SideLabel>
                  <S.SideContent className="bold16">
                    {getCost(quotation.totalCost)}
                  </S.SideContent>
                </S.SideBox>
              </S.SideWrapper>
            </>
          )}
        </S.Section>
      </S.Wrapper>
      <QuotationModal
        isOpen={showModal}
        data={quotation}
        orderId={orderId}
        callback={editQuotationCallback}
        onClose={() => setShowModal(false)}
      />
      <OrderDetailBottombar
        showCondition={
          authorityList.includes("ROLE_FACTORY") &&
          status === "견적 대기" &&
          quotation === null
        }
        announce="견적서를 추가해주세요!"
        buttonText="견적서 추가하기"
        onButton={scrollPage}
      />
    </>
  );
}

const QuotationName = styled.a`
  flex-grow: 1;
  padding-right: 24px;
  text-decoration: underline;
  cursor: pointer;
`;

const EmptyQuotation = styled.p`
  width: 100%;
  height: 234px;
`;
