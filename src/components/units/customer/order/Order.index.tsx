import OrderFilter from "@/src/components/commons/filters/order/OrderFilter.index";
import OrderSearchbar from "@/src/components/commons/searchbars/order/OrderSearchbar.index";
import { BodyWrapper } from "@/src/components/commons/wrapper/BodyWrapper.styles";
import CustomerOrderList from "./List/OrderList.index";
import OrderModal from "@/src/components/commons/modal/order/OrderModal.index";
import {
  MANUFACTURING,
  STAGE,
} from "@/src/components/commons/filters/order/OrderFilterQueries";
import { useOrderFilter } from "@/src/lib/hooks/useFilter";
import OrderPagination from "@/src/components/commons/paginations/order/OrderPagination.index";
import { useSearchbar } from "@/src/lib/hooks/useSearchBar";
import { useOrderModal } from "@/src/lib/hooks/useModal";
import { usePagination } from "@/src/lib/hooks/usePagination";
import { useQuery } from "@tanstack/react-query";
import { OrderApi } from "@/src/lib/apis/order/OrderApi";

export default function Order() {
  const searchBarArgs = useSearchbar();
  const { filterMap, onResetFilter, onFilterClick } = useOrderFilter();
  const { isOpen, content, onOpenWithContent, onClose } = useOrderModal();
  const paginationArgs = usePagination({ count: 4 });

  const { data } = useQuery({
    queryKey: ["customerOrder"],
    queryFn: () => OrderApi.GET_CUSTOMER_ORDER(),
  });

  return (
    <>
      <BodyWrapper className="flex-column-center">
        <p className="page-title">거래 목록</p>
        <OrderSearchbar
          placeholder="거래 이름으로 검색하기"
          {...searchBarArgs}
        />
        <OrderFilter
          filterMap={filterMap}
          filterGroups={[STAGE, MANUFACTURING]}
          onResetFilter={onResetFilter}
          onFilterClick={onFilterClick}
        />
        {data && (
          <CustomerOrderList data={data} onOpenModal={onOpenWithContent} />
        )}
        <OrderPagination {...paginationArgs} />
      </BodyWrapper>
      <OrderModal isOpen={isOpen} content={content} onClose={onClose} />
    </>
  );
}
