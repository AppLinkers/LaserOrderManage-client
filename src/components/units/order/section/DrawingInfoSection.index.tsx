import Spacer from "@/src/components/commons/spacer/Spacer.index";
import * as S from "./OrderDetailSection.styles";
import EditIcon from "@/src/components/commons/icons/EditIcon.index";
import Image from "next/image";
import styled from "@emotion/styled";
import { useRef, useState, MouseEvent } from "react";
import { IDetailDrawing } from "@/src/lib/apis/order/detail/OrderDetail.types";
import {
  IDrawingInfoItemProps,
  IDrawingInfoSectionProps,
} from "./OrderDetailSection.types";
import EditDrawingModal from "@/src/components/commons/modal/detail/EditDrawingModal.index";
import AddDrawingModal from "@/src/components/commons/modal/detail/AddDrawingModal.index";
import { useToastify } from "@/src/lib/hooks/useToastify";
import { useMutation } from "@tanstack/react-query";
import { OrderDetailApi } from "@/src/lib/apis/order/detail/OrderDetailApi";
import ItemMenus, {
  ItemMenuTitle,
} from "@/src/components/commons/menu/item/ItemMenus.index";
import { BLUR_URL_1_1 } from "@/src/lib/constants/constant";

export default function DrawingInfoSection({
  sectionRef,
  data,
  authorityList,
  status,
  orderId,
}: IDrawingInfoSectionProps) {
  const [drawings, setDrawings] = useState<IDetailDrawing[]>(data);
  const [targetDrawing, setTargetDrawing] = useState<IDetailDrawing>();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const { setToast } = useToastify();

  const onEditDrawing = (drawing: IDetailDrawing) => {
    setTargetDrawing(drawing);
    setShowEditModal(true);
  };

  const editDrawingCallback = (newDrawing: IDetailDrawing) => {
    if (targetDrawing) {
      setDrawings(
        drawings.map((el) => (el.id === targetDrawing.id ? newDrawing : el)),
      );
    }
  };

  const addDrawingCallback = (newDrawing: IDetailDrawing) => {
    setDrawings([...drawings, newDrawing]);
  };

  const { mutate } = useMutation({
    mutationFn: OrderDetailApi.DELETE_ORDER_DRAWING,
    onError: () => {
      setToast({ comment: "도면 삭제를 실패했어요" });
    },
  });

  const onDeleteDrawing = (id: number) => {
    if (drawings.length === 1) {
      setToast({ comment: "도면은 모두 삭제할 수 없어요" });
      return;
    }
    mutate(
      { id: orderId, drawingId: id },
      {
        onSuccess: () => {
          const updatedDrawings = drawings.filter((el) => el.id !== id);
          setDrawings(updatedDrawings);
          setToast({ comment: "도면을 삭제했어요" });
        },
      },
    );
  };

  return (
    <>
      <S.Wrapper ref={sectionRef}>
        <S.TitleWrapper className="flex-row-between">
          <S.Title className="bold18">도면 정보</S.Title>
          {authorityList.includes("ROLE_CUSTOMER") &&
            !(status === "제작 완료" || status === "거래 완료") && (
              <S.EditBox
                className="flex-row"
                onClick={() => setShowAddModal(true)}
              >
                <EditIcon size={20} />
                <Spacer width="5px" height="100%" />
                <S.EditBoxText className="regular16">
                  도면 추가하기
                </S.EditBoxText>
              </S.EditBox>
            )}
        </S.TitleWrapper>
        <S.Section>
          <Spacer width="100%" height="10px" />
          {drawings.length === 0 ? (
            <EmptyDrawing className="regular16 flex-center">
              도면을 추가해주세요
            </EmptyDrawing>
          ) : (
            drawings.map((el) => (
              <DrawingInfoItem
                key={el.id}
                data={el}
                authorityList={authorityList}
                status={status}
                onEditDrawing={() => onEditDrawing(el)}
                onDeleteDrawing={() => onDeleteDrawing(el.id)}
              />
            ))
          )}

          <Spacer width="100%" height="10px" />
        </S.Section>
      </S.Wrapper>
      {targetDrawing !== undefined && (
        <EditDrawingModal
          data={targetDrawing}
          isOpen={showEditModal}
          orderId={orderId}
          callback={editDrawingCallback}
          onClose={() => setShowEditModal(false)}
        />
      )}
      <AddDrawingModal
        isOpen={showAddModal}
        orderId={orderId}
        callback={addDrawingCallback}
        onClose={() => setShowAddModal(false)}
      />
    </>
  );
}

function DrawingInfoItem({
  data,
  authorityList,
  status,
  onEditDrawing,
  onDeleteDrawing,
}: IDrawingInfoItemProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const onMenuOutside = (event: MouseEvent<HTMLElement>) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
  };

  const onEdit = () => {
    onEditDrawing();
    setShowMenu(false);
  };

  return (
    <ItemWrapper className="flex-row-between" onClick={onMenuOutside}>
      <ItemInfoWrapper className="flex-row">
        <Image
          src={data.thumbnailUrl}
          width={120}
          height={120}
          style={ItemImage}
          alt={data.thumbnailUrl}
          placeholder="blur"
          blurDataURL={BLUR_URL_1_1}
        />
        <ItemInfoTextWrapper>
          <p className="bold16">{data.fileName}</p>
          <Spacer width="100%" height="14px" />
          <div className="flex-row">
            <ItemLabel className="regular14">수량</ItemLabel>
            <p className="regular14">{`${data.count} 개`}</p>
          </div>
          <Spacer width="100%" height="12px" />
          <div className="flex-row">
            <ItemLabel className="regular14">재료</ItemLabel>
            <p className="regular14">{data.ingredient}</p>
          </div>
          <Spacer width="100%" height="12px" />
          <div className="flex-row">
            <ItemLabel className="regular14">두께</ItemLabel>
            <p className="regular14">{`${data.thickness} T`}</p>
          </div>
        </ItemInfoTextWrapper>
      </ItemInfoWrapper>
      <ItemMenus
        show={showMenu}
        menuRef={menuRef}
        toggleMenu={() => setShowMenu(!showMenu)}
      >
        <>
          <ItemMenuTitle
            className="regular14"
            href={data.fileUrl}
            download={data.fileName}
          >
            다운로드
          </ItemMenuTitle>
          {authorityList.includes("ROLE_CUSTOMER") &&
            !(status === "제작 완료" || status === "거래 완료") && (
              <>
                <ItemMenuTitle className="regular14" onClick={onEdit}>
                  수정하기
                </ItemMenuTitle>
                <ItemMenuTitle
                  className="regular14"
                  isAlert={true}
                  onClick={onDeleteDrawing}
                >
                  삭제하기
                </ItemMenuTitle>
              </>
            )}
        </>
      </ItemMenus>
    </ItemWrapper>
  );
}

const EmptyDrawing = styled.p`
  width: 100%;
  height: 160px;
`;

const ItemWrapper = styled.div`
  padding-block: 20px;
`;

const ItemInfoWrapper = styled.div``;

const ItemImage = {
  borderRadius: "10px",
  marginRight: "20px",
};

const ItemInfoTextWrapper = styled.div`
  padding-top: 8px;
`;

const ItemLabel = styled.p`
  width: 44px;
  color: var(--color-darkGray);
`;
