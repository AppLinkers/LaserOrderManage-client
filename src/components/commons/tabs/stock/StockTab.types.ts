export interface IStockTabProps {
    tabs: StockTab[];
    selectedTab: StockTab;
    onTabClick: (tab: StockTab) => void;
  }
  
  export type StockTab = "재고 현황" | "재고 분석";
  