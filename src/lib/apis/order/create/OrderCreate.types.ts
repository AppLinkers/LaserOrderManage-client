import { IBaseListResponse } from "@/src/lib/apis/base/base.types";
import { Manufacturing, PostProcessing } from "../Order.types";

export type IOrderCreateRequest = {
  name: string;
  manufacturing: Manufacturing[];
  postProcessing: PostProcessing[];
  drawingList: IDrawing[];
  request: string;
  deliveryAddress: IOrderDeliveryAddress;
  isNewIssue: boolean;
};

export type IDrawing = {
  thumbnailUrl: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  fileUrl: string;
  count: number;
  ingredient: string;
  thickness: number;
};

export type IDrawingResponse = {
  thumbnailUrl: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  fileUrl: string;
};

export type IOrderDeliveryAddress = {
  name: string;
  zipCode: string;
  address: string;
  detailAddress: string | null;
  receiver: string;
  phone1: string;
  phone2: string | null;
};

export type IOrderHistoryResponse = {
  id: number;
  name: string;
  manufacturingList: Manufacturing[];
  postProcessingList: PostProcessing[] | null;
  drawingList: IDrawing[];
  request: string | null;
  deliveryAddress: IOrderDeliveryAddress;
};

export type IOrderHistoryListResponse = IBaseListResponse<IOrderHistory>;

export type IOrderHistory = {
  id: number;
  name: string;
  imgUrl: string;
  createdAt: any;
};
