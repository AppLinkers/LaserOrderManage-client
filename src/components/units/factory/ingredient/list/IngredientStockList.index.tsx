import { useState } from "react";
import IngredientEditBottombar from "../bottombar/IngredientEditBottombar.index";
import IngredientCreateBottombar from "../bottombar/IngredientCreateBottombar.index";
import * as S from "./IngredientStockList.styles"
import EditIcon from "@/src/components/commons/icons/EditIcon.index";
import Spacer from "@/src/components/commons/spacer/Spacer.index";
import { Ingredient } from "@/src/lib/apis/ingredient/Ingredient.types";
import DeleteIngredientModal from "@/src/components/commons/modal/ingredient/DeleteIngredientModal.index";

interface IIngredientStockListProps {
    selectedDate: string;
    ingredientList: Ingredient[];
    refetch: () => void;
}

export default function IngredientStockList ({selectedDate, ingredientList, refetch}: IIngredientStockListProps) {
    const [showEditBar, setShowEditBar] = useState(false);
    const [showCreateBar, setShowCreateBar] = useState(false);
    const [focusedItem, setFocusedItem] = useState<Ingredient | null>(null);
    const [showDeleteIngredientModal, setShowDeleteIngredientModal] = useState(false);

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
        const parts = date.split(". ");

        const year = '20' + parts[0].trim();
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);

        return `${year}년 ${month}월 ${day}일`;
    }

    return (
        <>
            <S.Wrapper> 
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
                <div>
          <S.Table>
            <S.TableHeader>
              <tr>
                <th rowSpan={2}>재 질</th>
                <th rowSpan={2}>두께</th>
                <th rowSpan={2}>크기</th>
                <th colSpan={4}>{`${dateFormat(selectedDate)} 자재 재고 현황`}</th>
                <th rowSpan={2}>적정 재고</th>
              </tr>
              <tr>
                <th>전일 재고</th>
                <th>입고</th>
                <th>생산</th>
                <th>당일 재고</th>
              </tr>
            </S.TableHeader>
            {ingredientList.map((el) => (
                <IngredientStockItem key={el.id} ingredient={el} showEditBar={() => showEditBarWithData(el)}/>
            ))}
          </S.Table>
        </div>
            </S.Wrapper>
            <IngredientEditBottombar show={showEditBar} ingredient={focusedItem!} onClose={() => setShowEditBar(false)} refetch={refetch}/>
            <IngredientCreateBottombar show={showCreateBar} onClose={() => setShowCreateBar(false)} refetch={refetch}/>
            <DeleteIngredientModal ingredient={focusedItem} isOpen={showDeleteIngredientModal} onClose={() => setShowDeleteIngredientModal(false)}/>
        </>
       
    )
}

interface IIngredientStockItemProps {
    ingredient: Ingredient;
    showEditBar: () => void; 
}

const IngredientStockItem = ({ingredient, showEditBar} : IIngredientStockItemProps) => {
    return (
        <S.TableBody onClick={showEditBar}>
            <tr>
            <td>{ingredient.texture}</td>
            <td>{`${ingredient.thickness} T`}</td>
            <td>{`${ingredient.width} x ${ingredient.height}`}</td>
            <td>{ingredient.stock.previousDay}</td>
            <td>{ingredient.stock.incoming || ''}</td>
            <td>{ingredient.stock.production}</td>
            <td>{ingredient.stock.currentDay}</td>
            <td>{ingredient.stock.optimal || ''}</td>
            </tr>
        </S.TableBody>
    )
}