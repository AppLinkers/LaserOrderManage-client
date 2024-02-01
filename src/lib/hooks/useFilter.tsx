import { useState } from "react";
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
  const [unit, setUnit] = useState("count");

  const onDate = (selectedDate: DateValue) => {
    const date = moment(selectedDate?.toString()).format("YY. MM. DD");
    setDate(date);
  };

  const onUnit = (selectedUnit: string) => {
    setUnit(selectedUnit);
  }

  return {
    date,
    unit,
    onDate,
    onUnit
  } as const;
}
