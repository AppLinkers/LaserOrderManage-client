import { IBaseListSimpleResponse } from "../base/base.types";

export type Ingredient = {
    id: number;
    texture: string;
    thickness: number;
}

export type IIngredientListResponse = IBaseListSimpleResponse<Ingredient>;