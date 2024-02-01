import FactoryIngredientStockFilter from "@/src/components/commons/filters/factory/FactoryIngredientStockFilter.index";
import IngredientTab from "@/src/components/commons/tabs/ingredient/IngredientTab.index";
import { BodyWrapper, PageTitle } from "@/src/components/commons/wrapper/BodyWrapper.styles";
import KumohHead from "@/src/components/shared/layout/head/NextHead.index";
import StockInfo from "./StockInfo.index";
import { useStockTab } from "@/src/lib/hooks/useTab";
import { useFactoryIngredientAnalysisFilter, useFactoryIngredientStockFilter } from "@/src/lib/hooks/useFilter";
import FactoryIngredientAnalysisFilter from "@/src/components/commons/filters/factory/FactoryIngredientAnalysisFilter.index";

export default function Stock() {
    const [tab, onTabClick] = useStockTab("재고 현황");
    const stockFilterArgs = useFactoryIngredientStockFilter();
    const analysisFilterArgs = useFactoryIngredientAnalysisFilter();

    return (
        <>
            <KumohHead title="자재 재고 관리 | 금오거래센터" />
            <BodyWrapper className="flex-column-center">
                <PageTitle className="bold40">자재 재고 관리</PageTitle>
                <IngredientTab
                    tabs={["재고 현황", "재고 분석"]}
                    selectedTab={tab}
                    onTabClick={onTabClick}
                />
                {tab === "재고 현황" && (
                    <>
                        <FactoryIngredientStockFilter {...stockFilterArgs}/>
                        <StockInfo 
                            purchasePrice={1000}
                            sellPrice={1000}
                            count={10000}
                            weight={10000}
                        />
                    </>
                )}

                {tab === "재고 분석" && (
                    <>
                        <FactoryIngredientAnalysisFilter {...analysisFilterArgs} />
                    </>
                )}
                
            </BodyWrapper>
        </>
    )
}