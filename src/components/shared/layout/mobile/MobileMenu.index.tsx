import CloseIcon from "@/src/components/commons/icons/CloseIcon.index";
import MainLogo from "@/src/components/commons/logo/MainLogo.index";
import { AppPages } from "@/src/lib/constants/appPages";
import { IAuthState } from "@/src/store/auth";
import { media } from "@/src/styles/theme";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

interface IMobileMenu {
  show: boolean;
  auth: IAuthState;
  onClose: () => void;
}

const UNAUTHENTICATED_MENU = [
  { name: "견적 요청하기", page: AppPages.LOGIN },
  { name: "거래 목록", page: AppPages.LOGIN },
  { name: "로그인", page: AppPages.LOGIN },
];

const CUSTOMER_MENU = [
  { name: "견적 요청하기", page: AppPages.CUSTOMER_CREATE_ORDER },
  { name: "거래 목록", page: AppPages.CUSTOMER_ORDER_LIST },
  { name: "마이페이지", page: AppPages.MY_PAGE },
];

const FACTORY_MENU = [
  { name: "신규 거래 목록", page: AppPages.FACTORY_NEW_ORDER_LIST },
  { name: "거래 내역", page: AppPages.FACTORY_ORDER_LIST },
  { name: "자재 재고 관리", page: AppPages.FACTORY_STOCK },
  { name: "마이페이지", page: AppPages.MY_PAGE },
];

export default function MobileMenu({ show, auth, onClose }: IMobileMenu) {
  if (!show) return <></>;
  const router = useRouter();

  const movePage = (page: string) => {
    onClose();
    router.push(page);
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <Header className="flex-row-between-center">
          <MainLogo
            transparent={false}
            onClick={() => movePage(AppPages.HOME)}
          />
          <CloseIcon size={32} onClick={onClose} />
        </Header>
        <MenuWrapper className="flex-column-center">
          {!auth.isAuthenticated &&
            UNAUTHENTICATED_MENU.map((el) => (
              <MenuItem
                className="bold32"
                key={el.name}
                onClick={() => movePage(el.page)}
              >
                {el.name}
              </MenuItem>
            ))}
          {auth.role === "ROLE_CUSTOMER" &&
            CUSTOMER_MENU.map((el) => (
              <MenuItem
                className="bold32"
                key={el.name}
                onClick={() => movePage(el.page)}
              >
                {el.name}
              </MenuItem>
            ))}
          {auth.role === "ROLE_FACTORY" &&
            FACTORY_MENU.map((el) => (
              <MenuItem
                className="bold32"
                key={el.name}
                onClick={() => movePage(el.page)}
              >
                {el.name}
              </MenuItem>
            ))}
        </MenuWrapper>
      </InnerWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.menu`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: none;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 999;
  ${media.tablet} {
    display: block;
  }
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Header = styled.div`
  margin: 0 auto;
  height: 100px;
  border-bottom: 1px solid transparent;
  ${media.tablet} {
    padding-inline: 80px;
  }
  ${media.mobile} {
    padding-inline: 24px;
  }
`;

const MenuWrapper = styled.div`
  ${media.tablet} {
    padding-top: 160px;
  }
  ${media.mobile} {
    padding-top: 230px;
  }
`;

const MenuItem = styled.p`
  text-align: center;
  margin-bottom: 48px;
  cursor: pointer;
  &:last-of-type {
    margin-bottom: 0;
  }
`;
