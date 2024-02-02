import { useToastify } from "@/src/lib/hooks/useToastify";
import * as S from "./DeleteIngredientModal.styles";
import Modal, { IModalProps } from "../Modal.index";
import Spacer from "../../spacer/Spacer.index";
import { Ingredient } from "@/src/lib/apis/ingredient/Ingredient.types";

interface IDeleteIngredientModalProps {
    ingredient: Ingredient | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function DeleteIngredientModal({ingredient, isOpen, onClose} : IDeleteIngredientModalProps) {
    const {setToast} = useToastify();

    return (
        <Modal isOpen={isOpen} onClose ={onClose}>
            <S.Wrapper>
                <S.Title>자재 삭제하기</S.Title>
                <Spacer width="100%" height="30px" />
                <p className="regular16">
                    {ingredient && `${ingredient.texture} - ${ingredient.thickness} 자재를 삭제하시겠습니까?`}
                </p>
                <Spacer width="100%" height="30px" />
                <div className="flex-row">
                <S.CancelButton className="bold16" onClick={onClose}>
                    취소
                </S.CancelButton>
                <Spacer width="10px" height="100%" />
                <S.SubmitButton className="bold16" onClick={() => {}}>
                    삭제하기
                </S.SubmitButton>
                </div>
            </S.Wrapper>
        </Modal>
    );
}