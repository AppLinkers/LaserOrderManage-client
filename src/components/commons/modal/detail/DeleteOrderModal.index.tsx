import Modal from "../Modal.index";
import { IDeleteOrderModalProps } from "./DetailModal.types";
import * as S from "./DetailModal.styles";
import Spacer from "../../spacer/Spacer.index";
import { useMutation } from "@tanstack/react-query";
import { OrderDetailApi } from "@/src/lib/apis/order/detail/OrderDetailApi";
import { useToastify } from "@/src/lib/hooks/useToastify";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { authState } from "@/src/store/auth";
import { AppPages } from "@/src/lib/constants/appPages";

export default function DeleteOrderModal({
  isOpen,
  orderName,
  orderId,
  onClose,
}: IDeleteOrderModalProps) {
  const router = useRouter();
  const auth = useRecoilValue(authState);
  const { setToast } = useToastify();
  const { mutate } = useMutation({
    mutationFn: OrderDetailApi.DELETE_ORDER,
    onSuccess: () => {
      setToast({ comment: "거래를 삭제했어요" });
      const route =
        auth.authorityList.includes("ROLE_CUSTOMER")
          ? AppPages.CUSTOMER_ORDER_LIST
          : AppPages.FACTORY_ORDER_LIST;
      router.replace(route);
    },
    onError: () => {
      setToast({ comment: "거래 삭제에 실패했어요" });
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <S.Wrapper width={600}>
        <S.Title className="bold20">거래 삭제하기</S.Title>
        <p className="medium20">
          {"삭제 시 거래 데이터가 삭제되며 이후 복구할 수 없습니다."} <br />
          {`정말로 "${orderName}"을/를 삭제하시겠습니까?`}
        </p>
        <Spacer width="100%" height="40px" />
        <S.ButtonWrapper className="flex-row">
          <S.CancelButton className="bold14" onClick={onClose}>
            취소
          </S.CancelButton>
          <Spacer width="8px" height="100%" />
          <S.SubmitButton className="bold14" onClick={() => mutate(orderId)}>
            삭제하기
          </S.SubmitButton>
        </S.ButtonWrapper>
      </S.Wrapper>
    </Modal>
  );
}
