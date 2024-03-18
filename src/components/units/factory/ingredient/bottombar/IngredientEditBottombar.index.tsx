import { IIngredientInfoRequest, IIngredientStockRequest, Ingredient } from "@/src/lib/apis/ingredient/Ingredient.types";
import * as S from "./IngredientBottombar.styles"
import { IIngredientBottombarProps } from "./IngredientBottombar.types"
import TrashIcon from "@/src/components/commons/icons/TrashIcon.index";
import Spacer from "@/src/components/commons/spacer/Spacer.index";
import { useInputWithRegex } from "@/src/lib/hooks/useInput";
import { numberRegex } from "@/src/lib/constants/regex";
import { ChangeEvent, useEffect, useState, MouseEvent, useRef } from "react";
import { getNumberFromSplitNumber, getNumberSplitFromString } from "@/src/lib/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { IngredientApi } from "@/src/lib/apis/ingredient/IngredientApi";
import { useToastify } from "@/src/lib/hooks/useToastify";
import { UserAuthority } from "@/src/lib/apis/user/User.types";

interface IIngredientEditBottombarProps extends IIngredientBottombarProps {
    authorityList: UserAuthority[];
    ingredient: Ingredient;
    onClose: () => void;
    refetch: () => void;
    isNow: boolean;
    showDeleteIngredientModal: () => void;
}

