import * as S from "./StockTab.style";
import { IStockTabProps } from "./StockTab.types";

export default function StockTab({
  tabs,
  selectedTab,
  onTabClick,
}: IStockTabProps) {
  return (
    <S.Wrapper className="flex-center">
      {tabs.map((el) => (
        <S.TabItem
          className="bold20"
          key={el}
          isSelect={el === selectedTab}
          onClick={() => onTabClick(el)}
        >
          {el}
        </S.TabItem>
      ))}
    </S.Wrapper>
  );
}
