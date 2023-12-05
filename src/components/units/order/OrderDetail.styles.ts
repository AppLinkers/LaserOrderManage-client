import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
`;

export const BodyWrapper = styled.div`
  flex-grow: 1;
  padding: 48px;
`;

export const BottomBarWrapper = styled.div`
  position: fixed;
  left: 48px;
  right: 388px;
  bottom: 0;
  height: 100px;
  border: 2px solid var(--color-mediumGray);
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  background-color: var(--color-white);
`;

export const MenuWrapper = styled.div`
  position: fixed;
  right: 0;
  width: 340px;
  height: 100vh;
  background-color: var(--color-primary);
`;
