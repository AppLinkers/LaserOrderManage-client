import { OrderStatus } from "@/src/lib/apis/order/Order.types";
import {
  IDetailAcquirer,
  IDetailCustomer,
  IDetailDrawing,
  IDetailOrder,
  IDetailPurchaseOrder,
  IDetailQuotation,
} from "@/src/lib/apis/order/detail/OrderDetail.types";
import { UserAuthority } from "@/src/lib/apis/user/User.types";
import { IDeliveryAddress } from "@/src/lib/apis/user/customer/Customer.types";
import { RefObject } from "react";

interface IDetailSectionProps {
  authorityList: UserAuthority[];
  status: OrderStatus | undefined;
  orderId: string;
}

export type FocusableSection = "OrderInfo" | "DrawingInfo" | "QuotationInfo";

export interface IOrderInfoSectionProps {
  sectionRef: RefObject<HTMLDivElement>;
  data: IDetailOrder;
  status: OrderStatus | undefined;
}

export interface IUrgentSectionProps {
  isUrgent: boolean;
  orderId: string;
}

export interface ICustomerInfoSectionProps {
  data: IDetailCustomer;
}

export interface IDeliveryInfoSectionProps extends IDetailSectionProps {
  data: IDeliveryAddress;
}

export interface IDrawingInfoSectionProps extends IDetailSectionProps {
  sectionRef: RefObject<HTMLDivElement>;
  data: IDetailDrawing[];
}

export interface IDrawingInfoItemProps {
  authorityList: UserAuthority[];
  status: OrderStatus | undefined;
  data: IDetailDrawing;
  onEditDrawing: () => void;
  onDeleteDrawing: () => void;
}

export interface IQuotationInfoSectionProps extends IDetailSectionProps {
  sectionRef: RefObject<HTMLDivElement>;
  data: IDetailQuotation | null;
  scrollPage: () => void;
}

export interface IPurchaseOrderInfoSectionProps extends IDetailSectionProps {
  data: IDetailPurchaseOrder | null;
  name: string | null;
  minDate: string | null;
  scrollPage: () => void;
}

export interface IAcquirerInfoSectionProps {
  data: IDetailAcquirer;
}

export interface IDeleteOrderSectionProps {
  orderName: string;
  orderId: string;
}
