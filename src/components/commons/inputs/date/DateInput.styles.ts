import styled from "@emotion/styled";
import { ICalenderProps } from "./DateInput.types";

export const Wrapper = styled.div`
  position: relative;
`;

export const InputWrapper = styled.div`
  width: 150px;
  height: 34px;
  padding-left: 11px;
  padding-right: 8px;
  border: 1px solid var(--color-mediumGray);
  border-radius: var(--border-radius);
  cursor: pointer;
`;

export const DateInput = styled.input`
  width: 100%;
  cursor: pointer;
  ::placeholder {
    color: var(--color-normalGray);
  }
`;

export const CalendarWrapper = styled.div`
  position: absolute;
  z-index: 10;
  top: 110%;
  left: 0;
  display: ${(props: ICalenderProps) => (props.isOpen ? "block" : "none")};
`;
