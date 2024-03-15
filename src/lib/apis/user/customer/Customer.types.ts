import { IBaseListSimpleResponse } from "@/src/lib/apis/base/base.types";

export type IDeliveryAddressListResponse =
  IBaseListSimpleResponse<IDeliveryAddress>;

export type IDeliveryAddressRequest = {
  name: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  receiver: string;
  phone1: string;
  phone2: string | null;
  isDefault: boolean;
};

export type IDeliveryAddress = {
  id: number;
  name: string;
  zipCode: string;
  address: string;
  detailAddress: string | null;
  receiver: string;
  phone1: string;
  phone2: string | null;
  isDefault: boolean;
};

export type ICustomerAccountResponse = {
  companyName: string | null;
};

export type IEditCustomerAccountRequest = {
  companyName: string | null;
};
