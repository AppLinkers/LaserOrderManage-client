import { axiosPrivate } from "../axios";
import { IIngredientRequest, IIngredientStockRequest, IIngredientStockResponse } from "./Ingredient.types";

export const IngredientApi = {
    GET_INGREDIENT_STOCK: async (
        date: string,
        unit: string
    ): Promise<IIngredientStockResponse> => {
        console.log("query");
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
    }

}