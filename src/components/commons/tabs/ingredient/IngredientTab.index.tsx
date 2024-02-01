import * as S from "./IngredientTab.style";
import { IIngredientTabProps } from "./IngredientTab.types";

export default function IngredientTab({
  tabs,
  selectedTab,
  onTabClick,
}: IIngredientTabProps) {
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
