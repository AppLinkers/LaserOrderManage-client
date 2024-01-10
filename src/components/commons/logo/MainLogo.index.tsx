import { AppPages } from "@/src/lib/constants/appPages";
import { media } from "@/src/styles/theme";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";

interface IMainLogoProps {
  isHome: boolean;
}

export default function MainLogo({ isHome }: IMainLogoProps) {
  return (
    <>
      <PcLogo>
        <Link href={AppPages.HOME}>
          <Image
            width={161}
            height={31}
            src={isHome ? "/images/mainLogoGray.png" : "/images/mainLogo.png"}
            alt="메인 로고"
            priority
          />
        </Link>
      </PcLogo>
      <MoblieLogo>
        <Link href={AppPages.HOME}>
          <Image
            width={107}
            height={20}
            src={isHome ? "/images/mainLogoGray.png" : "/images/mainLogo.png"}
            alt="메인 로고"
            priority
          />
        </Link>
      </MoblieLogo>
    </>
  );
}

const PcLogo = styled.div`
  ${media.mobile} {
    display: none;
  }
`;

const MoblieLogo = styled.div`
  display: none;
  ${media.mobile} {
    display: block;
  }
`;
