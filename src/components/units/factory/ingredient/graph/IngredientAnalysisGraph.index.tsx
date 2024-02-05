import { IIngredientGraphItemListResponse, Item } from "@/src/lib/apis/ingredient/Ingredient.types"
import * as S from "./IngredientAnalysisGraph.styles"
import { getMonthList, getYearList } from "@/src/lib/utils/utils"
import { GRAPH_BACKGROUND_COLORS, GRAPH_COLORS } from "@/src/lib/constants/constant"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IBaseListSimpleResponse } from "@/src/lib/apis/base/base.types";

interface IIngredientAnalysisGraphProps {
    timeUnit: string;
    startDate: string;
    endDate: string;
    graphItemList: IBaseListSimpleResponse<Item>;
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

export const graphOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        }
    }
}

export const getLabel = (timeUnit: string, startDate: string, endDate: string) => {
    if (timeUnit === "month") {
        return getMonthList(startDate, endDate);
    } else if (timeUnit === "year") {
        return getYearList(startDate, endDate);
    }
}

export const getDatasets = (graphItemList: IBaseListSimpleResponse<Item>) => {
    const datasets = [];
    for (var i = 0; i < graphItemList.totalElements; i++) {
        const item = graphItemList.contents[i];
        const dataset = {
            label: item.item,
            data: item.data,
            borderColor: GRAPH_COLORS[i],
            backgroundColor: GRAPH_BACKGROUND_COLORS[i]
        }
        datasets.push(dataset);
    }

    return datasets;
}

export default function IngredientAnalysisGraph ({
    timeUnit,
    startDate,
    endDate,
    graphItemList
}: IIngredientAnalysisGraphProps) {
    const labels = getLabel(timeUnit, startDate, endDate);
    const datasets = getDatasets(graphItemList);
    
    const data = {
        labels,
        datasets
    }

    return (
        <>
            <S.Wrapper>
                <Line options={graphOptions} data={data}></Line>
            </S.Wrapper>
        </>
    )
}