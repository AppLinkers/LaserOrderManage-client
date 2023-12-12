import Spacer from "../../spacer/Spacer.index";
import Modal from "../Modal.index";
import { IPurchaseOrderModalProps } from "./DetailModal.types";
import * as S from "./DetailModal.styles";
import CalenderIcon from "../../icons/CalenderIcon.index";
import { useCalendar } from "@/src/lib/hooks/useDate";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useInput } from "@/src/lib/hooks/useInput";

export default function PurchaseOrderModal({
  isOpen,
  data,
  onClose,
}: IPurchaseOrderModalProps) {
  const paymentDateArgs = useCalendar(
    data ? new Date(data.paymentDate) : undefined,
  );
  const inspectionDateArgs = useCalendar(
    data ? new Date(data.inspectionPeriod) : undefined,
  );
  const [condition, onChangeCondition] = useInput(data?.inspectionCondition);

  const onSubmit = () => {};
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <S.Wrapper width={400}>
        <S.Title className="bold20">발주서 작성하기</S.Title>
        <S.LabelWrapper className="flex-row">
          <S.Label className="regular14">지급일 선택</S.Label>
          <S.Required className="regular14">*</S.Required>
        </S.LabelWrapper>
        <S.CalendarInputWrapper>
          <S.InputWrapper
            className="flex-row-align-center"
            focusable={true}
            onClick={paymentDateArgs.toggle}
          >
            <S.Input
              className="regular14"
              placeholder="지급일을 선택해주세요"
              value={paymentDateArgs.date}
              readOnly
            />
            <CalenderIcon size={16} />
          </S.InputWrapper>
          <S.CalendarWrapper isOpen={paymentDateArgs.show}>
            <Calendar locale="ko" onChange={paymentDateArgs.onDate} />
          </S.CalendarWrapper>
        </S.CalendarInputWrapper>
        <S.LabelWrapper className="flex-row">
          <S.Label className="regular14">검수 기간 선택</S.Label>
          <S.Required className="regular14">*</S.Required>
        </S.LabelWrapper>
        <S.CalendarInputWrapper>
          <S.InputWrapper
            className="flex-row-align-center"
            focusable={true}
            onClick={inspectionDateArgs.toggle}
          >
            <S.Input
              className="regular14"
              placeholder="검수 기간을 선택해주세요"
              value={inspectionDateArgs.date}
              readOnly
            />
            <CalenderIcon size={16} />
          </S.InputWrapper>
          <S.CalendarWrapper isOpen={inspectionDateArgs.show}>
            <Calendar locale="ko" onChange={inspectionDateArgs.onDate} />
          </S.CalendarWrapper>
        </S.CalendarInputWrapper>
        <S.LabelWrapper className="flex-row">
          <S.Label className="regular14">검수 조건</S.Label>
          <S.Required className="regular14">*</S.Required>
        </S.LabelWrapper>
        <S.TextArea
          className="regular14"
          placeholder="검수 조건을 입력해주세요"
          value={condition}
          onChange={onChangeCondition}
        />
        <Spacer width="100%" height="68px" />
        <S.ButtonWrapper className="flex-row">
          <S.CancelButton className="bold14" onClick={onClose}>
            취소
          </S.CancelButton>
          <Spacer width="8px" height="100%" />
          <S.SubmitButton
            className="bold14"
            disabled={
              paymentDateArgs.date === "" ||
              inspectionDateArgs.date === "" ||
              condition === ""
            }
            onClick={onSubmit}
          >
            작성하기
          </S.SubmitButton>
        </S.ButtonWrapper>
      </S.Wrapper>
    </Modal>
  );
}
