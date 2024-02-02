import { IBaseListSimpleResponse } from "../base/base.types";

export type IIngredientStockResponse = {
    averagePrice: AveragePrice;
    totalStock: TotalStock;
    ingredientList: Ingredient[];
}

export type AveragePrice = {
    purchase: number;
    sell: number;
}

export type TotalStock = {
    count: number;
    weight: number;
}

export type Ingredient = {
    id: number;
    texture: string;
    thickness: number;
    width: number;
    height: number;
    stock: Stock;
    price: Price;
}

export type Stock = {
    previousDay: number | null;
    incoming: number | null;
    production: number | null;
    currentDay: number;
    optimal: number | null;
}

export type Price = {
    purchase: number;
    sell: number;
}

export type IngredientName = {
    id: number;
    texture: string;
    thickness: number;
}

export type IIngredientNameListResponse = IBaseListSimpleResponse<IngredientName>;