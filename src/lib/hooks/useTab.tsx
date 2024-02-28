import { OrderTab } from "@/src/components/commons/tabs/order/OrderTab.types";
import { IngredientTab } from "@/src/components/commons/tabs/ingredient/IngredientTab.types";
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

export const useIngredientTab = (
  defaultTab: IngredientTab,
) => {
  const [tab, setTab] = useState(defaultTab);

  const onTabClick = (tabItem: IngredientTab) => {
    if (tab !== tabItem) {
      setTab(tabItem);
    }
  };

  return [tab, onTabClick] as const;
};