import styled from "@emotion/styled";
import * as S from "../OrderFilter.styles";
import { ANALYSIS_DATA_TYPE, ANALYSIS_DATE_TYPE, ANALYSIS_ITEM_UNIT_TYPE, ANALYSIS_PRICE_ITEM_TYPE, ANALYSIS_STOCK_ITEM_TYPE, INGREDIENT_UNIT_TYPE } from "./FactoryFilter.queries";
import Spacer from "../../spacer/Spacer.index";
import { useQuery } from "@tanstack/react-query";
import { IngredientApi } from "@/src/lib/apis/ingredient/IngredientApi";
import { useFactoryIngredientAnalysisFilter } from "@/src/lib/hooks/useFilter";
import { useToastify } from "@/src/lib/hooks/useToastify";
import { IIngredientGraphItemListResponse } from "@/src/lib/apis/ingredient/Ingredient.types";

const yearRange = Array.from({ length: new Date().getFullYear() - 2023 + 1 }, (_, i) => 2023 + i);
const monthRange = Array.from({ length: 12}, (_, i) => 1 + i);

interface IFactoryIngredientAnalysisFilterProps {
    setAnalysisData: (ingredientGraphItemListResponse : IIngredientGraphItemListResponse|undefined) => void;
}

export default function FactoryIngredientAnalysisFilter({setAnalysisData} : IFactoryIngredientAnalysisFilterProps) {
    const { data : ingredientListData, refetch : ingredientListRefetch} = useQuery({
        queryKey: ["getIngredient"],
        queryFn: () => IngredientApi.GET_INGREDIENT_LIST(),
    });
    const analysisFilterArgs = useFactoryIngredientAnalysisFilter();
    const searchAvailable = 
        analysisFilterArgs.dataType !== "" &&
        (analysisFilterArgs.dataType === "ingredient" ? analysisFilterArgs.ingredientId !== "" : true) &&
        analysisFilterArgs.dateType !== "" &&
        analysisFilterArgs.startYear !== "" &&
        analysisFilterArgs.endYear !== "" &&
        (analysisFilterArgs.dateType === "month" ? ((analysisFilterArgs.startMonth !== "") && (analysisFilterArgs.endMonth !== "")) : true) &&
        analysisFilterArgs.itemType !== "" &&
        (analysisFilterArgs.itemType === "stock" ? (analysisFilterArgs.stockItemList.length > 0) : true) &&
        (analysisFilterArgs.itemType === "stock" ? (analysisFilterArgs.unitType !== "") : true) &&
        (analysisFilterArgs.itemType === "price" ? (analysisFilterArgs.priceItemList.length > 0) : true);

    const { setToast } = useToastify();

    const formattedDate = (dateType : string, year : string, month : string) => {
        const formattedMonth = dateType === "year" ? "01" : month.padStart(2, '0');
        return `${year}-${formattedMonth}-01`;
    }

    const { data : analysisData, refetch : analaysisRefetch} = useQuery({
        queryKey: ["getAnalysis"],
        queryFn: () => IngredientApi.GET_INGREDIENT_ANALYSIS(
            analysisFilterArgs.dataType,
            Number(analysisFilterArgs.ingredientId),
            analysisFilterArgs.dateType,
            formattedDate(analysisFilterArgs.dateType, analysisFilterArgs.startYear, analysisFilterArgs.startMonth),
            formattedDate(analysisFilterArgs.dateType, analysisFilterArgs.endYear, analysisFilterArgs.endMonth),
            analysisFilterArgs.itemType,
            analysisFilterArgs.stockItemList.join(","),
            analysisFilterArgs.unitType,
            analysisFilterArgs.priceItemList.join(",")
        ),
        enabled: false
    })

    const onSearch = () => {
        if (!searchAvailable) {
            setAnalysisData(undefined);
            setToast({ comment: "모든 조회 필터를 선택해주세요"});
            return;
        }
        const startDate = new Date(formattedDate(analysisFilterArgs.dateType, analysisFilterArgs.startYear, analysisFilterArgs.startMonth));
        const endDate = new Date(formattedDate(analysisFilterArgs.dateType, analysisFilterArgs.endYear, analysisFilterArgs.endMonth));
        const nowDate = new Date(formattedDate(analysisFilterArgs.dateType, String(new Date().getFullYear()), String(new Date().getMonth() + 1)));

        if (startDate > endDate) {
            setAnalysisData(undefined);
            setToast({ comment: "조회 시작 날짜는 종료 날짜 이전이어야 합니다."});
            return;
        }

        analysisFilterArgs.dateType === "month" ? nowDate.setMonth(nowDate.getMonth() + 1) : nowDate.setFullYear(nowDate.getFullYear() + 1);
        if ((nowDate <= startDate) || (nowDate <= endDate)) {
            setAnalysisData(undefined);
            setToast({ comment: "조회 시작 및 종료 날짜는 현재 날짜 이전이어야 합니다."});
            return;
        }

        analaysisRefetch().then((data) => {
            setAnalysisData(data.data!);
        });
        
    }

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
                        isSelect={analysisFilterArgs.dataType === el.key}
                        onClick={() => {
                            analysisFilterArgs.onDataType(el.key)
                            if (el.key === "ingredient") {
                                ingredientListRefetch();
                            }
                        }}
                    >
                        {el.type}
                    </S.Filter>
                    ))}
                    <SelectWrapper>
                        <Select 
                            width={200} 
                            marginLeft={16} 
                            value={analysisFilterArgs.ingredientId}
                            onChange={analysisFilterArgs.onIngredient}
                            disabled={analysisFilterArgs.dataType !== "ingredient"}
                        >
                            <Option value={""} disabled hidden>
                                자재를 선택해주세요
                            </Option>
                            {ingredientListData?.contents.map((el) => (
                                <Option key={el.id} value={el.id}>
                                {`${el.texture} - ${Number.isInteger(el.thickness) ? el.thickness.toFixed(1) : el.thickness} T`}
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
                        isSelect={analysisFilterArgs.dateType === el.key}
                        onClick={() => analysisFilterArgs.onDateType(el.key)}
                    >
                        {el.type}
                    </S.Filter>
                    ))}
                    <SelectWrapper>
                        <Select width={100} marginLeft={16} value={analysisFilterArgs.startYear} onChange={(event) => analysisFilterArgs.onStartYear(event.target.value)} disabled={analysisFilterArgs.dateType !== "year" && analysisFilterArgs.dateType !== "month"}>
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
                    {analysisFilterArgs.dateType === "month" && (
                        <SelectWrapper>
                            <Select width={60} marginLeft={4} value={analysisFilterArgs.startMonth} onChange={(event) => analysisFilterArgs.onStartMonth(event.target.value)}>
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
                    <DateInputDivider dateType={analysisFilterArgs.dateType} className="medium20">-</DateInputDivider>
                    <SelectWrapper>
                        <Select width={100} marginLeft={0} value={analysisFilterArgs.endYear} onChange={(event) => analysisFilterArgs.onEndYear(event.target.value)} disabled={analysisFilterArgs.dateType !== "year" && analysisFilterArgs.dateType !== "month"}>
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
                    {analysisFilterArgs.dateType === "month" && (
                        <SelectWrapper>
                            <Select width={60} marginLeft={4} value={analysisFilterArgs.endMonth} onChange={(event) => analysisFilterArgs.onEndMonth(event.target.value)}>
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
                    <S.FilterLabel className="medium16">조회 항목</S.FilterLabel>
                    <div>
                        <div className="flex-row">
                            {ANALYSIS_ITEM_UNIT_TYPE.map((el) => (
                                <S.Filter
                                    className="medium16"
                                    key={el.type}
                                    isSelect={analysisFilterArgs.itemType === el.key}
                                    onClick={() => analysisFilterArgs.onItemType(el.key)}
                                >
                                    {el.type}
                                </S.Filter>
                            ))}
                        </div>
                        <Spacer width="100%" height="10px" />
                        {analysisFilterArgs.itemType === "" && (
                            <>
                                <S.FilterSmall
                                className="medium14"
                                isSelect={false}
                                >
                                전체보기
                              </S.FilterSmall>
                            </>
                        )}
                        {analysisFilterArgs.itemType === "stock" && (
                            <>
                            {ANALYSIS_STOCK_ITEM_TYPE.map((el) => (
                                <S.FilterSmall
                                className="medium14"
                                key={el.type}
                                isSelect={analysisFilterArgs.stockItemList.includes(el.key)}
                                onClick={() => analysisFilterArgs.onStockItem(el.key)}
                              >
                                {el.type}
                              </S.FilterSmall>
                            ))}
                            </>
                        )}
                        {analysisFilterArgs.itemType === "price" && (
                            <>
                            {ANALYSIS_PRICE_ITEM_TYPE.map((el) => (
                                <S.FilterSmall
                                className="medium14"
                                key={el.type}
                                isSelect={analysisFilterArgs.priceItemList.includes(el.key)}
                                onClick={() => analysisFilterArgs.onPriceItem(el.key)}
                              >
                                {el.type}
                              </S.FilterSmall>
                            ))}
                            </>
                        )}
                    </div>
                </S.FilterWrapper>
                <S.FilterWrapper className="flex-row">
                    <S.FilterLabel className="medium16">단위</S.FilterLabel>
                    {INGREDIENT_UNIT_TYPE.map((el) => (
                    <S.Filter
                        className="medium16"
                        key={el.type}
                        isSelect={(analysisFilterArgs.itemType === "stock") && (analysisFilterArgs.unitType === el.key)}
                        onClick={() => (analysisFilterArgs.itemType === "stock") ? analysisFilterArgs.onUnitType(el.key) : {}}
                    >
                        {el.type}
                    </S.Filter>
                    ))}
                </S.FilterWrapper>
            </FilterWrapper>
            <SearchButton 
                className="bold14"
                onClick={onSearch}
            >
            조회하기
            </SearchButton>
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


