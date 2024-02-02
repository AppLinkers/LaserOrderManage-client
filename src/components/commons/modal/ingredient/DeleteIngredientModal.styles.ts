import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 500px;
  padding: 25px;
  background-color: var(--color-white);
  border-radius: var(--border-radius);
`;

export const Title = styled.p``;

export const SubmitButton = styled.button`
  flex-grow: 1;
  height: 50px;
  color: var(--color-white);
  background-color: var(--color-primary);
  border-radius: var(--border-radius);

  &:disabled {
    background-color: var(--color-mediumGray);
  }
`;

export const CancelButton = styled.button`
  flex-grow: 1;
  height: 50px;
  color: var(--color-darkGray);
  background-color: var(--color-lightGray);
  border-radius: var(--border-radius);
`;
