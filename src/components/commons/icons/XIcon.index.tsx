import { IIconProps } from "./Icon.types";

interface IXIconProps extends IIconProps {
  onClick: () => void;
}

export default function XIcon({ size, onClick }: IXIconProps) {
  return (
    <a onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        id="multiply"
      >
        <path
          fill="#000000"
          d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
        ></path>
      </svg>
    </a>
  );
}
