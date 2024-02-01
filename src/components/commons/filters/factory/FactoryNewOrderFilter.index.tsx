import * as S from "../OrderFilter.styles";
import RedoIcon from "../../icons/RedoIcon.index";
import Spacer from "../../spacer/Spacer.index";
import { IFOrderFilterProps } from "../OrderFilter.types";
import {
  CUSTOMER_TYPE,
  ORDER_QUOTAITON_TYPE,
  ORDER_TYPE,
} from "./FactoryFilter.queries";
import { OrderTab } from "../../tabs/order/OrderTab.types";

interface IFactoryNewOrderFilterProps extends IFOrderFilterProps {
  tab: OrderTab;
  customerType: boolean | null;
  quotationType: boolean | null;
  onCustomerType: (type: boolean) => void;
  onQuotationType: (type: boolean) => void;
}

export default function FactoryNewOrderFilter({
  tab,
  quotationType,
  customerType,
  orderType,
  onQuotationType,
  onCustomerType,
  onOrderType,
  onResetFilter,
}: IFactoryNewOrderFilterProps) {
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
        <S.FilterLabel className="medium16">견적서 작성</S.FilterLabel>
        {ORDER_QUOTAITON_TYPE.map((el) => (
          <S.Filter
            className="medium16"
            key={el.type}
            isSelect={quotationType === el.key}
            onClick={() => onQuotationType(el.key)}
          >
            {el.type}
          </S.Filter>
        ))}
      </S.FilterWrapper>
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
      {tab === "신규 발행" && (
        <S.FilterWrapper className="flex-row">
          <S.FilterLabel className="medium16">고객 유형</S.FilterLabel>
          {CUSTOMER_TYPE.map((el) => (
            <S.Filter
              className="medium16"
              key={el.type}
              isSelect={customerType === el.key}
              onClick={() => onCustomerType(el.key)}
            >
              {el.type}
            </S.Filter>
          ))}
        </S.FilterWrapper>
      )}
    </S.Wrapper>
  );
}
