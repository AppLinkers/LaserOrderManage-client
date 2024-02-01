import {
  CustomerType,
  OrderDateType,
  OrderQuotationType,
  OrderType,
} from "../OrderFilter.types";

import { StockUnitType } from "../StockFilter.types";

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

interface IStockUnitType {
  type: StockUnitType;
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

export const STOCK_UNIT_TYPE: IStockUnitType[] = [
  { type: "수량", key: "count" },
  { type: "무게", key: "weight" },
];
