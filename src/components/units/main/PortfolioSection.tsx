import { media } from "@/src/styles/theme";
import styled from "@emotion/styled";
import { useState } from "react";
import manufacturingImg1 from "@/public/images/manufacturing1.webp";
import manufacturingImg2 from "@/public/images/manufacturing2.webp";
import manufacturingImg3 from "@/public/images/manufacturing3.webp";
import { StaticImageData } from "next/image";
import ResponsiveImage from "../../commons/image/ResponsiveImage.index";

const MANUFACTURING_ITEMS: IManufacturingItem[] = [
  {
    id: 1,
    title: "레이저 가공",
    content:
      "평판부터 3D 원형, 사각형 파이프 가공을\n대량의 MAZAK 레이저 기기를 통해 제공합니다.",
    image: manufacturingImg1,
  },
  {
    id: 2,
    title: "절곡",
    content:
      "AMADA와 TOYOKOKI의 하이엔드 절곡기 머신과\n업계 최고의 절곡 기술을 보유하고 있습니다.",
    image: manufacturingImg2,
  },
  {
    id: 3,
    title: "용접 및 후처리",
    content:
      "업계 최고의 용접기술과 로봇 용접기를 통해\n깔끔하고 세밀한 제품으로 제공해 드리고 있습니다.",
    image: manufacturingImg3,
  },
];

const PORTFOLIO_ITEMS: IPortfolioItem[] = [
  {
    title: "레이저",
    image: "/images/portfolio3.webp",
    contents: [
      { name: "보유", content: "12대" },
      { name: "SS가공", content: "20T" },
      { name: "STS가공", content: "16T" },
      { name: "작업반경", content: "1500 x 3000" },
    ],
  },
  {
    title: "파이프 레이저",
    image: "/images/portfolio2.webp",
    contents: [
      { name: "SS가공", content: "250T" },
      { name: "STS가공", content: "12T" },
      { name: "원형", content: "200Ø" },
      { name: "사각형", content: "150 x 150" },
    ],
  },
  {
    title: "절곡기",
    image: "/images/portfolio4.webp",
    contents: [
      { name: "보유", content: "4대" },
      { name: "SS가공", content: "250T" },
      { name: "STS가공", content: "12T" },
      { name: "작업반경", content: "3000" },
    ],
  },
  {
    title: "로봇 용접기",
    image: "/images/portfolio1.webp",
    contents: [],
    explain:
      "섬세하고 높은 퍼포먼스를 보여주는\n로봇 용접기와 금오만의 용접기술로\n최고의 제품을 제공해 드립니다.",
  },
];

const PortfolioSection = () => {
  return (
    <Wrapper>
      <ItemsWrapper>
        {MANUFACTURING_ITEMS.map((el) => (
          <ManufacuringItem key={el.id} data={el} />
        ))}
      </ItemsWrapper>
      <PortfolioItem />
    </Wrapper>
  );
};

const ManufacuringItem = ({ data }: IManufacturingItemProps) => {
  return (
    <ItemWrapper>
      <ResponsiveImage
        src={data.image}
        alt={`manufacturing${data.id}`}
        Container={ItemBackgoundContainer}
        position="absolute"
      />
      <ItemOverlay />
      <ItemContentWrapper>
        <ItemTitle>{data.title}</ItemTitle>
        <ItemContent>{data.content}</ItemContent>
      </ItemContentWrapper>
    </ItemWrapper>
  );
};

