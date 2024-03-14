import { atom } from "recoil";
import { UserAuthority } from "../lib/apis/user/User.types";

export interface IAuthState {
  isAuthenticated: boolean;
  accessToken: string;
  authorityList: UserAuthority[];
}

const initialState: IAuthState = {
  isAuthenticated: false,
  accessToken: "",
  authorityList: [],
};

export const authState = atom<IAuthState>({
  key: "authState",
  default: initialState,
});
