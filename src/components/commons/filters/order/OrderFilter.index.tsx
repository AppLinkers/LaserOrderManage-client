import * as S from "./OrderFilter.styles";
import { IOrderFilterProps } from "./OrderFilter.types";
import RedoIcon from "../../icons/RedoIcon.index";
import Spacer from "../../spacer/Spacer.index";

export default function OrderFilter(props: IOrderFilterProps) {
  return (
    <S.Wrapper>
      <S.HeaderWrapper className="flex-row-between">
        <p className="bold16">검색 필터</p>
        <a className="flex-row-center">
          <RedoIcon size={16} />
          <Spacer width="5px" height="100%" />
          <p className="medium16" onClick={() => props.onResetFilter()}>
            필터 초기화
          </p>
        </a>
      </S.HeaderWrapper>
      {props.filterGroups.map((el) => (
        <S.FilterWrapper className="flex-row" key={el.key}>
          <S.FilterLabel className="medium16">{el.title}</S.FilterLabel>
          {el.filters.map((filter) => (
            <S.Filter
              className="medium16"
              key={filter.value}
              isSelect={
                props.filterMap.get(el.key)?.includes(filter.value) ?? false
              }
              onClick={() => props.onFilterClick(el.key, filter.value)}
            >
              {filter.name}
            </S.Filter>
          ))}
        </S.FilterWrapper>
      ))}
    </S.Wrapper>
  );
}
