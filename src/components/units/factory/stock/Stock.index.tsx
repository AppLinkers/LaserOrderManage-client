import FactoryStockFilter from "@/src/components/commons/filters/factory/FactoryStockFilter.index";
import StockTab from "@/src/components/commons/tabs/stock/StockTab.index";
import { BodyWrapper, PageTitle } from "@/src/components/commons/wrapper/BodyWrapper.styles";
import KumohHead from "@/src/components/shared/layout/head/NextHead.index";

export default function Stock() {
    return (
        <>
            <KumohHead title="자재 재고 관리 | 금오거래센터" />
            <BodyWrapper className="flex-column-center">
                <PageTitle className="bold40">자재 재고 관리</PageTitle>
                <StockTab
                    tabs={["재고 현황", "재고 분석"]}
                    selectedTab={"재고 현황"}
                    onTabClick={() => {}}
                />
                <FactoryStockFilter />
            </BodyWrapper>
        </>
    )
}