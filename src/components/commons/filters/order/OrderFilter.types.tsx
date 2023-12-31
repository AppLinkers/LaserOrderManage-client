import type { DateValue } from "@/src/lib/hooks/useDate";

export interface IFilterProps {
  isSelect: boolean;
}

export interface IOrderFilterProps {
  filterMap: Map<string, string[]>;
  filterGroups: IFilterGroup[];
  onResetFilter: () => void;
  onFilterClick: (key: string, value: string) => void;
}

export interface IOrderFilterWithDateProps extends IOrderFilterProps {
  dateFilter: IFilterItem | undefined;
  startDate: string;
  endDate: string;
  onDateFilter: (filterItem: IFilterItem) => void;
  onStartDate: (date: DateValue) => void;
  onEndDate: (date: DateValue) => void;
}

export interface IFilterItem {
  name: string;
  value: string;
  percentage?: string;
}

export interface IFilterGroup {
  title: string;
  key: string;
  filters: IFilterItem[];
}
