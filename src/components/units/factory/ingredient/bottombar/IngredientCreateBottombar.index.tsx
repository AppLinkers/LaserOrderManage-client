import { useInput, useInputWithRegex } from "@/src/lib/hooks/useInput";
import * as S from "./IngredientBottombar.styles"
import { IIngredientBottombarProps } from "./IngredientBottombar.types"
import { decimalNumberRegex, numberRegex } from "@/src/lib/constants/regex";
import { ChangeEvent, useState } from "react";
import { getNumberFromSplitNumber, getNumberSplitFromString } from "@/src/lib/utils/utils";
import Spacer from "@/src/components/commons/spacer/Spacer.index";
import RedoIcon from "@/src/components/commons/icons/RedoIcon.index";
import { IIngredientRequest } from "@/src/lib/apis/ingredient/Ingredient.types";
import { IngredientApi } from "@/src/lib/apis/ingredient/IngredientApi";
import { useMutation } from "@tanstack/react-query";
import { useToastify } from "@/src/lib/hooks/useToastify";

interface IIngredientCreateBottombarProps extends IIngredientBottombarProps {
    onClose: () => void;
    refetch: () => void;
}

export default function IngredientCreateBottombar({show, onClose, refetch}: IIngredientCreateBottombarProps) {
    const [texture, onChangeTexture, setTexture] = useInput("");
    const [textureFocus, setTextureFocus] = useState(false);
    const [thickness, onChangeThickness, setThickness] = useInputWithRegex(decimalNumberRegex, "");
    const [thicknessFocus, setThicknessFocus] = useState(false);
    const [width, onChangeWidth, setWidth] = useInputWithRegex(numberRegex, "");
    const [widthFocus, setWidthFocus] = useState(false);
    const [height, onChangeHeight, setHeight] = useInputWithRegex(numberRegex, "");
    const [heightFocus, setHeightFocus] = useState(false);
    const [weight, onChangeWeight, setWeight] = useInputWithRegex(decimalNumberRegex, "");
    const [weightFocus, setWeightFocus] = useState(false);
    const [purchasePrice, onChangePurchasePrice, setPurchasePrice] = useInputWithRegex(numberRegex, "");
    const [purchasePriceFocus, setPurchasePriceFocus] = useState(false);
    const [sellPrice, onChangeSellPrice, setSellPrice] = useInputWithRegex(numberRegex, "");
    const [sellPriceFocus, setSellPriceFocus] = useState(false);
    const [optimalStock, onChangeOptimalStock, setOptimalStock] = useInputWithRegex(numberRegex, "");
    const [optimalStockFocus, setOptimalStockFocus] = useState(false);
    const submitAvailable = 
        texture !== "" &&
        thickness !== "" &&
        width !== "" &&
        height !== "" &&
        weight !== "" &&
        purchasePrice !== "" &&
        sellPrice !== "";

    const { setToast } = useToastify();

    const customOnChangeThickness = (event : ChangeEvent<HTMLInputElement>) => {
        if (thickness.length === 0 && event.target.value === '.') {
            return;
        }
        if ((event.target.value.match(/\./g) || []).length > 1) {
            return;
        }
        onChangeThickness(event);
    }

    const customOnChangeWeight = (event : ChangeEvent<HTMLInputElement>) => {
        if (thickness.length === 0 && event.target.value === '.') {
            return;
        }
        if ((event.target.value.match(/\./g) || []).length > 1) {
            return;
        }
        onChangeWeight(event);
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
        setTexture("")
        setThickness("")
        setWidth("")
        setHeight("")
        setWeight("")
        setPurchasePrice("")
        setSellPrice("")
        setOptimalStock("")
    }

    const { mutate: postMutate } = useMutation({
        mutationFn: IngredientApi.POST_INGREDIENT,
        onSuccess: () => {
            refetch();
            onClose();
            setToast({ comment: "자재를 추가했어요" });
        },
        onError: () => {
            setToast({ comment: "자재 등록에 실패했어요" });
        },
    });

    const onSubmit = () => {
        const payload: IIngredientRequest = {
            texture: texture,
            thickness: Number(thickness),
            width: Number(width),
            height: Number(height),
            weight: Number(weight),
            price: {
                purchase: Number(purchasePrice),
                sell: Number(sellPrice)
            },
            optimalStock: Number(optimalStock)
        }

        postMutate(payload);
    }

    return (
        <S.Wrapper show={show}>
            <S.Header className="flex-row-between">
                <p className="bold20">자재 추가하기</p>
                <S.RefreshBox className="flex-row-align-center" onClick={onRefresh}>
                    <RedoIcon size={20} />
                    <Spacer width="4px" height="100%"/>
                    <S.RefreshText className="regular14">입력 초기화</S.RefreshText>
                </S.RefreshBox>
            </S.Header>
            <S.Body>
                <div className="flex-row">
                    <S.InfoWrapper className="flex-row">
                        <S.InfoTitle className="bold16">기본 정보</S.InfoTitle>
                        <S.InfoInnerWrapper>
                            <S.FieldWrapper className="flex-row-align-center">
                                <S.FieldLabel className="medium16">재질</S.FieldLabel>
                                <S.FieldValue className="flex-row-between-center">
                                    <S.EditInputWrapper
                                        className="flex-row-between-center"
                                        isFocus={textureFocus}
                                    >
                                        <S.EditInput
                                            placeholder="재질 입력"
                                            value={texture}
                                            maxLength={10}
                                            onChange={onChangeTexture}
                                            onFocus={() => setTextureFocus(true)}
                                            onBlur={() => setTextureFocus(false)}
                                        />
                                    </S.EditInputWrapper>
                                </S.FieldValue>
                            </S.FieldWrapper>
                            <S.FieldWrapper className="flex-row-align-center">
                                <S.FieldLabel className="medium16">두께</S.FieldLabel>
                                <S.FieldValue className="flex-row-between-center">
                                    <S.EditInputWrapper
                                        className="flex-row-between-center"
                                        isFocus={thicknessFocus}
                                    >
                                        <S.EditInput
                                            placeholder="두께 입력"
                                            value={thickness}
                                            maxLength={10}
                                            onChange={customOnChangeThickness}
                                            onFocus={() => setThicknessFocus(true)}
                                            onBlur={() => setThicknessFocus(false)}
                                        />
                                    </S.EditInputWrapper>
                                    T
                                </S.FieldValue>
                            </S.FieldWrapper>
                            <S.FieldWrapper className="flex-row-align-center">
                                <S.FieldLabel className="medium16">크기</S.FieldLabel>
                                <S.FieldValue className="flex-row-between-center">
                                    <S.EditInputSizeWrapper
                                        className="flex-row-between-center"
                                        isFocus={widthFocus}
                                    >
                                        <S.EditInput
                                            placeholder="가로"
                                            value={width}
                                            maxLength={3}
                                            onChange={onChangeWidth}
                                            onFocus={() => setWidthFocus(true)}
                                            onBlur={() => setWidthFocus(false)}
                                        />
                                    </S.EditInputSizeWrapper>
                                    x
                                    <S.EditInputSizeWrapper
                                        className="flex-row-between-center"
                                        isFocus={heightFocus}
                                    >
                                        <S.EditInput
                                            placeholder="세로"
                                            value={height}
                                            maxLength={3}
                                            onChange={onChangeHeight}
                                            onFocus={() => setHeightFocus(true)}
                                            onBlur={() => setHeightFocus(false)}
                                        />
                                    </S.EditInputSizeWrapper>
                                </S.FieldValue>
                            </S.FieldWrapper>
                            <S.FieldWrapper className="flex-row-align-center">
                            <S.FieldLabel className="medium16">무게</S.FieldLabel>
                                <S.FieldValue className="flex-row-between-center">
                                    <S.EditInputWrapper
                                        className="flex-row-between-center"
                                        isFocus={weightFocus}
                                    >
                                        <S.EditInput
                                            placeholder="무게 입력"
                                            value={weight}
                                            maxLength={10}
                                            onChange={customOnChangeWeight}
                                            onFocus={() => setWeightFocus(true)}
                                            onBlur={() => setWeightFocus(false)}
                                        />
                                    </S.EditInputWrapper>
                                    t
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
                                        원
                                    </S.FieldValue>
                                </S.FieldWrapper>
                                <S.FieldWrapper className="flex-row-align-center">
                                    <S.FieldLabel className="medium16">판매 단가</S.FieldLabel>
                                    <S.FieldValue className="regular16 flex-row-between-center">
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
                                        개
                                    </S.FieldValue>
                                </S.FieldWrapper>
                            </S.InfoInnerWrapper>
                        </S.InfoSubWrapper>
                    </S.InfoWrapper>    
                </div>
                <div className="flex-row-end">
                    <S.ButtonWrapper className="flex-row">
                        <S.CancelButton className="bold14" onClick={onClose}>
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
                </div>
            </S.Body>
        </S.Wrapper>
    )
}