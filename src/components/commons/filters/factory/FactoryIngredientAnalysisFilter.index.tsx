import styled from "@emotion/styled";
import * as S from "../OrderFilter.styles";
import { ANALYSIS_DATA_TYPE, ANALYSIS_DATE_TYPE, ANALYSIS_ITEM_UNIT_TYPE, ANALYSIS_PRICE_ITEM_TYPE, ANALYSIS_STOCK_ITEM_TYPE, INGREDIENT_UNIT_TYPE } from "./FactoryFilter.queries";
import Spacer from "../../spacer/Spacer.index";
import { ChangeEvent } from "react";
import { IIngredientNameListResponse } from "@/src/lib/apis/ingredient/Ingredient.types";

interface IFactoryIngredientAnalysisFilterProps {
    dataType: string;
    ingredientId: number | string;
    dateType: string;
    startYear: string;
    startMonth: string;
    endYear: string;
    endMonth: string;
    unitType: string;
    itemType: string;
    stockItemList: string[];
    priceItemList: string[];
    onDataType: (type: string) => void;
    onIngredient: (event: ChangeEvent<HTMLSelectElement>) => void;
    onDateType: (type: string) => void;
    onStartYear: (type: string) => void;
    onStartMonth: (type: string) => void;
    onEndYear: (type: string) => void;
    onEndMonth: (type: string) => void;
    onUnitType: (type: string) => void;
    onItemType: (type: string) => void;
    onStockItem: (type: string) => void;
    onPriceItem: (type: string) => void;
}

const INGREDIENT_DATA: IIngredientNameListResponse = {
    contents: [
        {id: 0, texture: "t1", thickness: 1.5},
        {id: 1, texture: "t2", thickness: 2.5},
        {id: 2, texture: "t3", thickness: 3.5},
    ],
    totalElements: 3,
}

const yearRange = Array.from({ length: new Date().getFullYear() - 2024 + 1 }, (_, i) => 2024 + i);
const monthRange = Array.from({ length: 12}, (_, i) => 1 + i);

