import * as S from "../OrderFilter.styles";
import RedoIcon from "../../icons/RedoIcon.index";
import Spacer from "../../spacer/Spacer.index";
import { IFOrderFilterProps } from "../OrderFilter.types";
import { DateValue } from "@/src/lib/hooks/useDate";
import { ORDER_DATE_TYPE, ORDER_TYPE } from "./FactoryFilter.queries";
import DateInput from "../../inputs/date/DateInput.index";

interface IFactoryOrderFilterProps extends IFOrderFilterProps {
  dateType: string | null;
  startDate: string;
  endDate: string;
  onDateType: (type: string) => void;
  onStartDate: (date: DateValue) => void;
  onEndDate: (date: DateValue) => void;
}

export default function FactoryOrderFiltlater({
  orderType,
  dateType,
  startDate,
  endDate,
  onOrderType,
  onDateType,
  onStartDate,
  onEndDate,
  onResetFilter,
}: IFactoryOrderFilterProps) {
  return (
    <S.Wrapper>
      <S.HeaderWrapper className="flex-row-between">
        <p className="bold16">검색 필터</p>
        <a className="flex-row-center" onClick={() => onResetFilter()}>
          <RedoIcon size={16} />
          <Spacer width="5px" height="100%" />
          <p className="medium16">필터 초기화</p>
        </a>
      </S.HeaderWrapper>
      <S.FilterWrapper className="flex-row">
        <S.FilterLabel className="medium16">거래 유형</S.FilterLabel>
        {ORDER_TYPE.map((el) => (
          <S.Filter
            className="medium16"
            key={el.type}
            isSelect={orderType === el.key}
            onClick={() => onOrderType(el.key)}
          >
            {el.type}
          </S.Filter>
        ))}
      </S.FilterWrapper>
      <S.FilterWrapper className="flex-row">
        <S.FilterLabel className="medium16">거래 날짜</S.FilterLabel>
        <div>
          <div className="flex-row">
            {ORDER_DATE_TYPE.map((el) => (
              <S.FilterSmall
                className="medium14"
                key={el.type}
                isSelect={dateType === el.key}
                onClick={() => onDateType(el.key)}
              >
                {el.type}
              </S.FilterSmall>
            ))}
          </div>
          <S.DateInputWrapper className="flex-row-center">
            <DateInput date={startDate} setDate={onStartDate} />
            <S.DateInputDivier className="medium20">-</S.DateInputDivier>
            <DateInput date={endDate} setDate={onEndDate} />
          </S.DateInputWrapper>
        </div>
      </S.FilterWrapper>
    </S.Wrapper>
  );
}
