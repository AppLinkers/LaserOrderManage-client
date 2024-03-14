import { useState } from "react";
import * as S from "./OrderDetailSection.styles";
import styled from "@emotion/styled";
import { IUrgentSectionProps } from "./OrderDetailSection.types";
import { IDetailUrgentRequest } from "@/src/lib/apis/order/detail/OrderDetail.types";
import { useMutation } from "@tanstack/react-query";
import { OrderDetailApi } from "@/src/lib/apis/order/detail/OrderDetailApi";
import { useToastify } from "@/src/lib/hooks/useToastify";

const URGENT_SELECT = [
  { status: false, name: "일반 거래" },
  { status: true, name: "긴급 거래" },
];

export default function UrgentSection({
  isUrgent,
  orderId,
  authorityList
}: IUrgentSectionProps) {
  const [selectStatus, setSelectStatus] = useState(isUrgent);
  const { setToast } = useToastify();
  const [apiSending, setApiSending] = useState(false);

  const { mutate } = useMutation({
    mutationFn: OrderDetailApi.PATCH_ORDER_URGENT,
    onError: () => {
      setApiSending(false);
      setToast({ comment: "거래 상태를 변경할 수 없어요" });
    },
  });

  const onSelect = (status: boolean) => {
    if (apiSending) return;
    if (status !== selectStatus) {
      const payload: IDetailUrgentRequest = {
        isUrgent: status,
      };
      setApiSending(true);
      mutate(
        { id: orderId, payload: payload },
        {
          onSuccess: () => {
            setApiSending(false);
            setSelectStatus(status);
            setToast({
              comment: status
                ? "긴급 거래로 설정했어요"
                : "일반 거래로 설정했어요",
            });
          },
        },
      );
    }
  };

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.Title className="bold18">긴급 거래 설정</S.Title>
      </S.TitleWrapper>
      <div className="flex-row">
        {URGENT_SELECT.map((el) => (
          <UrgentSelect
            className="medium16 flex-center"
            isSelect={el.status === selectStatus}
            key={el.name}
            onClick={() => {authorityList.includes("AUTHORITY_ADMIN") ? onSelect(el.status) : {}}}
          >
            {el.name}
          </UrgentSelect>
        ))}
      </div>
    </S.Wrapper>
  );
}

interface IUrgentSelectProps {
  isSelect: boolean;
}

const UrgentSelect = styled.p<IUrgentSelectProps>`
  width: 100px;
  height: 45px;
  margin-right: 15px;
  color: ${(props) =>
    props.isSelect ? "var(--color-primary)" : "var(--color-normalGray)"};
  border: 1px solid
    ${(props) =>
      props.isSelect ? "var(--color-primary)" : "var(--color-mediumGray)"};
  border-radius: var(--border-radius);
  transition: all ease 0.3s;
  cursor: pointer;

  &:last-of-type {
    margin-right: 0;
  }
`;
