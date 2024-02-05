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

const RESPONSE_FOR_STOCK: IIngredientStockResponse = {
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

const RESPONSE_FOR_GRAPH: IIngredientGraphItemListResponse = {
    timeUnit : "month",
    startDate : "2024-01",
    endDate : "2024-12",
    itemList : {
        contents : [
            {
                item : "입고",
                data : [30, 50, 40, 20, 60, 30, 10, 80, 90, 30, 90, 100]
            },
            {
                item : "생산",
                data : [70, 30, 10, 30, 70, 20, 30, 60, 40, 80, 20, 30]
            },
            {
                item : "재고",
                data : [100, 20, 40, 30, 60, 30, 40, 70, 80, 100, 30, 20]
            },
            {
                item : "적정 재고",
                data : [20, 50, 20, 70, 40, 50, 20, 70, 10, 80, 100, 40]
            }
        ],
        totalElements : 4
    }
}

export default function Stock() {
    const [tab, onTabClick] = useStockTab("재고 현황");
    const stockFilterArgs = useFactoryIngredientStockFilter();
    const analysisFilterArgs = useFactoryIngredientAnalysisFilter();

    const {data, refetch} = useQuery({
        queryKey: [
            "ingredientStock",
            stockFilterArgs.unitType,
            stockFilterArgs.dateFieldChanged
        ],
        queryFn: () => RESPONSE_FOR_STOCK
            // IngredientApi.GET_INGREDIENT_STOCK(
            //     getParamDate(stockFilterArgs.date),
            //     stockFilterArgs.unitType
            // ),
    });

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
                        {data && (
                            <>
                                <StockInfo 
                                    purchasePrice={data.averagePrice.purchase}
                                    sellPrice={data.averagePrice.sell}
                                    count={data.totalStock.count}
                                    weight={data.totalStock.weight}
                                />
                                <IngredientStockList 
                                    selectedDate={stockFilterArgs.date}
                                    ingredientList={data.ingredientList}
                                />
                            </>
                        )}
                    </>
                )}
                {tab === "재고 분석" && (
                    <>
                        <FactoryIngredientAnalysisFilter {...analysisFilterArgs} />
                        {RESPONSE_FOR_GRAPH && (
                            <IngredientAnalysisGraph 
                                timeUnit={RESPONSE_FOR_GRAPH.timeUnit}
                                startDate={RESPONSE_FOR_GRAPH.startDate}
                                endDate={RESPONSE_FOR_GRAPH.endDate}
                                graphItemList={RESPONSE_FOR_GRAPH.itemList}
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