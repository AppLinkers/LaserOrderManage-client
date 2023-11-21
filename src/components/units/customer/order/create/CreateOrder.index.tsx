import Spacer from "@/src/components/commons/spacer/Spacer.index";
import * as S from "./CreateOrder.styles";
import CreateOrderMenu from "@/src/components/commons/menu/create/CreateOrderMenu";
import {
  BASIC_INFO,
  DETAIL_INFO,
  DILIVER_INFO,
} from "@/src/components/commons/menu/create/CreateOrderMenu.types";
import { useState } from "react";
import BasicInfo from "./pages/BasicInfo.index";
import RequestInfo from "./pages/RequestInfo.index";
import DeliveryInfo from "./pages/DeliveryInfo.index";
import DrawingInfo from "./pages/DrawingInfo.index";

export default function CreateOrder() {
  const [currentPage, setCurrentPage] = useState(2);

  const movePage = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <S.Wrapper>
      <S.BodyWrapper className="flex-row">
        <CreateOrderMenu menus={[BASIC_INFO, DETAIL_INFO, DILIVER_INFO]} />
        <Spacer width="15px" height="100%" />
        <S.MainWrapper className="flex-column">
          {currentPage === 0 && <BasicInfo onNext={() => movePage(1)} />}
          {currentPage === 1 && <DrawingInfo />}
          {currentPage === 2 && (
            <RequestInfo
              onNext={() => movePage(3)}
              onBefore={() => movePage(1)}
            />
          )}
          {currentPage === 3 && <DeliveryInfo />}
        </S.MainWrapper>
      </S.BodyWrapper>
    </S.Wrapper>
  );
}
