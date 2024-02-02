import styled from "@emotion/styled";

export const Wrapper = styled.div`
    width: 100%;
    padding-block: 20px;
`
export const Header = styled.div``

export const CreateBox = styled.div`
  cursor: pointer;
`;

export const CreateBoxText = styled.p`
  color: var(--color-darkGray);
`;

export const Table = styled.table`
  margin-top: 11px;
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  border: 1px solid var(--color-mediumGray);
  & > tr {
    height: 50px;
  }
  & > tr > th {
    border-right: 1px solid var(--color-mediumGray);
    border-bottom: 1px solid var(--color-mediumGray);
    text-align: center;
    width: 10%;
  }
  
`;

export const TableBody = styled.tbody`
  & > tr {
    height: 50px;
  }
  & > tr > td {
    border: 1px solid var(--color-mediumGray);
    text-align: center;
    font-weight: 500;
  }
  cursor: pointer;
`;