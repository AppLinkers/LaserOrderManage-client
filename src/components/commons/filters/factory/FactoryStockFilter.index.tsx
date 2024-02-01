import DateInput from "../../inputs/date/DateInput.index";
import * as S from "../OrderFilter.styles";
import { STOCK_UNIT_TYPE } from "./FactoryFilter.queries";

export default function FactoryStockFilter() {
    return (
        <S.Wrapper>
            <S.HeaderWrapper>
                <p className="bold16">검색 필터</p>
            </S.HeaderWrapper>
            <S.FilterWrapper className="flex-row-align-center">
                <S.FilterLabel className="medium16">기준 날짜</S.FilterLabel>
                <DateInput date={"2017-01-01"} setDate={() => {}} />
            </S.FilterWrapper>
            <S.FilterWrapper className="flex-row">
                <S.FilterLabel className="medium16">단위</S.FilterLabel>
                {STOCK_UNIT_TYPE.map((el) => (
                    <S.Filter
                        className="medium16"
                        key={el.type}
                        isSelect={true}
                        onClick={() => {}}
                    >
                        {el.type}
                    </S.Filter>
                    ))}
            </S.FilterWrapper>
        </S.Wrapper>
    )
}