const PortfolioItem = () => {
  const [index, setIndex] = useState(0);

  const onPrev = () => {
    setIndex(
      (prev) => (prev - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length,
    );
  };

  const onNext = () => {
    setIndex((prev) => (prev + 1) % PORTFOLIO_ITEMS.length);
  };

  return (
    <PortfolioWrapper>
      <PortfolioInnerWrapper background="var(--color-black)">
        <PortfolioTitle key={`title-${index}`}>
          {PORTFOLIO_ITEMS[index].title}
        </PortfolioTitle>
        {PORTFOLIO_ITEMS[index].explain && (
          <PortfolioExplain key={`explain-${index}`}>
            {PORTFOLIO_ITEMS[index].explain}
          </PortfolioExplain>
        )}
        <PortfolioContentsWrapper
          key={`contents-${index}`}
          className="flex-row"
        >
          {PORTFOLIO_ITEMS[index].contents.map((el) => (
            <PortfolioContentItem key={el.name} data={el} />
          ))}
        </PortfolioContentsWrapper>
        <PortfolioButtonsWrapper>
          <PortfolioButton
            src="/images/arrow_left.webp"
            alt="arrow_left"
            onClick={onPrev}
          />
          <PortfolioButton
            src="/images/arrow_right.webp"
            alt="arrow_right"
            onClick={onNext}
          />
        </PortfolioButtonsWrapper>
      </PortfolioInnerWrapper>
      <PortfolioInnerWrapper background="#f9f9f9">
        <PortfolioImg
          key={`img-${index}`}
          src={PORTFOLIO_ITEMS[index].image}
          alt={`portfolio-${index}`}
        />
      </PortfolioInnerWrapper>
    </PortfolioWrapper>
  );
};

const PortfolioContentItem = ({ data }: IPortfolioContentItemProps) => {
  return (
    <ContentItemWrapper>
      <ContentItemName>{data.name}</ContentItemName>
      <ContentItemContent>{data.content}</ContentItemContent>
    </ContentItemWrapper>
  );
};

type IManufacturingItem = {
  id: number;
  title: string;
  content: string;
  image: StaticImageData;
};

interface IManufacturingItemProps {
  data: IManufacturingItem;
}

type IPortfolioItem = {
  title: string;
  image: string;
  contents: IPortfolioContent[];
  explain?: string;
};

type IPortfolioContent = {
  name: string;
  content: string;
};

interface IPortfolioContentItemProps {
  data: IPortfolioContent;
}

const Wrapper = styled.section`
  width: 100%;
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${media.mobile} {
    flex-direction: column;
  }
`;

const ItemWrapper = styled.div`
  flex: 1;
  height: 800px;
  position: relative;
  ${media.mobile} {
    height: 330px;
  }
`;

const ItemBackgoundContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ItemOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const ItemContentWrapper = styled.div`
  position: relative;
  z-index: 3;
  margin: 0 auto;
  padding-block: 342px;
  ${media.tablet} {
    padding-inline: 20px;
  }
  ${media.mobile} {
    padding-block: 114px;
  }
`;

const ItemTitle = styled.h5`
  font-size: 36px;
  line-height: 36px;
  margin-bottom: 24px;
  text-align: center;
  color: var(--color-white);
  ${media.mobile} {
    font-size: 24px;
    line-height: 28px;
  }
`;

const ItemContent = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  text-align: center;
  white-space: pre-line;
  color: rgba(255, 255, 255, 0.7);
  ${media.tablet} {
    font-size: 18px;
    line-height: 26px;
  }
  ${media.mobile} {
    font-size: 16px;
    line-height: 24px;
  }
`;

const PortfolioWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  ${media.tablet} {
    flex-direction: column-reverse;
  }
`;

interface IContentWrapperProps {
  background: string;
}

const PortfolioInnerWrapper = styled.div<IContentWrapperProps>`
  position: relative;
  flex: 1;
  height: 750px;
  padding-block: 110px 240px;
  padding-inline: 40px;
  background-color: ${(props) => props.background};
  ${media.tablet} {
    flex: none;
    width: 100%;
    padding-bottom: 200px;
  }
  ${media.mobile} {
    height: 550px;
    padding-top: 80px;
    padding-bottom: 180px;
  }
`;

const PortfolioTitle = styled.h3`
  font-size: 40px;
  line-height: 24px;
  color: var(--color-white);
  ${media.mobile} {
    font-size: 32px;
    line-height: 28px;
  }
`;

const PortfolioExplain = styled.p`
  font-size: 24px;
  line-height: 60px;
  margin-top: 120px;
  white-space: pre-line;
  color: rgba(255, 255, 255, 0.7);
  ${media.tablet} {
    font-size: 32px;
  }
  ${media.mobile} {
    font-size: 20px;
    margin-top: 100px;
  }
`;

const PortfolioButtonsWrapper = styled.div`
  position: absolute;
  display: inline-flex;
  align-items: flex-start;
  gap: 64px;
  bottom: 48px;
  right: 60px;
  ${media.tablet} {
    top: 80px;
    right: 80px;
    bottom: auto;
  }
  ${media.mobile} {
    top: 64px;
    right: 24px;
    gap: 48px;
  }
`;

const PortfolioButton = styled.img`
  width: 72px;
  height: 72px;
  transition: transform 0.3s ease;
  cursor: pointer;
  ${media.mobile} {
    width: 48px;
    height: 48px;
  }
  &:hover {
    transform: scale(1.03);
  }
`;

const PortfolioImg = styled.img`
  position: absolute;
  width: 100%;
  height: fit-content;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PortfolioContentsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  margin-top: 100px;
  ${media.tablet} {
    margin-top: 120px;
  }
  ${media.mobile} {
    margin-top: 90px;
  }
`;

const ContentItemWrapper = styled.div`
  flex-basis: 50%;
`;

const ContentItemName = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  ${media.mobile} {
    font-size: 16px;
  }
`;

const ContentItemContent = styled.p`
  font-size: 36px;
  line-height: 48px;
  font-weight: 700;
  margin-top: 40px;
  width: fit-content;
  text-align: center;
  white-space: pre-line;
  color: var(--color-white);
  ${media.tablet} {
    font-size: 60px;
    line-height: 90px;
  }
  ${media.mobile} {
    font-size: 24px;
    line-height: 36px;
    margin-top: 20px;
  }
`;

export default PortfolioSection;
