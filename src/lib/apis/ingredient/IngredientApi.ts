import { axiosPrivate } from "../axios";
import { IIngredientStockResponse } from "./Ingredient.types";

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

}