import Modal from "../Modal.index";
import { IQuotationModalProps } from "./DetailModal.types";
import * as S from "./DetailModal.styles";
import Spacer from "../../spacer/Spacer.index";
import UploadIcon from "../../icons/UploadIcon.index";
import CalendarIcon from "../../icons/CalendarIcon.index";
import { useInputWithRegex } from "@/src/lib/hooks/useInput";
import { numberRegex } from "@/src/lib/constants/regex";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useCalendar } from "@/src/lib/hooks/useDate";
import { getParamDate } from "@/src/lib/utils/utils";
import { useToastify } from "@/src/lib/hooks/useToastify";
import { useMutation } from "@tanstack/react-query";
import { OrderDetailApi } from "@/src/lib/apis/order/detail/OrderDetailApi";
import { AVAILABLE_ORDER_FILE_TYPE } from "@/src/lib/constants/constant";
import { AxiosError } from "axios";
import { useApiError } from "@/src/lib/hooks/useApiError";

type Quotation = {
  totalCost: string;
  deliveryDate: string;
};

export default function QuotationModal({
  isOpen,
  data,
  orderId,
  callback,
  onClose,
}: IQuotationModalProps) {
  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState("");
  const [cost, onChangeCost, setCost] = useInputWithRegex(numberRegex, "");
  const dateArgs = useCalendar();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [apiSending, setApiSending] = useState(false);
  const { setToast } = useToastify();
  const { handleError } = useApiError();

  useEffect(() => {
    if (isOpen) {
      if (data) {
        setFile(undefined);
        setFileName(data.fileName);
        setCost(String(data.totalCost));
        dateArgs.setDateValue(new Date(data.deliveryDate));
      }
    }
  }, [isOpen]);

  const onUpload = () => {
    hiddenFileInput?.current?.click();
  };

  const onUploadCallback = (event: ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target.files?.[0];
    if (newFile) {
      setFile(newFile);
      setFileName(newFile.name);
    }
  };

  const { mutate } = useMutation({
    mutationFn: OrderDetailApi.PUT_ORDER_QUOTATION,
    onError: (error: AxiosError) => {
      setApiSending(false);
      handleError(error);
    },
  });

  const onSubmit = () => {
    if (apiSending) return;
    const payload = new FormData();
    if (file) payload.append("file", file);
    const quotation: Quotation = {
      totalCost: cost,
      deliveryDate: getParamDate(dateArgs.date),
    };
    const blob = new Blob([JSON.stringify(quotation)], {
      type: "application/json",
    });
    payload.append("quotation", blob);
    setApiSending(true);
    mutate(
      { id: orderId, payload: payload },
      {
        onSuccess: (res) => {
          setApiSending(false);
          callback({
            id: res.id,
            fileName: res.fileName,
            fileUrl: res.fileUrl,
            totalCost: Number(quotation.totalCost),
            deliveryDate: quotation.deliveryDate,
            createdAt: new Date(),
          });
          setToast({
            comment: data ? "견적서를 수정했어요" : "견적서를 추가했어요",
          });
          onClose();
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <S.Wrapper width={400}>
        <S.Title className="bold20">견적서 작성하기</S.Title>
        <S.LabelWrapper className="flex-row">
          <S.Label className="regular14">견적서 업로드</S.Label>
          <S.Required className="regular14">*</S.Required>
        </S.LabelWrapper>
        <S.Announce className="regular14">{`(${AVAILABLE_ORDER_FILE_TYPE.join(
          ", ",
        )})`}</S.Announce>
        <S.UploadInput
          type="file"
          accept={AVAILABLE_ORDER_FILE_TYPE.join(",")}
          ref={hiddenFileInput}
          onChange={onUploadCallback}
        />
        <S.InputWrapper
          className="flex-row-align-center"
          focusable={true}
          onClick={onUpload}
        >
          <S.Input
            className="regular14"
            placeholder="견적서를 업로드해주세요"
            underline={fileName !== ""}
            value={fileName}
            readOnly
          />
          <UploadIcon size={16} />
        </S.InputWrapper>
        <S.LabelWrapper className="flex-row">
          <S.Label className="regular14">납기일 선택</S.Label>
          <S.Required className="regular14">*</S.Required>
        </S.LabelWrapper>
        <S.CalendarInputWrapper>
          <S.InputWrapper
            className="flex-row-align-center"
            focusable={true}
            onClick={dateArgs.toggle}
          >
            <S.Input
              className="regular14"
              placeholder="납기일을 선택해주세요"
              value={dateArgs.date}
              readOnly
            />
            <CalendarIcon size={16} />
          </S.InputWrapper>
          <S.CalendarWrapper isOpen={dateArgs.show}>
            <Calendar locale="ko" onChange={dateArgs.onDate} />
          </S.CalendarWrapper>
        </S.CalendarInputWrapper>
        <S.LabelWrapper className="flex-row">
          <S.Label className="regular14">총 견적 비용</S.Label>
          <S.Required className="regular14">*</S.Required>
        </S.LabelWrapper>
        <S.InputWrapper className="flex-row-align-center">
          <S.Input
            className="regular14"
            placeholder="총 견적 비용을 입력해주세요"
            value={cost}
            onChange={onChangeCost}
          />
          {cost !== "" && <p className="regular12">원</p>}
        </S.InputWrapper>
        <Spacer width="100%" height="68px" />
        <S.ButtonWrapper className="flex-row">
          <S.CancelButton className="bold14" onClick={onClose}>
            취소
          </S.CancelButton>
          <Spacer width="8px" height="100%" />
          <S.SubmitButton
            className="bold14"
            disabled={fileName === "" || dateArgs.date === "" || cost === ""}
            onClick={onSubmit}
          >
            작성하기
          </S.SubmitButton>
        </S.ButtonWrapper>
      </S.Wrapper>
    </Modal>
  );
}
