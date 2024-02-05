import { axiosPrivate } from "../axios";
import { IIngredientGraphItemListResponse, IIngredientNameListResponse, IIngredientRequest, IIngredientStockRequest, IIngredientStockResponse } from "./Ingredient.types";

export const IngredientApi = {
    GET_INGREDIENT_STOCK: async (
        date: string,
        unit: string
    ): Promise<IIngredientStockResponse> => {
        const response = await axiosPrivate.get(
            `/factory/ingredient/stock?date=${date}&unit=${unit}`,
        );
        return response.data;
    },
    POST_INGREDIENT: async (
        payload: IIngredientRequest,
    ): Promise<null> => {
        const response = await axiosPrivate.post(
            "/factory/ingredient",
            payload
        );
        return response.data;
    },
    EDIT_INGREDIENT_STOCK: async ({
        id,
        payload,
    } : {
        id: number;
        payload: IIngredientStockRequest;
    }): Promise<null> => {
        const response = await axiosPrivate.patch(
            `/factory/ingredient/${id}`,
            payload,
        );
        return response.data;
    },
    DELETE_INGREDIENT: async (id: number): Promise<null> => {
        const response = await axiosPrivate.delete(
            `/factory/ingredient/${id}`,
        );
        return response.data;
    },
    GET_INGREDIENT_LIST: async (): Promise<IIngredientNameListResponse> => {
        const response = await axiosPrivate.get("/factory/ingredient");
        return response.data;
    },
    GET_INGREDIENT_ANALYSIS: async (
        data: string,
        ingredientId: number | null,
        timeUnit: string,
        startDate: string,
        endDate: string,
        unit: string,
        itemUnit: string,
        stockItem: string,
        priceItem: string
    ): Promise<IIngredientGraphItemListResponse> => {
        let queryUrl = `/factory/ingredient/analysis?data=${data}`;
        
        if (data === "ingredient") {
            queryUrl += `&ingredient-id=${ingredientId}`;
        }

        queryUrl += `&time-unit=${timeUnit}&start-date=${startDate}&end-date=${endDate}&unit=${unit}&item-unit=${itemUnit}`;

        if (itemUnit === "stock") {
            queryUrl += `&stock-item=${stockItem}`;
        }

        if (itemUnit === "price") {
            queryUrl += `&price-item=${priceItem}`;
        }

        const response = await axiosPrivate.get(queryUrl);
        return response.data;
    }

}