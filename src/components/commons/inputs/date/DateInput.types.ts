import { DateValue } from "@/src/lib/hooks/useDate";

export interface ICalenderProps {
  isOpen: boolean;
}

export interface IDateInputProps {
  date: string;
  setDate: (date: DateValue) => void;
}
