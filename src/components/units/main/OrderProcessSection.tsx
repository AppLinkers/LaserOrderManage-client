import { AppPages } from "@/src/lib/constants/appPages";
import { authState } from "@/src/store/auth";
import { media } from "@/src/styles/theme";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import orderProcess1 from "@/public/images/order_process1.webp";
import orderProcess2 from "@/public/images/order_process2.webp";
import orderProcess3 from "@/public/images/order_process3.webp";
import orderProcess4 from "@/public/images/order_process4.webp";
import { StaticImageData } from "next/image";
import ResponsiveImage from "../../commons/image/ResponsiveImage.index";

const OrderProcessSection = () => {
  const auth = useRecoilValue(authState);
  const router = useRouter();
  const path =
    auth.authorityList.includes("ROLE_CUSTOMER")
      ? AppPages.CUSTOMER_CREATE_ORDER
      : AppPages.LOGIN;
  return (
    <Wrapper>
      <InnerWrapper className="flex-column-center">
        <Title>온라인으로 거래를 요청하세요.</Title>
        <Announce>
          {"1분 거래 생성을 통해서 "}
          <Br />
          {"빠른 견적을 받아볼 수 있습니다."}
        </Announce>
        <Button className="bold18" onClick={() => router.push(path)}>
          견적 요청하기
        </Button>
        <ItemsWrapper>
          {ORDER_PROCESS_ITEMS.map((el) => (
            <OrderProcessItem key={el.id} data={el} />
          ))}
        </ItemsWrapper>
      </InnerWrapper>
    </Wrapper>
  );
};

type IOrderProcessItem = {
  id: number;
  title: string;
  content: string;
  image: StaticImageData;
};

const ORDER_PROCESS_ITEMS: IOrderProcessItem[] = [
  {
    id: 1,
    title: "거래 생성",
    content: "거래를 생성하기 위해서\n도면과 재질, 수량을 업로드 해주세요.",
    image: orderProcess1,
  },
  {
    id: 2,
    title: "견적",
    content: "담당자와의 실시간 채팅을 통해서\n빠른 견적을 받아보세요.",
    image: orderProcess2,
  },
  {
    id: 3,
    title: "발주",
    content: "검수조건과 견적내용을 기반으로\n발주서를 업로드 해주세요.",
    image: orderProcess3,
  },
  {
    id: 4,
    title: "제작",
    content: "최고 품질의 제품을\n신속하게 제작하여 제공해 드립니다.",
    image: orderProcess4,
  },
];

interface IOrderProcessItemProps {
  data: IOrderProcessItem;
}

const OrderProcessItem = ({ data }: IOrderProcessItemProps) => {
  return (
    <ItemWrapper>
      <ResponsiveImage
        src={data.image}
        alt={`order_process${data.id}`}
        Container={ItemImgContainer}
      />
      <ItemContentWrapper>
        <ItemTitle className="bold20">{data.title}</ItemTitle>
        <ItemContent className="regular16">{data.content}</ItemContent>
        <ItemNumber>{data.id}</ItemNumber>
      </ItemContentWrapper>
    </ItemWrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding-block: 100px;
  margin: 0 auto;
  background-color: #f9f9f9;
  ${media.mobile} {
    padding-inline: 24px;
  }
`;

const InnerWrapper = styled.div``;

const Br = styled.br`
  display: none;
  ${media.mobile} {
    display: block;
  }
`;

const Title = styled.h2`
  font-size: 32px;
  color: "#333";
  margin-bottom: 24px;
  text-align: center;
  ${media.mobile} {
    font-size: 24px;
    line-height: 28px;
  }
`;

const Announce = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: var(--color-normalGray);
  margin-bottom: 40px;
  text-align: center;
  ${media.mobile} {
    font-size: 16px;
    line-height: 24px;
  }
`;

const Button = styled.button`
  width: 162px;
  height: 54px;
  background-color: var(--color-primary);
  border-radius: var(--border-radius);
  color: var(--color-white);
  margin-bottom: 48px;
`;

const ItemsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  ${media.tablet} {
    align-content: flex-start;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const ItemWrapper = styled.div`
  width: 338px;
  height: 450px;
  flex-shrink: 0;
  border-radius: 8px;
  background-color: var(--color-white);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0px 24px 40px 0px rgba(0, 0, 0, 0.08);
  ${media.mobile} {
    width: 100%;
  }
  &:hover {
    transform: scale(1.03);
    box-shadow: 0px 30px 50px 0px rgba(0, 0, 0, 0.2);
  }
`;

const ItemImgContainer = styled.div`
  width: 100%;
  height: 240px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const ItemContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 56px;
  padding-inline: 32px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const ItemTitle = styled.h3`
  margin-bottom: 16px;
`;

const ItemContent = styled.p`
  line-height: 24px;
  white-space: pre-line;
  color: var(--color-normalGray);
`;

const ItemNumber = styled.p`
  position: absolute;
  bottom: 154px;
  right: -16px;
  font-size: 200px;
  font-weight: 700;
  line-height: 300px;
  color: rgba(0, 0, 0, 0.03);
`;

export default OrderProcessSection;
