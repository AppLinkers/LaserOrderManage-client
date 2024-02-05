import FactoryIngredientStockFilter from "@/src/components/commons/filters/factory/FactoryIngredientStockFilter.index";
import IngredientTab from "@/src/components/commons/tabs/ingredient/IngredientTab.index";
import { BodyWrapper, PageTitle } from "@/src/components/commons/wrapper/BodyWrapper.styles";
import KumohHead from "@/src/components/shared/layout/head/NextHead.index";
import StockInfo from "./StockInfo.index";
import { useStockTab } from "@/src/lib/hooks/useTab";
import { useFactoryIngredientAnalysisFilter, useFactoryIngredientStockFilter } from "@/src/lib/hooks/useFilter";
import FactoryIngredientAnalysisFilter from "@/src/components/commons/filters/factory/FactoryIngredientAnalysisFilter.index";
import IngredientStockList from "./list/IngredientStockList.index";
import { IIngredientGraphItemListResponse, IIngredientStockResponse } from "@/src/lib/apis/ingredient/Ingredient.types";
import IngredientAnalysisGraph from "./graph/IngredientAnalysisGraph.index";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { IngredientApi } from "@/src/lib/apis/ingredient/IngredientApi";
import { GetServerSideProps } from "next";
import { setSsrAxiosHeader } from "@/src/lib/utils/setSsrAxiosHeader";
import { getNowDate, getParamDate } from "@/src/lib/utils/utils";
import { AppPages } from "@/src/lib/constants/appPages";
import { useState } from "react";

export default function Stock() {
    const [tab, onTabClick] = useStockTab("재고 현황");
    const stockFilterArgs = useFactoryIngredientStockFilter();

    const {data : stockData, refetch : stockRefetch} = useQuery({
        queryKey: [
            "ingredientStock",
            stockFilterArgs.unitType,
            stockFilterArgs.dateFieldChanged
        ],
        queryFn: () => 
            IngredientApi.GET_INGREDIENT_STOCK(
                getParamDate(stockFilterArgs.date),
                stockFilterArgs.unitType
            ),
    });

    const [analysisData, setAnalysisData] = useState<IIngredientGraphItemListResponse>();

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
                        {stockData && (
                            <>
                                <StockInfo 
                                    purchasePrice={stockData.averagePrice.purchase}
                                    sellPrice={stockData.averagePrice.sell}
                                    count={stockData.totalStock.count}
                                    weight={stockData.totalStock.weight}
                                />
                                <IngredientStockList 
                                    selectedDate={stockFilterArgs.date}
                                    ingredientList={stockData.ingredientList}
                                    refetch={stockRefetch}
                                />
                            </>
                        )}
                    </>
                )}
                {tab === "재고 분석" && (
                    <>
                        <FactoryIngredientAnalysisFilter setAnalysisData={setAnalysisData}/>
                        {analysisData && (
                            <IngredientAnalysisGraph 
                                timeUnit={analysisData.timeUnit}
                                startDate={analysisData.startDate}
                                endDate={analysisData.endDate}
                                graphItemList={analysisData.itemList}
                            ></IngredientAnalysisGraph>
                        )}
                    </>
                )}
            </BodyWrapper>
        </>
    )
}

export const getSeverSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();
    const { cookies } = context.req;

    setSsrAxiosHeader(cookies);
    await queryClient.prefetchQuery({
        queryKey: ["ingredientStock", "count", false],
        queryFn: () => IngredientApi.GET_INGREDIENT_STOCK(getNowDate(), "count")
    });

    const queryState = queryClient.getQueryState(["ingredientStock", "count"]);
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

    return {
        props: {
          dehydratedState: dehydrate(queryClient),
        },
      };
}