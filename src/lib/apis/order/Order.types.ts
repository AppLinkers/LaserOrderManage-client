export interface ICustomerOrderResponse {
  contents: ICustomerOrder[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface ICustomerOrder {
  id: number;
  name: string;
  imgUrl: string;
  stage: string;
  isUrgent: boolean;
  manufacturing: string[];
  createdAt: any;
  deliveryAt: any | null;
  cost: number | null;
  request: string | null;
}

export interface IFactoryNewOrderResponse {
  contents: IFactoryNewOrder[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface IFactoryNewOrder {
  id: number;
  name: string;
  customer: string;
  company: string | null;
  isNewCustomer: boolean | undefined;
  hasQuotation: boolean;
  imgUrl: string;
  isUrgent: boolean;
  manufacturing: string[];
  createdAt: any;
  deliveryAt: any | null;
  cost: number | null;
  request: string | null;
}

export interface IFactoryOrderResponse {
  contents: IFactoryOrder[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface IFactoryOrder {
  id: number;
  name: string;
  customer: string;
  company: string | null;
  imgUrl: string;
  stage: string;
  isUrgent: string;
  manufacturing: string[];
  createdAt: any;
  deliveryAt: any | null;
  cost: number | null;
  request: string | null;
}

export interface IOrderCommentsResponse {
  contents: IOrderComment[];
  totalElements: number;
}

export interface IOrderComment {
  id: number;
  authorName: string;
  content: string;
  createdAt: any;
}
