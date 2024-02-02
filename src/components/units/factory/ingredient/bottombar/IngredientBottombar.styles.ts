import styled from "@emotion/styled";

interface IWrapperProps {
    show: boolean;
}

export const Wrapper = styled.div<IWrapperProps>`
  position: fixed;
  width: 1100px;
  height: 330px;
  left: 50%;
  transform: translateX(-50%);
  bottom: ${(props) => (props.show ? "0px" : "-330px")};
  border: 2px solid var(--color-mediumGray);
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  background-color: var(--color-white);
  transition: bottom ease 0.5s;
`;

export const Header = styled.div`
  width: 100%;
  padding: 18px 50px;
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  border-bottom: 1px solid var(--color-mediumGray);
`

export const DeleteBox = styled.div`
  cursor: pointer;
`

export const DeleteText = styled.p`
  color: var(--color-daryGray);
`

export const RefreshBox = styled.div`
  cursor: pointer;
`

export const RefreshText = styled.p`
  color: var(--color-daryGray);
`

export const Body = styled.div`
  width: 100%;
  padding: 14px 126px;
`

export const InfoWrapper = styled.div`
  flex: 1;
  padding: 0px 40px;
`

export const InfoSubWrapper = styled.div`
  flex: 1;
`

export const InfoTitle = styled.div`
  width: 100%;
  padding: 6px 0px;
  margin-right: 60px;
`

export const InfoInnerWrapper = styled.div`
  width: 100%;
`

export const FieldWrapper = styled.div`
  width: 100%;
  padding: 0px 0px 16px 0px;
`

export const FieldLabel = styled.div`
  width: 60px;
  margin-right: 40px;
  text-align: right;
`

export const FieldValue = styled.div`
  width: 120px;
  text-align: right;
`

export const FieldInnerWrapper = styled.div`
  width: 100px;
  height: 32px;
  padding: 0 12px;
`

export const FieldInnerValue = styled.div`
  width: 100%;
  text-align: right;
`

interface IInputWrapperProps {
  isFocus: boolean;
}

export const EditInputWrapper = styled.div<IInputWrapperProps>`
  width: 100px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid 
    ${(props) => props.isFocus ? "var(--color-black)" : "var(--color-mediumGray)"};
  border-radius: var(--border-radius);
`;

export const EditInputSizeWrapper = styled.div<IInputWrapperProps>`
  width: 45px;
  height: 32px;
  padding: 0 6px;
  border: 1px solid 
    ${(props) => props.isFocus ? "var(--color-black)" : "var(--color-mediumGray)"};
  border-radius: var(--border-radius);
`

export const EditInput = styled.input`
  width: 100%;
  text-align: right;
  ::placeholder {
    text-align: left;
    color: var(--color-normalGray);
  }
`

export const ButtonWrapper = styled.div`
  width: 330px;
  padding-bottom: 20px;
`;

export const CancelButton = styled.button`
  width: 120px;
  height: 50px;
  background-color: var(--color-lightGray);
  color: var(--color-darkGray);
  border-radius: var(--border-radius);
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: ${(props) =>
    props.disabled ? "var(--color-mediumGray)" : "var(--color-primary)"};
  color: var(--color-white);
  border-radius: var(--border-radius);
`;