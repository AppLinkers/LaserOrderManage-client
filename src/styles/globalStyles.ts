import { css } from "@emotion/react";
import { media } from "./theme";

export const globalStyles = css`
  :root {
    --color-primary: #ea5455;
    --color-white: #ffffff;
    --color-black: #000000;
    --color-grayBlack: #1d1d1d;

    --color-lightGray: #fafafa;
    --color-mediumGray: #e5e5e5;
    --color-normalGray: #999999;
    --color-darkGray: #545454;

    --color-blue: #1e56a0;

    --color-alert: #d72323;

    --border-radius: 10px;
  }

  &::-webkit-scrollbar {
    ${media.mobile} {
      display: none;
    }
  }

  * {
    margin: 0px;
    padding: 0px;
    outline: 0;
    border: 0;
    box-sizing: border-box;
    text-decoration: none;
    list-style: none;
  }

  /* 기본 요소 */
  html {
    scroll-behavior: smooth;
  }
  button {
    cursor: pointer;
  }
  a {
    color: var(--color-black);
    cursor: pointer;
  }
  p {
    color: var(--color-black);
  }

  /* font 요소 */
  .bold40 {
    font-size: 40px;
    font-weight: 700;
  }
  .bold32 {
    font-size: 32px;
    font-weight: 700;
  }
  .bold28 {
    font-size: 28px;
    font-weight: 700;
  }
  .bold24 {
    font-size: 24px;
    font-weight: 700;
  }
  .bold20 {
    font-size: 20px;
    font-weight: 700;
  }
  .bold18 {
    font-size: 18px;
    font-weight: 700;
  }
  .bold16 {
    font-size: 16px;
    font-weight: 700;
  }
  .bold14 {
    font-size: 14px;
    font-weight: 700;
  }
  .bold10 {
    font-size: 10px;
    font-weight: 700;
  }
  .medium24 {
    font-size: 24px;
    font-weight: 500;
  }
  .medium20 {
    font-size: 20px;
    font-weight: 500;
  }
  .medium18 {
    font-size: 18px;
    font-weight: 500;
  }
  .medium16 {
    font-size: 16px;
    font-weight: 500;
  }
  .medium14 {
    font-size: 14px;
    font-weight: 500;
  }
  .medium12 {
    font-size: 12px;
    font-weight: 500;
  }
  .regular16 {
    font-size: 16px;
    font-weight: 400;
  }
  .regular14 {
    font-size: 14px;
    font-weight: 400;
  }
  .regular12 {
    font-size: 12px;
    font-weight: 400;
  }
  .regular10 {
    font-size: 10px;
    font-weight: 400;
  }

  /* signatuer canvas */
  .signatureCanvas {
    width: 100%;
    height: 200px;
    margin-top: 14px;
    border: 1px solid var(--color-mediumGray);
    border-radius: var(--border-radius);
  }

  /* flex 요소 */
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .flex-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .flex-column-center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .flex-column-start {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  .flex-column-end {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
  }
  .flex-column-between {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .flex-row-align-center {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .flex-row-center {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .flex-row-end {
    display: flex;
    flex-direction: row;
    justify-content: end;
  }
  .flex-row-bottom {
    display: flex;
    flex-direction: row;
    align-items: end;
  }
  .flex-row-between {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .flex-row-between-center {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;
