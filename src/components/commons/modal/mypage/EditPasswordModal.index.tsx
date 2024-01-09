import { useMutation } from "@tanstack/react-query";
import Spacer from "../../spacer/Spacer.index";
import Modal, { IModalProps } from "../Modal.index";
import * as S from "./MypageModal.styles";
import { useToastify } from "@/src/lib/hooks/useToastify";
import { UserApi } from "@/src/lib/apis/user/UserApi";

interface IEditPasswordModalProps extends IModalProps {}

export default function EditPasswordModal({
  isOpen,
  onClose,
}: IEditPasswordModalProps) {
  const { setToast } = useToastify();

  const { mutate } = useMutation({
    mutationFn: UserApi.FIND_PASSWORD,
    onSuccess: () => {
      setToast({ comment: "변경 메일을 발송했어요" });
      onClose();
    },
    onError: () => {
      setToast({ comment: "메일 전송에 실패했어요" });
      onClose();
    },
  });

  const onSubmit = () => {
    mutate();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <S.Wrapper>
        <S.Title className="bold18">비밀번호 변경</S.Title>
        <Spacer width="100%" height="60px" />
        <S.Announce className="medium18">
          비밀번호 변경 메일을 발송할까요?
        </S.Announce>
        <Spacer width="100%" height="60px" />
        <div className="flex-row">
          <S.CancelButton className="bold16" onClick={onClose}>
            취소
          </S.CancelButton>
          <Spacer width="10px" height="100%" />
          <S.SubmitButton className="bold16" onClick={onSubmit}>
            변경메일 발송
          </S.SubmitButton>
        </div>
      </S.Wrapper>
    </Modal>
  );
}
