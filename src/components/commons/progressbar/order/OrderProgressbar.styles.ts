import styled from "@emotion/styled";
import { IProgressProps, IActiveBarProps } from "./OrderProgressbar.types";

export const Wrapper = styled.div`
  width: 100%;
`;

export const LabelWrapper = styled.div`
  width: 100%;
  margin-bottom: 4px;
`;

export const Label = styled.p`
  color: ${(props: IProgressProps) =>
    props.isActive ? "var(--color-primary)" : "var(--color-normalGray)"};
  width: 100px;
  text-align: center;

  &:first-of-type {
    text-align: start;
  }
  &:nth-of-type(2) {
    padding-right: 40px;
  }
  &:nth-of-type(4) {
    padding-left: 40px;
  }
  &:last-of-type {
    text-align: end;
  }
`;

export const BarWrapper = styled.div`
  width: 100%;
  height: 22px;
  position: relative;
`;

export const Bar = styled.div`
  width: 100%;
  height: 16px;
  position: absolute;
  background-color: var(--color-mediumGray);
  border-radius: 8px;
`;

export const ActiveBar = styled.div`
  width: ${(props: IActiveBarProps) => `${props.percentage}%`};
  height: 16px;
  position: absolute;
  background-color: var(--color-primary);
  border-radius: ${(props: IActiveBarProps) =>
    props.percentage === 100 ? "8px" : "8px 0 0 8px"};
`;

export const CircleWrapper = styled.div`
  width: 100%;
  position: absolute;
`;

export const Circle = styled.div`
  width: ${(props: IProgressProps) => (props.isActive ? "22px" : "16px")};
  height: ${(props: IProgressProps) => (props.isActive ? "22px" : "16px")};
  border-radius: 16px;
  background-color: var(--color-white);
  border: 1px solid
    ${(props: IProgressProps) =>
      props.isActive ? "var(--color-primary)" : "var(--color-mediumGray)"};
`;