export default function IngredientEditBottombar({show, authorityList, ingredient, onClose, refetch, isNow, showDeleteIngredientModal}: IIngredientEditBottombarProps) {
    const [previousDayStock, setPreviousDayStock] = useState("");
    const [incomingStock, onChangeIncomingStock, setIncomingStock] = useInputWithRegex(numberRegex, "");
    const [incomingStockFocus, setIncomingStockFocus] = useState(false);
    const [productionStock, setProductionStock] = useState("");
    const [currentDayStock, onChangeCurrentDayStock, setCurrentDayStock] = useInputWithRegex(numberRegex, "");
    const [currentDayStockFocus, setCurrentDayStockFocus] = useState(false);
    const [purchasePrice, onChangePurchasePrice, setPurchasePrice] = useInputWithRegex(numberRegex, "");
    const [purchasePriceFocus, setPurchasePriceFocus] = useState(false);
    const [sellPrice, onChangeSellPrice, setSellPrice] = useInputWithRegex(numberRegex, "");
    const [sellPriceFocus, setSellPriceFocus] = useState(false);
    const [optimalStock, onChangeOptimalStock, setOptimalStock] = useInputWithRegex(numberRegex, "");
    const [optimalStockFocus, setOptimalStockFocus] = useState(false);
    const submitAvailable = 
        incomingStock !== "" &&
        productionStock !== "" &&
        currentDayStock !== "" &&
        purchasePrice !== "" &&
        sellPrice !== "";
    const { setToast } = useToastify();

    useEffect(() => {
        refetch();
        setPreviousDayStock(String(ingredient?.stockCount.previousDay ?? 0));
        setIncomingStock(String(ingredient?.stockCount.incoming ?? ""));
        setProductionStock(String(ingredient?.stockCount.production ?? 0));
        setCurrentDayStock(String(ingredient?.stockCount.currentDay));
        setPurchasePrice(String(ingredient?.price.purchase));
        setSellPrice(String(ingredient?.price.sell));
        setOptimalStock(String(ingredient?.stockCount.optimal ?? ""));
    }, [ingredient])

    const customOnChangeIncomingStock = (event : ChangeEvent<HTMLInputElement>) => {
        event.target.value = getNumberFromSplitNumber(event.target.value);
        onChangeIncomingStock(event);
        if (!numberRegex.test(event.target.value)) {
            const newProductionStock = Number(previousDayStock) + Number(event.target.value) - Number(currentDayStock);
            if (newProductionStock < 0) {
                setCurrentDayStock(String(Number(currentDayStock) - Number(previousDayStock)));
                setProductionStock(String(0));
            } else {
                setProductionStock(String(newProductionStock));
            }
        }
    };

    const customOnChangeCurrentDayStock = (event : ChangeEvent<HTMLInputElement>) => {
        event.target.value = getNumberFromSplitNumber(event.target.value);
        onChangeCurrentDayStock(event);
        if (!numberRegex.test(event.target.value)) { 
            const newProductionStock = Number(previousDayStock) + Number(incomingStock) - Number(event.target.value);
            if (newProductionStock < 0) {
                setIncomingStock(String(Number(event.target.value) - Number(previousDayStock)));
                setProductionStock(String(0));
            } else {
                setProductionStock(String(newProductionStock));
            }
        }
    }

    const customOnChangePurchasePrice = (event : ChangeEvent<HTMLInputElement>) => {
        event.target.value = getNumberFromSplitNumber(event.target.value);
        onChangePurchasePrice(event);
    }

    const customOnChangeSellPrice = (event : ChangeEvent<HTMLInputElement>) => {
        event.target.value = getNumberFromSplitNumber(event.target.value);
        onChangeSellPrice(event);
    }

    const customOnChangeOptimalStock = (event : ChangeEvent<HTMLInputElement>) => {
        event.target.value = getNumberFromSplitNumber(event.target.value);
        onChangeOptimalStock(event);
    }

    const onRefresh = () => {
        setPreviousDayStock(String(ingredient?.stockCount.previousDay ?? 0));
        setIncomingStock(String(ingredient?.stockCount.incoming ?? ""));
        setProductionStock(String(ingredient?.stockCount.production ?? 0));
        setCurrentDayStock(String(ingredient?.stockCount.currentDay));
        setPurchasePrice(String(ingredient?.price.purchase));
        setSellPrice(String(ingredient?.price.sell));
        setOptimalStock(String(ingredient?.stockCount.optimal ?? ""));
    }

    const { mutate: editIngredientStockMutate } = useMutation({
        mutationFn: IngredientApi.EDIT_INGREDIENT_STOCK,
        onSuccess: () => {
            refetch();
            onClose();
            setToast({comment: "자재 재고를 수정했어요"});
        },
        onError: () => {
            refetch();
            setToast({comment: "자재 재고 수정에 실패했어요"});
        },
    });

    const { mutate: editIngredientInfoMutate } = useMutation({
        mutationFn: IngredientApi.EDIT_INGREDIENT_INFO,
        onSuccess: () => {
            refetch();
            onClose();
            setToast({comment: "자재 정보를 수정했어요"});
        },
        onError: () => {
            refetch();
            setToast({comment: "자재 정보 수정에 실패했어요"});
        },
    })

    const onSubmit = () => {
        const ingredientStockPayload: IIngredientStockRequest = {
            incoming: Number(incomingStock),
            production: Number(productionStock),
            currentDay: Number(currentDayStock),
        };
        editIngredientStockMutate({ id: ingredient.id, payload: ingredientStockPayload });

        if (authorityList.includes("AUTHORITY_ADMIN")) {
            const ingredientInfoPayload: IIngredientInfoRequest = {
                price: {
                    purchase: Number(purchasePrice),
                    sell: Number(sellPrice)
                },
                optimalStock: Number(optimalStock)
            }
            editIngredientInfoMutate({ id: ingredient.id, payload: ingredientInfoPayload });
        }
    }

    return (
        <S.Wrapper show={show}> 
            <S.Header className="flex-row-between">
                <p className="bold20">{`${ingredient?.texture} - ${Number.isInteger(ingredient?.thickness) ? ingredient?.thickness.toFixed(1) : ingredient?.thickness} T`}</p>
                {(authorityList.includes("AUTHORITY_ADMIN")) && (isNow && !ingredient?.isDeleted) && (
                    <>
                        <S.DeleteBox className="flex-row-align-center" onClick={showDeleteIngredientModal}>
                            <TrashIcon size={20} onClick={() => {}}/>
                            <Spacer width="4px" height="100%"/>
                            <S.DeleteText className="regular14">삭제하기</S.DeleteText>
                        </S.DeleteBox>
                    </>
                )}
            </S.Header>
            <S.Body>
                    <div className="flex-row">
                        <S.InfoWrapper className="flex-row">
                            <S.InfoTitle className="bold16">재고 관리</S.InfoTitle>
                            <S.InfoInnerWrapper>
                                <S.FieldWrapper className="flex-row-align-center">
                                    <S.FieldLabel className="medium16">전일 재고</S.FieldLabel>
                                    <S.FieldValue className="flex-row-between-center">
                                        <S.FieldInnerWrapper
                                            className="flex-row-between-center"
                                        >
                                            <S.FieldInnerValue className="regular14">{getNumberSplitFromString(previousDayStock)}</S.FieldInnerValue>
                                        </S.FieldInnerWrapper>
                                        개
                                    </S.FieldValue>
                                </S.FieldWrapper>
                                <S.FieldWrapper className="flex-row-align-center">
                                    <S.FieldLabel className="medium16">입고</S.FieldLabel>
                                    <S.FieldValue className="flex-row-between-center">
                                        {(isNow && !ingredient?.isDeleted) && (
                                            <>
                                                <S.EditInputWrapper
                                                    className="flex-row-between-center"
                                                    isFocus={incomingStockFocus}
                                                >
                                                    <S.EditInput
                                                        placeholder="수량 입력"
                                                        value={incomingStock === "" ? "" : getNumberSplitFromString(incomingStock)}
                                                        maxLength={8}
                                                        onChange={customOnChangeIncomingStock}
                                                        onFocus={() => setIncomingStockFocus(true)}
                                                        onBlur={() => setIncomingStockFocus(false)}
                                                    />
                                                </S.EditInputWrapper>
                                            </>
                                        )}
                                        {!(isNow && !ingredient?.isDeleted) && (
                                            <>
                                                <S.FieldInnerWrapper
                                                    className="flex-row-between-center"
                                                >
                                                    <S.FieldInnerValue className="regular14">{getNumberSplitFromString(incomingStock)}</S.FieldInnerValue>
                                                </S.FieldInnerWrapper>
                                            </>
                                        )}
                                        개
                                    </S.FieldValue>
                                </S.FieldWrapper>
                                <S.FieldWrapper className="flex-row-align-center">
                                    <S.FieldLabel className="medium16">생산</S.FieldLabel>
                                    <S.FieldValue className="flex-row-between-center">
                                        <S.FieldInnerWrapper
                                            className="flex-row-between-center"
                                        >
                                            <S.FieldInnerValue className="regular14">{getNumberSplitFromString(productionStock)}</S.FieldInnerValue>
                                        </S.FieldInnerWrapper>
                                        개
                                    </S.FieldValue>
                                </S.FieldWrapper>
                                <S.FieldWrapper className="flex-row-align-center">
                                    <S.FieldLabel className="medium16">당일 재고</S.FieldLabel>
                                    <S.FieldValue className="flex-row-between-center">
                                        {(isNow && !ingredient?.isDeleted) && (
                                            <>
                                                <S.EditInputWrapper
                                                    className="flex-row-between-center"
                                                    isFocus={currentDayStockFocus}
                                                >
                                                    <S.EditInput
                                                        placeholder="수량 입력"
                                                        value={currentDayStock === "" ? "" : getNumberSplitFromString(currentDayStock)}
                                                        maxLength={8}
                                                        onChange={customOnChangeCurrentDayStock}
                                                        onFocus={() => setCurrentDayStockFocus(true)}
                                                        onBlur={() => setCurrentDayStockFocus(false)}
                                                    />
                                                </S.EditInputWrapper>
                                            </>
                                        )}
                                        {!(isNow && !ingredient?.isDeleted) && (
                                            <>
                                                <S.FieldInnerWrapper
                                                    className="flex-row-between-center"
                                                >
                                                    <S.FieldInnerValue className="regular14">{getNumberSplitFromString(currentDayStock)}</S.FieldInnerValue>
                                                </S.FieldInnerWrapper>
                                            </>
                                        )}
                                        개
                                    </S.FieldValue>
                                </S.FieldWrapper>
                            </S.InfoInnerWrapper>
                        </S.InfoWrapper>
                        <S.InfoWrapper className="flex-column">
                            <S.InfoSubWrapper className="flex-row">
                                <S.InfoTitle className="bold16">단가 관리</S.InfoTitle>
                                <S.InfoInnerWrapper>
                                    <S.FieldWrapper className="flex-row-align-center">
                                        <S.FieldLabel className="medium16">구매 단가</S.FieldLabel>
                                        <S.FieldValue className="regular16 flex-row-between-center">
                                            {(authorityList.includes("AUTHORITY_ADMIN") && isNow && !ingredient?.isDeleted) && (
                                                <>
                                                    <S.EditInputWrapper
                                                        className="flex-row-between-center"
                                                        isFocus={purchasePriceFocus}
                                                    >
                                                        <S.EditInput
                                                            placeholder="금액 입력"
                                                            value={purchasePrice === "" ? "" : getNumberSplitFromString(purchasePrice)}
                                                            maxLength={8}
                                                            onChange={customOnChangePurchasePrice}
                                                            onFocus={() => setPurchasePriceFocus(true)}
                                                            onBlur={() => setPurchasePriceFocus(false)}
                                                        />
                                                    </S.EditInputWrapper>
                                                </>
                                            )}
                                            {!(authorityList.includes("AUTHORITY_ADMIN") && isNow && !ingredient?.isDeleted) && (
                                                <>
                                                    <S.FieldInnerWrapper
                                                        className="flex-row-between-center"
                                                    >
                                                        <S.FieldInnerValue className="regular14">{getNumberSplitFromString(purchasePrice)}</S.FieldInnerValue>
                                                    </S.FieldInnerWrapper>
                                                </>
                                            )}
                                            원
                                        </S.FieldValue>
                                    </S.FieldWrapper>
                                    <S.FieldWrapper className="flex-row-align-center">
                                        <S.FieldLabel className="medium16">판매 단가</S.FieldLabel>
                                        <S.FieldValue className="regular16 flex-row-between-center">
                                            {(authorityList.includes("AUTHORITY_ADMIN") && isNow && !ingredient?.isDeleted) && (
                                                <>
                                                    <S.EditInputWrapper
                                                        className="flex-row-between-center"
                                                        isFocus={sellPriceFocus}
                                                    >
                                                        <S.EditInput
                                                            placeholder="금액 입력"
                                                            value={sellPrice === "" ? "" : getNumberSplitFromString(sellPrice)}
                                                            maxLength={8}
                                                            onChange={customOnChangeSellPrice}
                                                            onFocus={() => setSellPriceFocus(true)}
                                                            onBlur={() => setSellPriceFocus(false)}
                                                        />
                                                    </S.EditInputWrapper>
                                                </>
                                            )}
                                            {!(authorityList.includes("AUTHORITY_ADMIN") && isNow && !ingredient?.isDeleted) && (
                                                <>
                                                    <S.FieldInnerWrapper
                                                        className="flex-row-between-center"
                                                    >
                                                        <S.FieldInnerValue className="regular14">{getNumberSplitFromString(sellPrice)}</S.FieldInnerValue>
                                                    </S.FieldInnerWrapper>
                                                </>
                                            )}
                                            원
                                        </S.FieldValue>
                                    </S.FieldWrapper>
                                </S.InfoInnerWrapper>
                            </S.InfoSubWrapper>
                            <S.InfoSubWrapper className="flex-row">
                                <S.InfoTitle className="bold16">재고 정보</S.InfoTitle>
                                <S.InfoInnerWrapper>
                                    <S.FieldWrapper className="flex-row-align-center">
                                        <S.FieldLabel className="medium16">적정 재고</S.FieldLabel>
                                        <S.FieldValue className="regular16 flex-row-between-center">
                                            {(authorityList.includes("AUTHORITY_ADMIN") && isNow && !ingredient?.isDeleted) && (
                                                <>
                                                    <S.EditInputWrapper
                                                        className="flex-row-between-center"
                                                        isFocus={optimalStockFocus}
                                                    >
                                                        <S.EditInput
                                                            placeholder="수량 입력"
                                                            value={optimalStock === "" ? "" : getNumberSplitFromString(optimalStock)}
                                                            maxLength={8}
                                                            onChange={customOnChangeOptimalStock}
                                                            onFocus={() => setOptimalStockFocus(true)}
                                                            onBlur={() => setOptimalStockFocus(false)}
                                                        />
                                                    </S.EditInputWrapper>
                                                </>
                                            )}
                                            {!(authorityList.includes("AUTHORITY_ADMIN") && isNow && !ingredient?.isDeleted) && (
                                                <>
                                                    <S.FieldInnerWrapper
                                                        className="flex-row-between-center"
                                                    >
                                                        <S.FieldInnerValue className="regular14">{getNumberSplitFromString(optimalStock)}</S.FieldInnerValue>
                                                    </S.FieldInnerWrapper>
                                                </>
                                            )}
                                            개
                                        </S.FieldValue>
                                    </S.FieldWrapper>
                                </S.InfoInnerWrapper>
                            </S.InfoSubWrapper>
                        </S.InfoWrapper>    
                    </div>
                    <div className="flex-row-end">
                        {(isNow && !ingredient?.isDeleted) && (
                            <>
                                <S.ButtonWrapper className="flex-row">
                                    <S.CancelButton className="bold14" onClick={() => {onClose(); onRefresh();}}>
                                        취소
                                    </S.CancelButton>
                                    <Spacer width="8px" height="100%" />
                                    <S.SubmitButton
                                        className="bold14"
                                        onClick={onSubmit}
                                        disabled={!submitAvailable}
                                    >
                                    저장하기
                                    </S.SubmitButton>
                                </S.ButtonWrapper>
                            </>
                        )}
                        {!(isNow && !ingredient?.isDeleted) && (
                            <>
                                <S.ButtonWrapper className="flex-row">
                                    <S.SubmitButton
                                        className="bold14"
                                        onClick={onClose}
                                    >
                                    닫기
                                    </S.SubmitButton>
                                </S.ButtonWrapper>
                            </>
                        )}
                    </div>
                </S.Body>
        </S.Wrapper>
    )
}