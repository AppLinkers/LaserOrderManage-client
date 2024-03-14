import Spacer from "@/src/components/commons/spacer/Spacer.index";
import * as S from "./OrderDetailSection.styles";
import EditIcon from "@/src/components/commons/icons/EditIcon.index";
import { IDeliveryInfoSectionProps } from "./OrderDetailSection.types";
import { getPhoneNumber } from "@/src/lib/utils/utils";
import { useState } from "react";
import AddressModal from "@/src/components/commons/modal/detail/AddressModal.index";
import { IDeliveryAddress } from "@/src/lib/apis/user/customer/Customer.types";

export default function DeliveryInfoSection({
  data,
  authorityList,
  status,
  orderId,
}: IDeliveryInfoSectionProps) {
  const [address, setAddress] = useState<IDeliveryAddress>(data);
  const [showModal, setShowModal] = useState(false);

  const editAddressCallback = (newAddress: IDeliveryAddress) => {
    setAddress(newAddress);
  };

  return (
    <>
      <S.Wrapper>
        <S.TitleWrapper className="flex-row-between">
          <S.Title className="bold18">배송 정보</S.Title>
          {authorityList.includes("ROLE_CUSTOMER") &&
            !(status === "제작 완료" || status === "거래 완료") && (
              <S.EditBox
                className="flex-row"
                onClick={() => setShowModal(true)}
              >
                <EditIcon size={20} />
                <Spacer width="5px" height="100%" />
                <S.EditBoxText className="regular16">
                  배송지 수정하기
                </S.EditBoxText>
              </S.EditBox>
            )}
        </S.TitleWrapper>
        <S.Section>
          <Spacer width="100%" height="20px" />
          <S.InfoWrapper className="flex-row">
            <S.Label className="regular16">배송지명</S.Label>
            <S.Content className="regular16">{address.name}</S.Content>
          </S.InfoWrapper>
          <S.InfoWrapper className="flex-row">
            <S.Label className="regular16">수령인</S.Label>
            <S.Content className="regular16">{address.receiver}</S.Content>
          </S.InfoWrapper>
          <S.InfoWrapper className="flex-row">
            <S.Label className="regular16">우편번호</S.Label>
            <S.Content className="regular16">{address.zipCode}</S.Content>
          </S.InfoWrapper>
          <S.InfoWrapper className="flex-row">
            <S.Label className="regular16">주소</S.Label>
            <S.Content className="regular16">{address.address}</S.Content>
          </S.InfoWrapper>
          <S.InfoWrapper className="flex-row">
            <S.Label className="regular16">상세 주소</S.Label>
            <S.Content className="regular16">
              {address.detailAddress ? address.detailAddress : "-"}
            </S.Content>
          </S.InfoWrapper>
          <S.InfoWrapper className="flex-row">
            <S.Label className="regular16">연락처1</S.Label>
            <S.Content className="regular16">
              {getPhoneNumber(address.phone1)}
            </S.Content>
          </S.InfoWrapper>
          <S.InfoWrapper className="flex-row">
            <S.Label className="regular16">연락처2</S.Label>
            <S.Content className="regular16">
              {address.phone2 ? getPhoneNumber(address.phone2) : "-"}
            </S.Content>
          </S.InfoWrapper>
          <Spacer width="100%" height="20px" />
        </S.Section>
      </S.Wrapper>
      <AddressModal
        isOpen={showModal}
        data={address}
        orderId={orderId}
        onClose={() => setShowModal(false)}
        callback={editAddressCallback}
      />
    </>
  );
}
