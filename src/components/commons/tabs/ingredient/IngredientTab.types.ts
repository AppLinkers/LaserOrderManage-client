export interface IIngredientTabProps {
    tabs: IngredientTab[];
    selectedTab: IngredientTab;
    onTabClick: (tab: IngredientTab) => void;
    refreshAnalysisData: () => void;
  }
  
  export type IngredientTab = "재고 현황" | "재고 분석";
  