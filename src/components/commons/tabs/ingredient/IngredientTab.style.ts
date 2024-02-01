import styled from "@emotion/styled";
import { ITabItemProps } from "../Tab.types";

export const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

export const TabItem = styled.a`
  margin-right: 48px;
  color: ${(props: ITabItemProps) =>
    props.isSelect ? "var(--color-black)" : "var(--color-mediumGray)"};

  &:last-child {
    margin: 0;
  }
`;
