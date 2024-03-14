import Spacer from "@/src/components/commons/spacer/Spacer.index";
import * as S from "./OrderDetailSection.styles";
import EditIcon from "@/src/components/commons/icons/EditIcon.index";
import styled from "@emotion/styled";
import { getDate } from "@/src/lib/utils/utils";
import { IPurchaseOrderInfoSectionProps } from "./OrderDetailSection.types";
import { useState } from "react";
import PurchaseOrderModal from "@/src/components/commons/modal/detail/PurchaseOrderModal.index";
import { IDetailPurchaseOrder } from "@/src/lib/apis/order/detail/OrderDetail.types";
import OrderDetailBottombar from "../bottombar/OrderDetailBottombar.index";

export default function PurchaseOrderInfoSection({
  data,
  name,
  authorityList,
  status,
  orderId,
  minDate,
  scrollPage,
}: IPurchaseOrderInfoSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [purchaseOrder, setPurchaseOrder] = useState(data);

  const editPurchaseOrderCallback = (
    newPurchaseOrder: IDetailPurchaseOrder,
  ) => {
    setPurchaseOrder(newPurchaseOrder);
  };
  return (
    <>
      <S.Wrapper>
        <S.TitleWrapper className="flex-row-between">
          <S.Title className="bold18">발주서</S.Title>
          {authorityList.includes("ROLE_CUSTOMER") && status === "견적 승인" && (
            <S.EditBox className="flex-row" onClick={() => setShowModal(true)}>
              <EditIcon size={20} />
              <Spacer width="5px" height="100%" />
              <S.EditBoxText className="regular16">
                발주서 추가/수정하기
              </S.EditBoxText>
            </S.EditBox>
          )}
        </S.TitleWrapper>
        <S.Section className="flex-row">
          {purchaseOrder === null ? (
            <EmptyPurchaseOrder className="regular16 flex-center">
              {authorityList.includes("ROLE_CUSTOMER") && status === "견적 승인"
                ? "발주서를 추가해주세요"
                : "아직 발주서가 등록되지 않았어요"}
            </EmptyPurchaseOrder>
          ) : (
            <>
              <PurchaseOrderName
                className="medium20 flex-column"
                href={purchaseOrder.fileUrl}
                download={true}
                target="_blank"
              >
                {purchaseOrder.fileName}
              </PurchaseOrderName>

              <S.SideWrapper>
                <S.SideBox>
                  <S.SideLabel className="regular14">발행 일자</S.SideLabel>
                  <S.SideContent className="regular14">
                    {getDate(purchaseOrder.createdAt)}
                  </S.SideContent>
                </S.SideBox>
                <S.SideBox>
                  <S.SideLabel className="regular14">검수 기간</S.SideLabel>
                  <S.SideContent className="regular14">{`~ ${getDate(
                    purchaseOrder.inspectionPeriod,
                  )}`}</S.SideContent>
                </S.SideBox>
                <S.SideBox>
                  <S.SideLabel className="regular14">지급 일자</S.SideLabel>
                  <S.SideContent className="bold16">
                    {getDate(purchaseOrder.paymentDate)}
                  </S.SideContent>
                </S.SideBox>
              </S.SideWrapper>
            </>
          )}
        </S.Section>
        {purchaseOrder && (
          <PurchaseOrderWrapper>
            <p className="bold16">검수 조건</p>
            <Spacer width="100%" height="16px" />
            <PurchaseOrder className="regular16">
              {purchaseOrder.inspectionCondition}
            </PurchaseOrder>
          </PurchaseOrderWrapper>
        )}
      </S.Wrapper>
      <PurchaseOrderModal
        isOpen={showModal}
        data={purchaseOrder}
        orderId={orderId}
        minDate={minDate}
        callback={editPurchaseOrderCallback}
        onClose={() => setShowModal(false)}
      />
      <OrderDetailBottombar
        showCondition={
          authorityList.includes("ROLE_CUSTOMER") &&
          status === "견적 승인" &&
          purchaseOrder === null
        }
        announce={`${name}님, 발주서를 추가해주세요!`}
        buttonText="발주서 추가하기"
        onButton={scrollPage}
      />
    </>
  );
}

const PurchaseOrderName = styled.a`
  flex-grow: 1;
  padding-right: 24px;
  text-decoration: underline;
  border-bottom: 1px solid var(--color-mediumGray);
`;

const PurchaseOrderWrapper = styled.div`
  width: 100%;
  min-height: 200px;
  padding-block: 24px;
  border-bottom: 2px solid var(--color-mediumGray);
`;

const PurchaseOrder = styled.p``;

const EmptyPurchaseOrder = styled.p`
  width: 100%;
  height: 234px;
`;
