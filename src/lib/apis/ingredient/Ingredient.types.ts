import { IBaseListSimpleResponse } from "../base/base.types";

export type IIngredientStatusResponse = {
    averagePrice: Price;
    totalStock: TotalStock;
    ingredientList: Ingredient[];
    date: string
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
    weight: number;
    stockCount: Stock;
    stockWeight: Stock;
    price: Price;
    isDeleted: boolean;
}

export type Stock = {
    previousDay: number;
    incoming: number;
    production: number;
    currentDay: number;
    optimal: number | null;
}

export type Price = {
    purchase: number;
    sell: number;
}

export type IIngredientRequest = {
    texture: string;
    thickness: number;
    width: number;
    height: number;
    weight: number;
    price: {
        purchase: number;
        sell: number;
    };
    optimalStock: number | null;
}

export type IIngredientStatusRequest = {
    stock: {
        incoming: number;
        production: number;
        currentDay: number;
    }
    price: {
        purchase: number;
        sell: number;
    }
    optimalStock: number | null;
}

export type IngredientName = {
    id: number;
    texture: string;
    thickness: number;
}

export type IIngredientNameListResponse = IBaseListSimpleResponse<IngredientName>;

export type IIngredientGraphItemListResponse = {
    timeUnit: string;
    startDate: string;
    endDate: string;
    itemList: IBaseListSimpleResponse<Item>;
}

export type Item = {
    item: string;
    data: number[];
}