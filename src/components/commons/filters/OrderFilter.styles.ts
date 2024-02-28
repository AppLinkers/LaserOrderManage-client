import styled from "@emotion/styled";
import { IFilterProps } from "./OrderFilter.types";

export const Wrapper = styled.div`
  width: 100%;
  padding: 24px 30px;
  border-top: 1px solid var(--color-mediumGray);
  border-bottom: 1px solid var(--color-mediumGray);
`;

export const HeaderWrapper = styled.div`
  margin-bottom: 14px;
`;

export const FilterWrapper = styled.div`
  width: 100%;
  padding: 16px 0;
`;

export const FilterLabel = styled.p`
  width: 110px;
`;

export const Filter = styled.a`
  margin-right: 30px;
  color: ${(props: IFilterProps) =>
    props.isSelect ? "var(--color-primary)" : "var(--color-mediumGray)"};

  &:last-of-type {
    margin: 0;
  }
`;

export const FilterSmall = styled.a`
  margin-right: 16px;
  color: ${(props: IFilterProps) =>
    props.isSelect ? "var(--color-primary)" : "var(--color-mediumGray)"};

  &:last-of-type {
    margin: 0;
  }
`;

export const DateInputWrapper = styled.div`
  margin-top: 10px;
`;

export const DateInputDivier = styled.p`
  color: var(--color-normalGray);
  margin-left: 6px;
  margin-right: 6px;
`;
