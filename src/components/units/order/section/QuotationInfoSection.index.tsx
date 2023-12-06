import Spacer from "@/src/components/commons/spacer/Spacer.index";
import * as S from "./OrderDetailSection.styles";
import EditIcon from "@/src/components/commons/icons/EditIcon.index";
import styled from "@emotion/styled";
import { RefObject } from "react";
import { IDetailQuotation } from "@/src/lib/apis/order/detail/OrderDetail.types";
import { getCost, getDate } from "@/src/lib/utils/utils";

interface IQuotationInfoSectionProps {
  sectionRef: RefObject<HTMLDivElement>;
  data: IDetailQuotation | null;
}

export default function QuotationInfoSection({
  sectionRef,
  data,
}: IQuotationInfoSectionProps) {
  const getFileUrl = (url: string) => {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 1];
  };

  const onEditQuotation = () => {};
  return (
    <S.Wrapper ref={sectionRef}>
      <S.TitleWrapper className="flex-row-between">
        <S.Title className="bold18">견적서</S.Title>
        <S.EditBox className="flex-row" onClick={onEditQuotation}>
          <EditIcon size={20} />
          <Spacer width="5px" height="100%" />
          <S.EditBoxText className="regular16">
            견적서 추가/수정하기
          </S.EditBoxText>
        </S.EditBox>
      </S.TitleWrapper>
      <S.Section className="flex-row">
        {data === null ? (
          <EmptyQuotation className="regular16 flex-center">
            아직 견적서가 등록되지 않았어요
          </EmptyQuotation>
        ) : (
          <>
            <QuotationName
              className="medium20 flex-column"
              href={data.fileUrl}
              download={true}
              target="_blank"
            >
              {getFileUrl(data.fileUrl)}
            </QuotationName>
            <S.SideWrapper>
              <S.SideBox>
                <S.SideLabel className="regular14">발행 일자</S.SideLabel>
                <S.SideContent className="regular14">
                  {getDate(data.createdAt)}
                </S.SideContent>
              </S.SideBox>
              <S.SideBox>
                <S.SideLabel className="regular14">납기일</S.SideLabel>
                <S.SideContent className="regular14">
                  {getDate(data.deliveryDate)}
                </S.SideContent>
              </S.SideBox>
              <S.SideBox>
                <S.SideLabel className="regular14">총 견적 비용</S.SideLabel>
                <S.SideContent className="bold16">
                  {getCost(data.totalCost)}
                </S.SideContent>
              </S.SideBox>
            </S.SideWrapper>
          </>
        )}
      </S.Section>
    </S.Wrapper>
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
