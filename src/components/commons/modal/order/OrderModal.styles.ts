import styled from "@emotion/styled";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalWrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: var(--color-white);
  border-radius: var(--border-radius);
  padding: 50px 40px 54px 40px;
`;

export const ModalHeader = styled.div`
  margin-bottom: 10px;
`;

export const ModalCloseIcon = styled.div`
  cursor: pointer;
`;

export const ModalProjectName = styled.p`
  color: var(--color-darkGray);
  margin-bottom: 21px;
`;

export const ModalContent = styled.div`
  width: 100%;
  height: 410px;
  padding: 30px;
  background-color: var(--color-lightGray);
`;