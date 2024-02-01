import * as S from "./LayoutHeader.styles";
import { useRecoilValue } from "recoil";
import { authState } from "@/src/store/auth";
import Link from "next/link";

import { AppPages } from "@/src/lib/constants/appPages";
import HeaderMenuIcon from "@/src/components/commons/icons/HeaderMenuIcon.index";
import MainLogo from "@/src/components/commons/logo/MainLogo.index";
import MobileMenu from "../mobile/MobileMenu.index";
import { useState } from "react";

const NAVIGATION_DEFAULT_MENU = [
  { name: "견적 요청하기", page: AppPages.CUSTOMER_CREATE_ORDER },
  { name: "거래 목록", page: AppPages.CUSTOMER_ORDER_LIST },
];

const NAVIGATION_FACTORY_MENU = [
  { name: "신규 거래 목록", page: AppPages.FACTORY_NEW_ORDER_LIST },
  { name: "거래 내역", page: AppPages.FACTORY_ORDER_LIST },
  { name: "자재 재고 관리", page: AppPages.FACTORY_STOCK}
];

interface ILayoutHeaderProps {
  transparent: boolean;
}

export default function LayoutHeader({ transparent }: ILayoutHeaderProps) {
  const auth = useRecoilValue(authState);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <S.Wrapper className="flex-row-between-center" transparent={transparent}>
        <MainLogo transparent={transparent} />
        <S.PcMenu className="flex-row">
          <S.MenuWrapper
            className="flex-row-align-center"
            transparent={transparent}
          >
            {auth.role === null &&
              NAVIGATION_DEFAULT_MENU.map((el) => (
                <Link href={AppPages.LOGIN} key={el.page} className="bold18">
                  {el.name}
                </Link>
              ))}
            {auth.role === "ROLE_CUSTOMER" &&
              NAVIGATION_DEFAULT_MENU.map((el) => (
                <Link href={el.page} key={el.page} className="bold18">
                  {el.name}
                </Link>
              ))}
            {auth.role === "ROLE_FACTORY" &&
              NAVIGATION_FACTORY_MENU.map((el) => (
                <Link href={el.page} key={el.page} className="bold18">
                  {el.name}
                </Link>
              ))}
          </S.MenuWrapper>
          {!auth.isAuthenticated && (
            <Link href={AppPages.LOGIN}>
              <S.HeaderButton className="bold16">로그인</S.HeaderButton>
            </Link>
          )}
          {auth.isAuthenticated && (
            <Link href={AppPages.MY_PAGE}>
              <S.HeaderButton className="bold16">마이페이지</S.HeaderButton>
            </Link>
          )}
        </S.PcMenu>
        {!showMenu && (
          <S.MenuIconWrapper onClick={() => setShowMenu(true)}>
            <HeaderMenuIcon size={32} transparent={transparent} />
          </S.MenuIconWrapper>
        )}
      </S.Wrapper>
      <MobileMenu
        show={showMenu}
        auth={auth}
        onClose={() => setShowMenu(false)}
      />
    </>
  );
}