export default function FactoryIngredientAnalysisFilter(props: IFactoryIngredientAnalysisFilterProps) {
    return (
        <Wrapper>
            <FilterWrapper>
                <S.HeaderWrapper>
                    <p className="bold16">조회 필터</p>
                </S.HeaderWrapper>
                <S.FilterWrapper className="flex-row-align-center">
                    <S.FilterLabel className="medium16">데이터</S.FilterLabel>
                    {ANALYSIS_DATA_TYPE.map((el) => (
                    <S.Filter
                        className="medium16"
                        key={el.type}
                        isSelect={props.dataType === el.key}
                        onClick={() => props.onDataType(el.key)}
                    >
                        {el.type}
                    </S.Filter>
                    ))}
                    <SelectWrapper>
                        <Select 
                            width={200} 
                            marginLeft={16} 
                            value={props.ingredientId}
                            onChange={props.onIngredient}
                            disabled={props.dataType !== "ingredient"}
                        >
                            <Option value={""} disabled hidden>
                                자재를 선택해주세요
                            </Option>
                            {INGREDIENT_DATA.contents.map((el) => (
                                <Option key={el.id} value={el.id}>
                                {`${el.texture} - ${el.thickness} T`}
                            </Option>
                            ))}
                            
                        </Select>
                    </SelectWrapper>
                </S.FilterWrapper>
                <S.FilterWrapper className="flex-row-align-center">
                    <S.FilterLabel className="medium16">기간</S.FilterLabel>
                    {ANALYSIS_DATE_TYPE.map((el) => (
                    <S.Filter
                        className="medium16"
                        key={el.type}
                        isSelect={props.dateType === el.key}
                        onClick={() => props.onDateType(el.key)}
                    >
                        {el.type}
                    </S.Filter>
                    ))}
                    <SelectWrapper>
                        <Select width={100} marginLeft={16} value={props.startYear} onChange={(event) => props.onStartYear(event.target.value)} disabled={props.dateType !== "year" && props.dateType !== "month"}>
                            <Option value={""} disabled hidden>
                                년
                            </Option>
                            {yearRange.map((el) => (
                                <Option key={el} value={el}>
                                    {`${el} 년`}
                                </Option>
                            ))}
                        </Select>
                    </SelectWrapper>
                    {props.dateType === "month" && (
                        <SelectWrapper>
                            <Select width={60} marginLeft={4} value={props.startMonth} onChange={(event) => props.onStartMonth(event.target.value)}>
                                <Option value={""} disabled hidden>
                                    월
                                </Option>
                                {monthRange.map((el) => (
                                    <Option key={el} value={el}>
                                        {`${el} 월`}
                                    </Option>
                                ))}
                            </Select>
                        </SelectWrapper>
                    )}
                    <DateInputDivider dateType={props.dateType} className="medium20">-</DateInputDivider>
                    <SelectWrapper>
                        <Select width={100} marginLeft={0} value={props.endYear} onChange={(event) => props.onEndYear(event.target.value)} disabled={props.dateType !== "year" && props.dateType !== "month"}>
                            <Option value={""} disabled hidden>
                                년
                            </Option>
                            {yearRange.map((el) => (
                                <Option key={el} value={el}>
                                    {`${el} 년`}
                                </Option>
                            ))}
                        </Select>
                    </SelectWrapper>
                    {props.dateType === "month" && (
                        <SelectWrapper>
                            <Select width={60} marginLeft={4} value={props.endMonth} onChange={(event) => props.onEndMonth(event.target.value)}>
                                <Option value={""} disabled hidden>
                                    월
                                </Option>
                                {monthRange.map((el) => (
                                    <Option key={el} value={el}>
                                        {`${el} 월`}
                                    </Option>
                                ))}
                            </Select>
                        </SelectWrapper>
                    )}
                </S.FilterWrapper>
                <S.FilterWrapper className="flex-row">
                    <S.FilterLabel className="medium16">단위</S.FilterLabel>
                    {INGREDIENT_UNIT_TYPE.map((el) => (
                    <S.Filter
                        className="medium16"
                        key={el.type}
                        isSelect={props.unitType === el.key}
                        onClick={() => props.onUnitType(el.key)}
                    >
                        {el.type}
                    </S.Filter>
                    ))}
                </S.FilterWrapper>
                <S.FilterWrapper className="flex-row">
                    <S.FilterLabel className="medium16">조회 항목</S.FilterLabel>
                    <div>
                        <div className="flex-row">
                            {ANALYSIS_ITEM_UNIT_TYPE.map((el) => (
                                <S.Filter
                                    className="medium16"
                                    key={el.type}
                                    isSelect={props.itemType === el.key}
                                    onClick={() => props.onItemType(el.key)}
                                >
                                    {el.type}
                                </S.Filter>
                            ))}
                        </div>
                        <Spacer width="100%" height="10px" />
                        {props.itemType === "stock" && (
                            <>
                            {ANALYSIS_STOCK_ITEM_TYPE.map((el) => (
                                <S.FilterSmall
                                className="medium14"
                                key={el.type}
                                isSelect={props.stockItemList.includes(el.key)}
                                onClick={() => props.onStockItem(el.key)}
                              >
                                {el.type}
                              </S.FilterSmall>
                            ))}
                            </>
                        )}
                        {props.itemType === "price" && (
                            <>
                            {ANALYSIS_PRICE_ITEM_TYPE.map((el) => (
                                <S.FilterSmall
                                className="medium14"
                                key={el.type}
                                isSelect={props.priceItemList.includes(el.key)}
                                onClick={() => props.onPriceItem(el.key)}
                              >
                                {el.type}
                              </S.FilterSmall>
                            ))}
                            </>
                        )}
                    </div>
                    
                </S.FilterWrapper>
            </FilterWrapper>
            <SearchButton className="bold14">조회하기</SearchButton>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    border: 1px solid var(--color-mediumGray);
    border-radius: var(--border-radius);
`

const FilterWrapper = styled.div`
    flex:1;
    padding: 24px 30px;
`

const SearchButton = styled.button`
    width: 100%;
    height: 50px;
    color: var(--color-white);
    background-color: var(--color-primary);
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
`
const SelectWrapper = styled.div`
  position: relative;
`;

interface IDateTypeProps {
    dateType: string
}

const DateInputDivider = styled.p<IDateTypeProps>`
color: ${(props: IDateTypeProps) =>
    (props.dateType === "month" || props.dateType === "year") ? "var(--color-normarGray)" : "var(--color-mediumGray)"};
margin-left: 6px;
margin-right: 6px;
`;

interface ISelectProps {
    width: number;
    marginLeft: number;
}

const Select = styled.select<ISelectProps>`
  width: ${(props) => `${props.width}px`};
  height: 32px;
  border: 1px solid var(--color-mediumGray);
  border-radius: var(--border-radius);
  padding: 0 12px;
  margin-left: ${(props) => `${props.marginLeft}px`};
  appearance: none;
`;

export const Option = styled.option``;

