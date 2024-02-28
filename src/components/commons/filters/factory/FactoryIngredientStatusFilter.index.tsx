import { DateValue } from "@/src/lib/hooks/useDate";
import DateInput from "../../inputs/date/DateInput.index";
import * as S from "../OrderFilter.styles";
import { INGREDIENT_UNIT_TYPE } from "./FactoryFilter.queries";

interface IFactoryIngredientStatusFilterProps {
    date: string;
    unitType: string;
    onDate: (date: DateValue) => void;
    onUnitType: (type: string) => void;
}

export default function FactoryIngredientStatusFilter({
    date,
    unitType,
    onDate,
    onUnitType
} : IFactoryIngredientStatusFilterProps) {
    return (
        <S.Wrapper>
            <S.HeaderWrapper>
                <p className="bold16">검색 필터</p>
            </S.HeaderWrapper>
            <S.FilterWrapper className="flex-row-align-center">
                <S.FilterLabel className="medium16">기준 날짜</S.FilterLabel>
                <DateInput date={date} setDate={onDate} />
            </S.FilterWrapper>
            <S.FilterWrapper className="flex-row">
                <S.FilterLabel className="medium16">단위</S.FilterLabel>
                {INGREDIENT_UNIT_TYPE.map((el) => (
                    <S.Filter
                        className="medium16"
                        key={el.type}
                        isSelect={unitType === el.key}
                        onClick={() => onUnitType(el.key)}
                    >
                        {el.type}
                    </S.Filter>
                    ))}
            </S.FilterWrapper>
        </S.Wrapper>
    )
}