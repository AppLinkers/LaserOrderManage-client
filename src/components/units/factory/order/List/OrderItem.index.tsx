import OrderProgressbar from "@/src/components/commons/progressbar/order/OrderProgressbar.index";
import * as S from "./OrderList.styles";
import Image from "next/image";
import { IOrderItemProps } from "./OrderList.types";
import {
  getCost,
  getCustomerInfo,
  getDate,
  getManufacurings,
} from "@/src/lib/utils/utils";
import { useRouter } from "next/router";
import { useRef, MouseEvent } from "react";
import { AppPages } from "@/src/lib/constants/appPages";

export default function FactoryOrderItem(props: IOrderItemProps) {
  const router = useRouter();
  const requestRef = useRef<HTMLAnchorElement>(null);

  const onItem = (id: number, event: MouseEvent<HTMLElement>) => {
    if (requestRef.current && requestRef.current.contains(event.target as Node))
      return;
    router.push(`${AppPages.ORDER_DETAIL}/${id}`);
  };
  return (
    <S.Wrapper className="flex-row" onClick={(e) => onItem(props.data.id, e)}>
      <Image
        width={200}
        height={200}
        src={props.data.imgUrl}
        alt="리스트 이미지"
        style={S.ImageWrapper}
      />
      <S.InfoWrapper className="flex-column-between">
        <div>
          <S.StageLabel className="medium16">{props.data.stage}</S.StageLabel>
          <S.HeaderWrapper className="flex-row-between-center">
            <div className="flex-row-bottom">
              <S.OrderName className="bold20">{props.data.name}</S.OrderName>
              {props.data.isUrgent ? (
                <S.OrderUrgent className="bold14">긴급</S.OrderUrgent>
              ) : null}
              {props.data.request && (
                <S.OrderRequest
                  className="regular14"
                  ref={requestRef}
                  onClick={() =>
                    props.onOpenModal({
                      name: props.data.name,
                      request: props.data.request!,
                    })
                  }
                >
                  요청사항
                </S.OrderRequest>
              )}
            </div>
            {props.data.cost && (
              <p className="bold24">{getCost(props.data.cost)}</p>
            )}
          </S.HeaderWrapper>
          <S.InfoContentWrapper>
            <p className="regular16">
              {getCustomerInfo(props.data.customer, props.data.company)}
            </p>
          </S.InfoContentWrapper>
          <S.InfoContentWrapper className="flex-row">
            <S.InfoLabel className="regular16">작업 범위</S.InfoLabel>
            <p className="regular16">
              {getManufacurings(props.data.manufacturingList)}
            </p>
          </S.InfoContentWrapper>
          <div className="flex-row">
            <S.InfoContentWrapper className="flex-row">
              <S.InfoLabel className="regular16">거래 생성일</S.InfoLabel>
              <p className="regular16">{getDate(props.data.createdAt)}</p>
            </S.InfoContentWrapper>
            {typeof props.data.deliveryAt !== "undefined" && (
              <S.InfoContentWrapper className="flex-row">
                <S.InfoLabel className="regular16">납기일</S.InfoLabel>
                <p className="regular16">{getDate(props.data.deliveryAt)}</p>
              </S.InfoContentWrapper>
            )}
          </div>
        </div>
        <OrderProgressbar stage={props.data.stage} />
      </S.InfoWrapper>
    </S.Wrapper>
  );
}
