import { useState } from "react";
import * as S from "./OrderDetailSection.styles";
import styled from "@emotion/styled";
import { IDeleteOrderSectionProps } from "./OrderDetailSection.types";
import DeleteOrderModal from "@/src/components/commons/modal/detail/DeleteOrderModal.index";

export default function DeleteOrderSection({
  orderName,
  orderId,
}: IDeleteOrderSectionProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <DeleteButton className="medium16" onClick={() => setShowModal(true)}>
        거래 삭제
      </DeleteButton>
      <DeleteOrderModal
        isOpen={showModal}
        orderName={orderName}
        orderId={orderId}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

const DeleteButton = styled.button`
  width: 100px;
  height: 45px;
  color: var(--color-alert);
  background-color: var(--color-lightGray);
  border: 1px solid var(--color-mediumGray);
  border-radius: var(--border-radius);
`;
