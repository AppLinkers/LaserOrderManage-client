import FactoryIngredientStatusFilter from "@/src/components/commons/filters/factory/FactoryIngredientStatusFilter.index";
import IngredientTab from "@/src/components/commons/tabs/ingredient/IngredientTab.index";
import { BodyWrapper, PageTitle } from "@/src/components/commons/wrapper/BodyWrapper.styles";
import KumohHead from "@/src/components/shared/layout/head/NextHead.index";
import IngredientStatusInfo from "./IngredientStatusInfo.index";
import { useIngredientTab } from "@/src/lib/hooks/useTab";
import { useFactoryIngredientStatusFilter } from "@/src/lib/hooks/useFilter";
import FactoryIngredientAnalysisFilter from "@/src/components/commons/filters/factory/FactoryIngredientAnalysisFilter.index";
import IngredientStatusList from "./list/IngredientStatusList.index";
import { IIngredientGraphItemListResponse, IIngredientStatusResponse } from "@/src/lib/apis/ingredient/Ingredient.types";
import IngredientAnalysisGraph from "./graph/IngredientAnalysisGraph.index";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { IngredientApi } from "@/src/lib/apis/ingredient/IngredientApi";
import { GetServerSideProps } from "next";
import { setSsrAxiosHeader } from "@/src/lib/utils/setSsrAxiosHeader";
import { getNowDate, getParamDate } from "@/src/lib/utils/utils";
import { AppPages } from "@/src/lib/constants/appPages";
import { useState } from "react";

export default function Ingredient() {
    const [tab, onTabClick] = useIngredientTab("재고 현황");
    const statusFilterArgs = useFactoryIngredientStatusFilter();

    const {data : statusData, refetch : statusRefetch} = useQuery({
        queryKey: [
            "ingredientStatus",
            statusFilterArgs.dateFieldChanged
        ],
        queryFn: () => 
            IngredientApi.GET_INGREDIENT_STATUS(
                getParamDate(statusFilterArgs.date)
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
                        <FactoryIngredientStatusFilter {...statusFilterArgs}/>
                        {statusData && (
                            <>
                                <IngredientStatusInfo 
                                    purchasePrice={statusData.averagePrice.purchase}
                                    sellPrice={statusData.averagePrice.sell}
                                    count={statusData.totalStock.count}
                                    weight={statusData.totalStock.weight}
                                />
                                <IngredientStatusList 
                                    selectedDate={statusData.date}
                                    selectedUnit={statusFilterArgs.unitType}
                                    ingredientList={statusData.ingredientList}
                                    refetch={statusRefetch}
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
        queryKey: ["ingredientStatus", false],
        queryFn: () => IngredientApi.GET_INGREDIENT_STATUS(getNowDate())
    });

    const queryState = queryClient.getQueryState(["ingredientStatus"]);
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