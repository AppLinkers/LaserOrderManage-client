import { useToastify } from "@/src/lib/hooks/useToastify";
import * as S from "./DeleteIngredientModal.styles";
import Modal, { IModalProps } from "../Modal.index";
import Spacer from "../../spacer/Spacer.index";
import { Ingredient } from "@/src/lib/apis/ingredient/Ingredient.types";
import { useMutation } from "@tanstack/react-query";
import { IngredientApi } from "@/src/lib/apis/ingredient/IngredientApi";

interface IDeleteIngredientModalProps {
    ingredient: Ingredient;
    isOpen: boolean;
    onClose: () => void;
    refetch: () => void;
    closeEditBar: () => void;
}

export default function DeleteIngredientModal({ingredient, isOpen, onClose, refetch, closeEditBar} : IDeleteIngredientModalProps) {
    const {setToast} = useToastify();

    const { mutate: deleteMutate } = useMutation({
        mutationFn: IngredientApi.DELETE_INGREDIENT,
        onSuccess: () => {
            refetch();
            setToast({ comment: "자재를 삭제했어요" });
            onClose();
            closeEditBar();
        },
        onError: () => {
            setToast({ comment: "자재 삭제에 실패했어요" });
        }
    })

    const onDelete = () => {
        deleteMutate(ingredient.id);
    }

    return (
        <Modal isOpen={isOpen} onClose ={onClose}>
            <S.Wrapper>
                <S.Title>자재 삭제하기</S.Title>
                <Spacer width="100%" height="30px" />
                <p className="regular16">
                    {ingredient && `${ingredient.texture} - ${Number.isInteger(ingredient?.thickness) ? ingredient?.thickness.toFixed(1) : ingredient?.thickness} T 자재를 삭제하시겠습니까?`}
                </p>
                <Spacer width="100%" height="30px" />
                <div className="flex-row">
                <S.CancelButton className="bold16" onClick={onClose}>
                    취소
                </S.CancelButton>
                <Spacer width="10px" height="100%" />
                <S.SubmitButton className="bold16" onClick={onDelete}>
                    삭제하기
                </S.SubmitButton>
                </div>
            </S.Wrapper>
        </Modal>
    );
}