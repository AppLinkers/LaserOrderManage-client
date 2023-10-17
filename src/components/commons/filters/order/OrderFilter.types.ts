export interface IFilterProps {
  isSelect: boolean;
}

export interface IOrderFilterProps {
  filterMap: Map<string, string[]>;
  filterGroups: IFilterGroup[];
  onResetFilter: () => void;
  onFilterClick: (value: string) => void;
}

export interface IOrderFilterWithDateProps extends IOrderFilterProps {
  selectedDateFilter: IFilterItem | undefined;
  startDate: string;
  endDate: string;
  onDateFilter: (filterItem: IFilterItem) => void;
  onStartDate: (date: string) => void;
  onEndDate: (date: string) => void;
}

export interface IFilterItem {
  name: string;
  value: string;
  percentage?: string;
}

export interface IFilterGroup {
  title: string;
  filters: IFilterItem[];
}
