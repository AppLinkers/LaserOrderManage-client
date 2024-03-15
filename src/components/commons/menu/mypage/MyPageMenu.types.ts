import { UserAuthority } from "@/src/lib/apis/user/User.types";
import { jsx } from "@emotion/react";

export type IMyPageMenu = "Account" | "Delivery";

export interface IMyPageMenuProps {
  currentPage: IMyPageMenu;
  authorityList: UserAuthority[];
  onChangePage: (page: IMyPageMenu) => void;
}

export interface IMyPageMenuItemProps {
  title: string;
  isActive: boolean;
  children: jsx.JSX.Element;
  onClick: () => void;
}

export interface IMenuItemTitleProps {
  isActive: boolean;
}
