import { ChangeEvent, useState } from "react";
import { Manufacturing, OrderStage } from "../apis/order/Order.types";
import moment from "moment";
import { DateValue } from "./useDate";

export const useCustomerOrderFilter = () => {
  const [stageFilters, setStageFilters] = useState<OrderStage[]>([]);
  const [manuFilters, setManuFilters] = useState<Manufacturing[]>([]);

  const onStageFilter = (stage: OrderStage) => {
    setStageFilters((prev) => {
      if (prev.includes(stage)) {
        return prev.filter((el) => el !== stage);
      } else {
        return [...prev, stage];
      }
    });
  };

  const onManufacturingFilter = (manufactruing: Manufacturing) => {
    setManuFilters((prev) => {
      if (prev.includes(manufactruing)) {
        return prev.filter((el) => el !== manufactruing);
      } else {
        return [...prev, manufactruing];
      }
    });
  };

  const onResetFilter = () => {
    setStageFilters([]);
    setManuFilters([]);
  };

  return {
    stageFilters,
    manuFilters,
    onStageFilter,
    onManufacturingFilter,
    onResetFilter,
  } as const;
};

export const useFactoryOrderFilter = () => {
  const [orderType, setOrderType] = useState<boolean | null>(null);
  const [dateType, setDateType] = useState<string | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateFieldChanged, setDateFieldChanged] = useState(false);
  const [dateFieldFilled, setDateFieldFilled] = useState(0);

  const onOrderType = (type: boolean) => {
    if (type === orderType) {
      setOrderType(null);
    } else {
      setOrderType(type);
    }
  };

  const onDateType = (type: string) => {
    if (type === dateType) {
      setDateType(null);
      setDateFieldFilled((prev) => prev - 1);
    } else {
      setDateType(type);
      setDateFieldFilled((prev) => (prev === 3 ? 3 : prev + 1));
    }
    setDateFieldChanged(!dateFieldChanged);
  };

  const onStartDate = (selectedDate: DateValue) => {
    const date = moment(selectedDate?.toString()).format("YY. MM. DD");
    setStartDate(date);
    setDateFieldFilled((prev) => (prev === 3 ? 3 : prev + 1));
    setDateFieldChanged(!dateFieldChanged);
  };

  const onEndDate = (selectedDate: DateValue) => {
    const date = moment(selectedDate?.toString()).format("YY. MM. DD");
    setEndDate(date);
    setDateFieldFilled((prev) => (prev === 3 ? 3 : prev + 1));
    setDateFieldChanged(!dateFieldChanged);
  };

  const onResetFilter = () => {
    setOrderType(null);
    setDateType("");
    setStartDate("");
    setEndDate("");
    setDateFieldFilled(0);
  };

  return {
    orderType,
    dateType,
    startDate,
    endDate,
    dateFieldFilled,
    dateFieldChanged,
    onOrderType,
    onDateType,
    onStartDate,
    onEndDate,
    onResetFilter,
  } as const;
};

export const useFactoryNewOrderFilter = () => {
  const [quotationType, setQuotationType] = useState<boolean | null>(null);
  const [customerType, setCustomerType] = useState<boolean | null>(null);
  const [orderType, setOrderType] = useState<boolean | null>(null);

  const onQuotationType = (type: boolean) => {
    if (type === quotationType) {
      setQuotationType(null);
    } else {
      setQuotationType(type);
    }
  };

  const onCustomerType = (type: boolean) => {
    if (type === customerType) {
      setCustomerType(null);
    } else {
      setCustomerType(type);
    }
  };

  const onOrderType = (type: boolean) => {
    if (type === orderType) {
      setOrderType(null);
    } else {
      setOrderType(type);
    }
  };

  const onResetFilter = () => {
    setQuotationType(null);
    setCustomerType(null);
    setOrderType(null);
  };

  return {
    quotationType,
    customerType,
    orderType,
    onQuotationType,
    onCustomerType,
    onOrderType,
    onResetFilter,
  } as const;
};

export const useFactoryIngredientStockFilter = () => {
  const formattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const [date, setDate] = useState<string>(formattedDate());
  const [unitType, setUnitType] = useState("count");

  const onDate = (selectedDate: DateValue) => {
    const date = moment(selectedDate?.toString()).format("YY. MM. DD");
    setDate(date);
  };

  const onUnitType = (selectedUnit: string) => {
    setUnitType(selectedUnit);
  }

  return {
    date,
    unitType,
    onDate,
    onUnitType
  } as const;
}

export const useFactoryIngredientAnalysisFilter = () => {
  const [dataType, setDataType] = useState("");
  const [ingredientId, setIngredientId] = useState<number | string>("");
  const [dateType, setDateType] = useState("");
  const [startYear, setStartYear] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [unitType, setUnitType] = useState("");
  const [itemType, setItemType] = useState("");
  const [stockItemList, setStockItemList] = useState<string[]>([]);
  const [priceItemList, setPriceItemList] = useState<string[]>([]);

  const onDataType = (selectedData: string) => {
    setDataType(selectedData);
  }

  const onIngredient = (event: ChangeEvent<HTMLSelectElement>) => {
    setIngredientId(Number(event.target.value));
  }

  const onDateType = (selectedDateType : string) => {
    setDateType(selectedDateType);
  }

  const onStartYear = (selectedStartYear : string) => {
    setStartYear(selectedStartYear);
  }

  const onStartMonth = (selectedStartMonth : string) => {
    setStartMonth(selectedStartMonth);
  }

  const onEndYear = (selectedEndYear : string) => {
    setEndYear(selectedEndYear);
  }

  const onEndMonth = (selectedEndMonth : string) => {
    setEndMonth(selectedEndMonth);
  }

  const onUnitType = (selectedUnitType : string) => {
    setUnitType(selectedUnitType);
  }

  const onItemType = (selecetdItemType : string) => {
    if (itemType !== selecetdItemType) {
      setStockItemList([]);
      setPriceItemList([]);
      setItemType(selecetdItemType);
    }
  }

  const onStockItem = (selectedStockItem : string) => {
    if (!stockItemList.includes("all") && selectedStockItem === "all") {
      setStockItemList(["all"]);
      return
    }
    
    if (stockItemList.includes("all")) {
      if (selectedStockItem === "all") {
        setStockItemList([]);
      } else {
        setStockItemList([selectedStockItem])
      }
      return
    }

    setStockItemList((prev) => {
      if (prev.includes(selectedStockItem)) {
        return prev.filter((el) => el !== selectedStockItem);
      } else {
        return [...prev, selectedStockItem];
      }
    });
  }

  const onPriceItem = (selectedPriceItem : string) => {
    if (!priceItemList.includes("all") && selectedPriceItem === "all") {
      setPriceItemList(["all"]);
      return
    }
    
    if (priceItemList.includes("all")) {
      if (selectedPriceItem === "all") {
        setPriceItemList([]);
      } else {
        setPriceItemList([selectedPriceItem])
      }
      return
    }

    setPriceItemList((prev) => {
      if (prev.includes(selectedPriceItem)) {
        return prev.filter((el) => el !== selectedPriceItem);
      } else {
        return [...prev, selectedPriceItem];
      }
    });
  }

  return {
    dataType,
    ingredientId,
    dateType,
    startYear,
    startMonth,
    endYear,
    endMonth,
    unitType,
    itemType,
    stockItemList,
    priceItemList,
    onDataType,
    onIngredient,
    onDateType,
    onStartYear,
    onStartMonth,
    onEndYear,
    onEndMonth,
    onUnitType,
    onItemType,
    onStockItem,
    onPriceItem
   } as const
}