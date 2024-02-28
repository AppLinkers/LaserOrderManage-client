import * as S from "./IngredientTab.style";
import { IIngredientTabProps } from "./IngredientTab.types";

export default function IngredientTab({
  tabs,
  selectedTab,
  onTabClick,
  refreshAnalysisData
}: IIngredientTabProps) {
  return (
    <S.Wrapper className="flex-center">
      {tabs.map((el) => (
        <S.TabItem
          className="bold20"
          key={el}
          isSelect={el === selectedTab}
          onClick={
            () => {
              onTabClick(el);
              if (el === "재고 현황") {
                refreshAnalysisData();
              }
            }
          }
        >
          {el}
        </S.TabItem>
      ))}
    </S.Wrapper>
  );
}
