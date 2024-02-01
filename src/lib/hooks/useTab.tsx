import { OrderTab } from "@/src/components/commons/tabs/order/OrderTab.types";
import { StockTab } from "@/src/components/commons/tabs/stock/StockTab.types";
import { useState } from "react";

export const useOrderTab = (
  defaultTab: OrderTab,
  onResetFilter: () => void,
) => {
  const [tab, setTab] = useState(defaultTab);

  const onTabClick = (tabItem: OrderTab) => {
    if (tab !== tabItem) {
      setTab(tabItem);
      onResetFilter();
    }
  };

  return [tab, onTabClick] as const;
};

export const useStockTab = (
  defaultTab: StockTab,
) => {
  const [tab, setTab] = useState(defaultTab);

  const onTabClick = (tabItem: StockTab) => {
    if (tab !== tabItem) {
      setTab(tabItem);
    }
  };

  return [tab, onTabClick] as const;
};