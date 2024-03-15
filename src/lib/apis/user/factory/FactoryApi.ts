import { axiosPrivate } from "../../axios";
import {
  IEditFactoryAccountRequest,
  IFactoryAccountResponse,
  IOrderMangerListResponse,
  IOrderMangerRequest,
} from "./Factory.types";

export const FactoryApi = {
  GET_ACCOUNT_INFO: async (): Promise<IFactoryAccountResponse> => {
    const response = await axiosPrivate.get("/factory/user");
    return response.data;
  },
  EDIT_ACCOUNT_INFO: async (payload: IEditFactoryAccountRequest): Promise<null> => {
    const response = await axiosPrivate.patch("/factory/user", payload);
    return response.data;
  },
  GET_ORDER_MANAGER: async (): Promise<IOrderMangerListResponse> => {
    const response = await axiosPrivate.get("/factory/order-manager");
    return response.data;
  },
  POST_ORDER_MANAGER: async (payload: IOrderMangerRequest): Promise<null> => {
    const resposne = await axiosPrivate.post("/factory/order-manager", payload);
    return resposne.data;
  },
  EDIT_ORDER_MANAGER: async ({
    id,
    payload,
  }: {
    id: number;
    payload: IOrderMangerRequest;
  }): Promise<null> => {
    const response = await axiosPrivate.put(
      `/factory/order-manager/${id}`,
      payload,
    );
    return response.data;
  },
  DELETE_ORDER_MANAGER: async (id: number): Promise<null> => {
    const response = await axiosPrivate.delete(`/factory/order-manager/${id}`);
    return response.data;
  },
};
