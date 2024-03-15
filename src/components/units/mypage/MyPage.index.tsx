import styled from "@emotion/styled";
import MyPageMenu from "@/src/components/commons/menu/mypage/MyPageMenu.index";
import { useState } from "react";
import { IMyPageMenu } from "@/src/components/commons/menu/mypage/MyPageMenu.types";
import { useRecoilValue } from "recoil";
import { authState } from "@/src/store/auth";
import AccountPage from "./pages/AccoutPage.index";
import DeliveryPage from "./pages/DeliveryPage.index";
import { GetServerSideProps } from "next";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { setSsrAxiosHeader } from "@/src/lib/utils/setSsrAxiosHeader";
import { CustomerApi } from "@/src/lib/apis/user/customer/CustomerApi";
import { FactoryApi } from "@/src/lib/apis/user/factory/FactoryApi";
import { AppPages } from "@/src/lib/constants/appPages";
import { UserAuthority } from "@/src/lib/apis/user/User.types";
import KumohHead from "../../shared/layout/head/NextHead.index";
import { UserApi } from "@/src/lib/apis/user/UserApi";

export default function MyPage() {
  const [currentPage, setCurrentPage] = useState<IMyPageMenu>("Account");
  const auth = useRecoilValue(authState);

  const onChangePage = (page: IMyPageMenu) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <KumohHead title="마이페이지 | 금오거래센터" />
      <Wrapper className="flex-row">
        <MyPageMenu
          currentPage={currentPage}
          authorityList={auth.authorityList}
          onChangePage={onChangePage}
        />
        {currentPage === "Account" && <AccountPage authorityList={auth.authorityList} />}
        {currentPage === "Delivery" && <DeliveryPage />}
      </Wrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { cookies } = context.req;
  const authorityList = JSON.parse(cookies.authorityList!) as UserAuthority[];

  setSsrAxiosHeader(cookies);
  await queryClient.prefetchQuery({
    queryKey: ["userAccount"],
    queryFn: () => UserApi.GET_ACCOUNT_INFO(),
  });
  const queryState = queryClient.getQueryState(["userAccount"]);
    if (queryState?.status === "error") {
      return {
        redirect: {
          destination: `${AppPages.LOGIN}?redirect=${encodeURIComponent(
            context.resolvedUrl,
          )}`,
          permanent: false,
        },
      };
    }
    
  if (authorityList.includes("ROLE_CUSTOMER")) {
    await queryClient.prefetchQuery({
      queryKey: ["customerAccount"],
      queryFn: () => CustomerApi.GET_ACCOUNT_INFO(),
    });
    await queryClient.prefetchQuery({
      queryKey: ["getDeliveryAddress"],
      queryFn: () => CustomerApi.GET_DELIVERY_ADDRESS(),
    });
    const queryState = queryClient.getQueryState(["customerAccount"]);
    if (queryState?.status === "error") {
      return {
        redirect: {
          destination: `${AppPages.LOGIN}?redirect=${encodeURIComponent(
            context.resolvedUrl,
          )}`,
          permanent: false,
        },
      };
    }
  }

  if (authorityList.includes("ROLE_FACTORY")) {
    await queryClient.prefetchQuery({
      queryKey: ["factoryAccount"],
      queryFn: () => FactoryApi.GET_ACCOUNT_INFO(),
    });
    const queryState = queryClient.getQueryState(["factoryAccount"]);
    if (queryState?.status === "error") {
      return {
        redirect: {
          destination: `${AppPages.LOGIN}?redirect=${encodeURIComponent(
            context.resolvedUrl,
          )}`,
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Wrapper = styled.div`
  width: 100%;
  background-color: var(--color-lightGray);
`;
