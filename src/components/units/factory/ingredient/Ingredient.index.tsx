import FactoryIngredientStockFilter from "@/src/components/commons/filters/factory/FactoryIngredientStockFilter.index";
import IngredientTab from "@/src/components/commons/tabs/ingredient/IngredientTab.index";
import { BodyWrapper, PageTitle } from "@/src/components/commons/wrapper/BodyWrapper.styles";
import KumohHead from "@/src/components/shared/layout/head/NextHead.index";
import StockInfo from "./StockInfo.index";
import { useStockTab } from "@/src/lib/hooks/useTab";
import { useFactoryIngredientAnalysisFilter, useFactoryIngredientStockFilter } from "@/src/lib/hooks/useFilter";
import FactoryIngredientAnalysisFilter from "@/src/components/commons/filters/factory/FactoryIngredientAnalysisFilter.index";
import IngredientStockList from "./list/IngredientStockList.index";
import { IIngredientStockResponse } from "@/src/lib/apis/ingredient/Ingredient.types";

const RESPONSE: IIngredientStockResponse = {
    averagePrice: {
        purchase: 1000,
        sell: 1000
    },
    totalStock: {
        count: 10000,
        weight: 10000
    },
    ingredientList: [
        {
            id: 0,
            texture: "SS-403",
            thickness: 1.5,
            width: 10,
            height: 10,
            stock: {
                previousDay: null,
                incoming: null,
                production: null,
                currentDay: 0,
                optimal: 80
            },
            price: {
                purchase: 1000,
                sell: 1000
            }
        },
        {
            id: 1,
            texture: "SS-403",
            thickness: 1.5,
            width: 10,
            height: 10,
            stock: {
                previousDay: 100,
                incoming: 10,
                production: 20,
                currentDay: 90,
                optimal: null
            },
            price: {
                purchase: 1000,
                sell: 1000
            }
        }
    ]
}

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
                            purchasePrice={RESPONSE.averagePrice.purchase}
                            sellPrice={RESPONSE.averagePrice.sell}
                            count={RESPONSE.totalStock.count}
                            weight={RESPONSE.totalStock.weight}
                        />
                        <IngredientStockList 
                            selectedDate={stockFilterArgs.date}
                            ingredientList={RESPONSE.ingredientList}
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