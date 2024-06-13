import { media } from "@/src/styles/theme";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  background-color: var(--color-lightGray);
  ${media.mobile} {
    background-color: var(--color-white);
    height: fit-content;
  }
`;

export const FormWrapper = styled.div`
  padding: 70px 57px 80px 57px;
  background-color: var(--color-white);
  border: 1px solid var(--color-mediumGray);
  border-radius: var(--border-radius);
  ${media.mobile} {
    width: 100%;
    padding-inline: 20px;
    padding-block: 60px 240px;
    border: 0;
  }
`;

export const Header = styled.div`
  margin-bottom: 40px;
`;

export const LoginInput = styled.input`
  width: 450px;
  height: 55px;
  padding: 0 25px;
  border: 1px solid var(--color-mediumGray);
  border-radius: var(--border-radius);
  color: var(--color-darkGray);
  margin-bottom: 15px;
  ${media.mobile} {
    width: 100%;
  }

  ::placeholder {
    color: var(--color-normalGray);
  }
  :focus {
    border: 1px solid var(--color-darkGray);
  }
`;

export const ErrorMessage = styled.p`
  width: 100%;
  height: 14px;
  color: var(--color-alert);
  margin-bottom: 15px;
  padding-left: 5px;
`;

export const LoginButton = styled.button`
  width: 450px;
  height: 55px;
  background-color: var(--color-primary);
  border-radius: var(--border-radius);
  color: var(--color-white);
  margin-bottom: 28px;
  ${media.mobile} {
    width: 100%;
  }
`;

export const SocialLoginButton = styled.button`
  width: 450px;
  height: 55px;
  background-color: var(--color-lightGray);
  border-radius: var(--border-radius);
  color: var(--color-darkGray);
  margin-bottom: 28px;
  ${media.mobile} {
    width: 100%;
  }
`;

export const MenuWrapper = styled.div`
  color: var(--color-darkGray);
  padding-right: 15px;
  margin-bottom: 42px;
`;

export const MenuDivider = styled.p`
  margin: 0 15px;
`;
