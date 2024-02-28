import {
  CustomerType,
  OrderDateType,
  OrderQuotationType,
  OrderType,
} from "../OrderFilter.types";

import { 
  IngredientUnitType,
  AnalysisDataType,
  AnalysisDateType,
  AnalysisItemUnitType,
  AnalysisStockItemType,
  AnalysisPriceItemType
 } from "../IngredientFilter.types";

interface IOrderQuotationType {
  type: OrderQuotationType;
  key: boolean;
}

interface ICustomerType {
  type: CustomerType;
  key: boolean;
}

interface IOrderType {
  type: OrderType;
  key: boolean;
}

interface IOrderDateType {
  type: OrderDateType;
  key: string;
}

interface IIngredientUnitType {
  type: IngredientUnitType;
  key: string;
}

interface IAnalysisDataType {
  type: AnalysisDataType;
  key: string;
}

interface IAnalysisDateType {
  type: AnalysisDateType;
  key: string;
}

interface IAnalysisItemUnitType {
  type: AnalysisItemUnitType;
  key: string;
}

interface IAnalysisStockItemType {
  type: AnalysisStockItemType;
  key: string;
}

interface IAnalysisPriceItemType {
  type: AnalysisPriceItemType;
  key: string;
}

interface IAnalysisItemType {
  type: string;
  key: string;
}

export const ORDER_QUOTAITON_TYPE: IOrderQuotationType[] = [
  { type: "작성 필요", key: false },
  { type: "작성 완료", key: true },
];

export const CUSTOMER_TYPE: ICustomerType[] = [
  { type: "신규 고객", key: true },
  { type: "기존 고객", key: false },
];

export const ORDER_TYPE: IOrderType[] = [
  { type: "일반 거래", key: false },
  { type: "긴급 거래", key: true },
];

export const ORDER_DATE_TYPE: IOrderDateType[] = [
  { type: "거래 생성일 기준", key: "create" },
  { type: "납기일 기준", key: "delivery" },
];

export const INGREDIENT_UNIT_TYPE: IIngredientUnitType[] = [
  { type: "수량", key: "count" },
  { type: "무게", key: "weight" },
];

export const ANALYSIS_DATA_TYPE: IAnalysisDataType[] = [
  { type: "전체 합계", key: "total" },
  { type: "평균", key: "average" },
  { type: "자재 선택", key: "ingredient" }
];

export const ANALYSIS_DATE_TYPE: IAnalysisDateType[] = [
  { type: "월간", key: "month"},
  { type: "연간", key: "year"}, 
]

export const ANALYSIS_ITEM_UNIT_TYPE: IAnalysisItemUnitType[] = [
  {type: "재고", key: "stock"},
  {type: "단가", key: "price"}
]

export const ANALYSIS_STOCK_ITEM_TYPE: IAnalysisStockItemType[] = [
  {type: "전체 보기", key: "all"},
  {type: "입고", key: "incoming"},
  {type: "생산", key: "production"},
  {type: "재고", key: "stock"},
  {type: "적정 재고", key: "optimal"}
]

export const ANALYSIS_PRICE_ITEM_TYPE: IAnalysisPriceItemType[] = [
  {type: "전체 보기", key: "all"},
  {type: "구매 단가", key: "purchase"},
  {type: "판매 단가", key: "sell"}
]

export const ANALYSIS_ITEM_TYPE: IAnalysisItemType[] = [
  {type: "입고", key: "incoming"},
  {type: "생산", key: "production"},
  {type: "재고", key: "stock"},
  {type: "적정 재고", key: "optimal"},
  {type: "구매 단가", key: "purchase"},
  {type: "판매 단가", key: "sell"}
]