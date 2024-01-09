import { useEffect, useState } from "react";
import OrderCommentMenu from "../../commons/menu/detail/OrderCommentMenu.index";
import OrderDetailMenu from "../../commons/menu/detail/OrderDetailMenu.index";
import Spacer from "../../commons/spacer/Spacer.index";
import * as S from "./OrderDetail.styles";
import OrderDetailBottombar from "./bottombar/OrderDetailBottombar.index";
import CustomerInfoSection from "./section/CustomerInfoSection.index";
import DeliveryInfoSection from "./section/DeliveryInfoSection.index";
import DrawingInfoSection from "./section/DrawingInfoSection.index";
import OrderInfoSection from "./section/OrderInfoSection.index";
import PurchaseOrderInfoSection from "./section/PurchaseOrderInfoSection.index";
import QuotationInfoSection from "./section/QuotationInfoSection.index";
import UrgentSection from "./section/UrgentSection.index";
import { useRecoilValue } from "recoil";
import { authState } from "@/src/store/auth";
import { useOrderDetailScroll } from "@/src/lib/hooks/useScroll";
import { OrderStatus } from "@/src/lib/apis/order/Order.types";
import { useToastify } from "@/src/lib/hooks/useToastify";
import { useRouter } from "next/router";
import {
  QueryClient,
  dehydrate,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { OrderDetailApi } from "@/src/lib/apis/order/detail/OrderDetailApi";
import { GetServerSideProps } from "next";
import { setSsrAxiosHeader } from "@/src/lib/utils/setSsrAxiosHeader";

export default function OrderDetai() {
  const router = useRouter();
  const { orderId } = router.query;
  const auth = useRecoilValue(authState);
  const [status, setStatus] = useState<OrderStatus>();
  const scrollArgs = useOrderDetailScroll();
  const { setToast } = useToastify();
  const { data, isSuccess } = useQuery({
    queryKey: [`orderDetail/${orderId}`],
    queryFn: () => OrderDetailApi.GET_ORDER_DETAIL(String(orderId)),
  });

  useEffect(() => {
    window.addEventListener("scroll", scrollArgs.checkFocus);
    return () => {
      window.removeEventListener("scroll", scrollArgs.checkFocus);
    };
  }, []);

  useEffect(() => {
    if (data) {
      setStatus(data.order.stage);
    }
  }, [isSuccess]);

  const onChangeStatus = (nextStatus: OrderStatus, message: string) => {
    setStatus(nextStatus);
    setToast({ comment: message });
  };

  const { mutate: acceptQuotation } = useMutation({
    mutationFn: OrderDetailApi.PUT_ACCEPT_QUOTATION,
    onSuccess: () => {
      onChangeStatus("견적 승인", "견적서를 승인했어요");
    },
    onError: () => {
      setToast({ comment: "견적 승인하기에 실패했어요" });
    },
  });

  const { mutate: acceptPurchaseOrder } = useMutation({
    mutationFn: OrderDetailApi.PUT_ACCEPT_PURCHASE_ORDER,
    onSuccess: () => {
      onChangeStatus("제작 중", "발주서를 승인했어요");
    },
    onError: () => {
      setToast({ comment: "발주 승인하기에 실패했어요" });
    },
  });

  const { mutate: acceptPrdouction } = useMutation({
    mutationFn: OrderDetailApi.PUT_ACCEPT_PRODUCTION_COMPLETED,
    onSuccess: () => {
      onChangeStatus("제작 완료", "제작이 완료됐어요");
    },
    onError: () => {
      setToast({ comment: "제작 완료하기에 실패했어요" });
    },
  });

  const { mutate: sendAcquirerEmail } = useMutation({
    mutationFn: OrderDetailApi.POST_ACQUIRER_EMAIL,
    onSuccess: () => {},
    onError: () => {
      setToast({ comment: "서명 링크 전송에 실패했어요" });
    },
  });

  return (
    <S.Wrapper className="flex-row">
      <S.BodyWrapper>
        {data && (
          <>
            <OrderInfoSection
              sectionRef={scrollArgs.orderInfoRef}
              data={data.order}
              status={status}
            />
            {auth.role === "ROLE_FACTORY" && status !== "거래 완료" && (
              <>
                <Spacer width="100%" height="48px" />
                <UrgentSection
                  isUrgent={data.order.isUrgent}
                  orderId={String(orderId)}
                />
              </>
            )}
            <Spacer width="100%" height="60px" />
            <CustomerInfoSection data={data.customer} />
            <Spacer width="100%" height="60px" />
            <DeliveryInfoSection
              data={data.order.deliveryAddress}
              role={auth.role}
              status={status}
              orderId={String(orderId)}
            />
            <Spacer width="100%" height="60px" />
            <DrawingInfoSection
              sectionRef={scrollArgs.drawingInfoRef}
              data={data.order.drawingList}
              role={auth.role}
              status={status}
              orderId={String(orderId)}
            />
            <Spacer width="100%" height="60px" />
            <QuotationInfoSection
              sectionRef={scrollArgs.quotationInfoRef}
              data={data.quotation}
              role={auth.role}
              status={status}
              orderId={String(orderId)}
              scrollPage={() =>
                scrollArgs.scrollToSection(scrollArgs.quotationInfoRef)
              }
            />
            <Spacer width="100%" height="60px" />
            <PurchaseOrderInfoSection
              data={data.purchaseOrder}
              name={data.customer.name}
              role={auth.role}
              status={status}
              orderId={String(orderId)}
              minDate={data.quotation?.deliveryDate}
              scrollPage={() =>
                scrollArgs.scrollToSection(scrollArgs.quotationInfoRef)
              }
            />
          </>
        )}
      </S.BodyWrapper>
      <S.MenuWrapper
        className="flex-column-start"
        expanded={scrollArgs.menuExpanded}
      >
        <OrderDetailMenu
          focusedSection={scrollArgs.focusedSection}
          onOrderInfo={() =>
            scrollArgs.scrollToSection(scrollArgs.orderInfoRef)
          }
          onDrawingInfo={() =>
            scrollArgs.scrollToSection(scrollArgs.drawingInfoRef)
          }
          onQuotationInfo={() =>
            scrollArgs.scrollToSection(scrollArgs.quotationInfoRef)
          }
        />
        <Spacer width="100%" height="10px" />
        <OrderCommentMenu
          expanded={scrollArgs.menuExpanded}
          orderId={String(orderId)}
        />
      </S.MenuWrapper>
      {/* 견적 승인하기, 고객이 견적서를 확인하고 클릭 -> 견적 대기 -> 견적 승인 */}
      <OrderDetailBottombar
        showCondition={
          auth.role === "ROLE_CUSTOMER" &&
          status === "견적 대기" &&
          data !== undefined &&
          data.quotation !== null
        }
        announce="견적서를 확인하고 승인해주세요"
        buttonText="견적 승인하기"
        onButton={() => acceptQuotation(String(orderId))}
      />
      {/* 발주 승인하기, 회사가 발주서를 확인하고 클릭 -> 견적 승인 -> 제작 중 */}
      <OrderDetailBottombar
        showCondition={
          auth.role === "ROLE_FACTORY" &&
          status === "견적 승인" &&
          data !== undefined &&
          data.purchaseOrder !== null
        }
        announce="발주서를 확인하고 제작을 시작해주세요"
        buttonText="발주 승인하기"
        onButton={() => acceptPurchaseOrder(String(orderId))}
      />
      {/* 제작 완료, 회사가 제작을 마치고 클릭 -> 제작 중 -> 제작 완료 */}
      <OrderDetailBottombar
        showCondition={auth.role === "ROLE_FACTORY" && status === "제작 중"}
        announce="제작이 끝났다면 배송을 시작해주세요"
        buttonText="제작 완료"
        onButton={() => acceptPrdouction(String(orderId))}
      />
      {/* 배송 완료, 고객이 배송을 받았다면 클릭 -> 제작 완료 -> 거래 완료 */}
      <OrderDetailBottombar
        showCondition={auth.role === "ROLE_FACTORY" && status === "제작 완료"}
        announce="상품이 잘 도착했나요?"
        buttonText="배송 완료"
        onButton={() => sendAcquirerEmail(String(orderId))}
      />
    </S.Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { cookies } = context.req;
  const { orderId } = context.params as unknown as { orderId: string };

  setSsrAxiosHeader(cookies);
  await queryClient.prefetchQuery({
    queryKey: [`orderDetail/${orderId}`],
    queryFn: () => OrderDetailApi.GET_ORDER_DETAIL(orderId),
  });
  await queryClient.prefetchQuery({
    queryKey: [`orderDetailComments/${orderId}`],
    queryFn: () => OrderDetailApi.GET_ORDER_COMMENTS(orderId),
  });

  const queryState = queryClient.getQueryState([`orderDetail/${orderId}`]);
  if (queryState?.status === "error") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
