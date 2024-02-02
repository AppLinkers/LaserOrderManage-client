import { getCost } from "@/src/lib/utils/utils";
import styled from "@emotion/styled"

interface IFactoryStockInfoProps {
    purchasePrice: number;
    sellPrice: number;
    count: number;
    weight: number;
}

export default function StockInfo({
    purchasePrice,
    sellPrice,
    count,
    weight
} : IFactoryStockInfoProps) {
    return (
        <Wrapper className="flex-row">
            <InfoWrapper>
                <InfoTitle className="bold16">평균 단가</InfoTitle>
                <InfoInnerWrapper className="flex-row">
                    <InfoLabel className="medium16">구매 단가</InfoLabel>
                    <InfoValue className="regular16">{`${getCost(purchasePrice)} / 1 t`}</InfoValue>
                </InfoInnerWrapper>
                <InfoInnerWrapper className="flex-row">
                    <InfoLabel className="medium16">판매 단가</InfoLabel>
                    <InfoValue className="regular16">{`${getCost(sellPrice)} / 1 t`}</InfoValue>
                </InfoInnerWrapper>
            </InfoWrapper>
            <InfoWrapper>
                <InfoTitle className="bold16">TOTAL 재고</InfoTitle>
                <InfoInnerWrapper className="flex-row">
                    <InfoLabel className="medium16">수량</InfoLabel>
                    <InfoValue className="regular16">{`${count.toLocaleString("ko-KR")} 개`}</InfoValue>
                </InfoInnerWrapper>
                <InfoInnerWrapper className="flex-row">
                    <InfoLabel className="medium16">무게</InfoLabel>
                    <InfoValue className="regular16">{`${weight.toLocaleString("ko-KR")} t`}</InfoValue>
                </InfoInnerWrapper>
            </InfoWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  width: 100%;
  padding: 24px 30px;
  border-bottom: 1px solid var(--color-mediumGray);  
`;

const InfoWrapper = styled.div`
    flex: 1;
`;

const InfoInnerWrapper = styled.div`
  padding: 16px 0;
`

const InfoTitle = styled.p`
    margin-bottom: 14px;
`;

const InfoLabel = styled.p``;

const InfoValue = styled.p`
    width: 240px;
    text-align: right;
`