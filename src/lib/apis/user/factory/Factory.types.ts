import { IBaseListSimpleResponse } from "@/src/lib/apis/base/base.types";

export type IFactoryAccountResponse = {
  companyName: string;
  representative: string;
  fax: string;
};

export type IEditFactoryAccountRequest = {
  companyName: string;
  representative: string;
  fax: string;
};

export type IFactoryUser = {
  phone: string;
  zipCode: string;
  address: string;
  detailAddress: string | null;
};

export type IOrderManager = {
  id: number;
  name: string;
  phone: string;
};

export type IOrderMangerListResponse = IBaseListSimpleResponse<IOrderManager>;

export type IOrderMangerRequest = {
  name: string;
  phone: string;
};
