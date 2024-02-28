import styled from "@emotion/styled";
import { media } from "@/src/styles/theme";

interface IHeaderProps {
  transparent: boolean;
}

export const Wrapper = styled.div<IHeaderProps>`
  position: relative;
  margin: 0 auto;
  height: 100px;
  z-index: 3;
  border-bottom: 1px solid var(--color-white);
  background-color: ${(props) =>
    props.transparent ? "transparent" : "var(--color-white)"};
  ${media.pc} {
    padding-inline: 240px;
  }
  ${media.tablet} {
    padding-inline: 80px;
  }
  ${media.mobile} {
    padding-inline: 24px;
  }
`;

export const PcMenu = styled.div`
  ${media.tablet} {
    display: none;
  }
  flex-shrink: 0;
`;

export const MenuWrapper = styled.div<IHeaderProps>`
  margin-right: 60px;
  gap: 60px;

  & > a {
    color: ${(props) =>
      props.transparent ? "var(--color-white)" : "var(--color-black)"};
  }
`;

export const MenuIconWrapper = styled.div`
  display: none;
  cursor: pointer;
  ${media.tablet} {
    display: block;
  }
`;

export const HeaderButton = styled.button`
  width: 120px;
  height: 50px;
  border-radius: var(--border-radius);
  background-color: var(--color-primary);
  color: var(--color-white);
`;
