import { axiosPrivate } from "../../axios";
import {
  IEditFactoryAccountRequest,
  IFactoryAccountResponse,
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
};
