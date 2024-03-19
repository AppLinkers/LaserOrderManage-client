import { useState } from "react";
import IngredientEditBottombar from "../bottombar/IngredientEditBottombar.index";
import IngredientCreateBottombar from "../bottombar/IngredientCreateBottombar.index";
import * as S from "./IngredientStatusList.styles"
import EditIcon from "@/src/components/commons/icons/EditIcon.index";
import Spacer from "@/src/components/commons/spacer/Spacer.index";
import { Ingredient } from "@/src/lib/apis/ingredient/Ingredient.types";
import DeleteIngredientModal from "@/src/components/commons/modal/ingredient/DeleteIngredientModal.index";
import { INGREDIENT_UNIT_TYPE } from "@/src/components/commons/filters/factory/FactoryFilter.queries";
import { getNowDate, getNumberSplitFromNumber } from "@/src/lib/utils/utils";
import { UserAuthority } from "@/src/lib/apis/user/User.types";

interface IIngredientStatusListProps {
    authorityList: UserAuthority[];
    selectedDate: string;
    selectedUnit: string;
    ingredientList: Ingredient[];
    refetch: () => void;
}

export default function IngredientStatusList ({authorityList, selectedDate, selectedUnit, ingredientList, refetch}: IIngredientStatusListProps) {
    const [date, setDate] = useState(getNowDate());
    const [showEditBar, setShowEditBar] = useState(false);
    const [showCreateBar, setShowCreateBar] = useState(false);
    const [focusedItem, setFocusedItem] = useState<Ingredient | null>(null);
    const [showDeleteIngredientModal, setShowDeleteIngredientModal] = useState(false);


    if (selectedDate !== date) {
        setDate(selectedDate);
        setShowEditBar(false);
        setShowCreateBar(false);
    }

    const showEditBarWithData = (ingredient: Ingredient) => {
        if (showCreateBar) {
            setShowCreateBar(false);
        }
        
        if (!showEditBar) {
            setFocusedItem(ingredient);
            setShowEditBar(true);
            return;
        }

        if (showEditBar && focusedItem === ingredient) {
            setShowEditBar(false);
            return;
        }

        if (showEditBar && focusedItem !== ingredient) {
            setFocusedItem(ingredient);
        }
    }

    const customShowCreateBar = () => {
        if (showEditBar) {
            setShowEditBar(false);
        }
        setShowCreateBar(true);
    }

    const dateFormat = (date: string) => {
        const parts = date.split("-");
        return `${parts[0]}년 ${parts[1]}월 ${parts[2]}일`;
    }

    const selectedUnitType = INGREDIENT_UNIT_TYPE.find(el => el.key === selectedUnit);

    return (
        <>
            <S.Wrapper>
                {authorityList.includes("AUTHORITY_ADMIN") && (
                    <>
                        <S.Header className="flex-row-end">
                            <S.CreateBox
                                className="flex-row"
                                onClick={customShowCreateBar}
                            >
                                <EditIcon size={20}/>
                                <Spacer width="5px" height="100%" />
                                <S.CreateBoxText className="regular16">
                                    자재 추가하기
                                </S.CreateBoxText>
                            </S.CreateBox>
                        </S.Header> 
                    </>
                )} 
                <div>
          <S.Table>
            <S.TableHeader>
              <tr>
                <th rowSpan={2}>재 질</th>
                <th rowSpan={2}>두께</th>
                <th rowSpan={2}>크기</th>
                <th rowSpan={2}>무게</th>
                <th colSpan={5}>{`${dateFormat(selectedDate)} 자재 재고 현황 (${selectedUnitType?.type}, ${selectedUnitType?.unit})`}</th>
              </tr>
              <tr>
                <th>전일 재고</th>
                <th>입고</th>
                <th>생산</th>
                <th>당일 재고</th>
                <th>적정 재고</th>
              </tr>
            </S.TableHeader>
            {ingredientList.map((el) => (
                <IngredientStockItem key={el.id} unit={selectedUnit} ingredient={el} showEditBar={() => showEditBarWithData(el)}/>
            ))}
          </S.Table>
        </div>
            </S.Wrapper>
            <IngredientEditBottombar show={showEditBar} authorityList={authorityList} ingredient={focusedItem!} onClose={() => setShowEditBar(false)} refetch={refetch} isNow={selectedDate === getNowDate()} showDeleteIngredientModal={() => setShowDeleteIngredientModal(true)}/>
            <IngredientCreateBottombar show={showCreateBar} onClose={() => setShowCreateBar(false)} refetch={refetch}/>
            <DeleteIngredientModal ingredient={focusedItem!} isOpen={showDeleteIngredientModal} onClose={() => setShowDeleteIngredientModal(false)} refetch={refetch} closeEditBar={() => setShowEditBar(false)}/>
        </>
       
    )
}

interface IIngredientStockItemProps {
    unit: string;
    ingredient: Ingredient;
    showEditBar: () => void; 
}

const IngredientStockItem = ({unit, ingredient, showEditBar} : IIngredientStockItemProps) => {
    return (
        <S.TableBody onClick={showEditBar}>
            <tr>
            <td>{ingredient.texture}</td>
            <td>{`${Number.isInteger(ingredient.thickness) ? ingredient.thickness.toFixed(1) : ingredient.thickness} T`}</td>
            <td>{`${ingredient.width} x ${ingredient.height}`}</td>
            <td>{`${getNumberSplitFromNumber(ingredient.weight)} kg`}</td>
            <td>{getNumberSplitFromNumber(unit === "count" ? ingredient.stockCount.previousDay : ingredient.stockWeight.previousDay)}</td>
            <td>{getNumberSplitFromNumber(unit === "count" ? ingredient.stockCount.incoming : ingredient.stockWeight.incoming)}</td>
            <td>{getNumberSplitFromNumber(unit === "count" ? ingredient.stockCount.production : ingredient.stockWeight.production)}</td>
            <td>{getNumberSplitFromNumber(unit === "count" ? ingredient.stockCount.currentDay : ingredient.stockWeight.currentDay)}</td>
            <td>{getNumberSplitFromNumber(unit === "count" ? (ingredient.stockCount.optimal || 0) : (ingredient.stockWeight.optimal || 0))}</td>
            </tr>
        </S.TableBody>
    )
}