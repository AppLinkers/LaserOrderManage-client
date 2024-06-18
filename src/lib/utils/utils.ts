import {
  Manufacturing,
  ManufacturingName,
  OrderStage,
  OrderStatus,
  PostProcessing,
  PostProcessingName,
} from "../apis/order/Order.types";
import { SignupMethod, SignupMethodName } from "../apis/user/User.types";

export const getNowDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const getDate = (value: any) => {
  const date = new Date(value);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd}`;
};

export const getDateTime = (value: any) => {
  const now = new Date();
  const date = new Date(value);

  if (now.getFullYear() !== date.getFullYear()) {
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  }

  const dayDiff = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );
  const hourDiff = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60),
  );

  if (dayDiff === 0) return hourDiff <= 1 ? "방금" : `${hourDiff}시간 전`;
  if (dayDiff === 1) return "어제";
  if (dayDiff > 7) return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  return `${dayDiff}일 전`;
};

export const getMonthList = (startDate: string, endDate: string) => {
  const startYear = parseInt(startDate.split("-")[0]);
  const startMonth = parseInt(startDate.split("-")[1]);
  const endYear = parseInt(endDate.split("-")[0]);
  const endMonth = parseInt(endDate.split("-")[1]);

  const monthList = [];

  for (let year = startYear; year <= endYear; year++) {
    let monthStart = year === startYear ? startMonth : 1;
    let monthEnd = year === endYear ? endMonth : 12;

    for (let month = monthStart; month <= monthEnd; month++) {
      monthList.push(`${year}년 ${month}월`);
    }
  }

  return monthList;
}

export const getYearList = (startDate: string, endDate: string) => {
  const startYear = parseInt(startDate.split("-")[0]);
  const endYear = parseInt(endDate.split("-")[0]);

  const yearList = [];

  for (let year = startYear; year <= endYear; year++) {
    yearList.push(`${year}년`);
  }

  return yearList;
}

export const getParamDate = (value: string): string => {
  if (value === "") {
    return "";
  }
  const [yy, mm, dd] = value.split(".").map((part) => part.trim());
  return `20${yy}-${mm}-${dd}`;
};

export const getCost = (value: number) => {
  const cost = value.toLocaleString("ko-KR");
  return `${cost}원`;
};

export const getNumberSplitFromString = (value: string) => {
  return `${Number(value).toLocaleString("ko-KR")}`;
}

export const getNumberSplitFromNumber = (value: number) => {
  return `${value.toLocaleString("ko-KR")}`;
}

export const getNumberFromSplitNumber = (value: string) => {
  return value.replace(/,/g, '');
}

export const getCustomerInfo = (
  name: string | null,
  company: string | null,
  isNew?: boolean | undefined,
): string => {
  if (name === null) {
    return "회원탈퇴 고객";
  }
  const infos: string[] = [];
  infos.push(name);
  if (company) {
    infos.push(company);
  }
  if (isNew !== undefined) {
    if (isNew) {
      infos.push("신규 고객");
    } else {
      infos.push("기존 고객");
    }
  }
  return infos.join(" · ");
};

export const getAddress = (
  address: string,
  detailAddress: string | null,
): string => {
  if (detailAddress) {
    return `(${address}, ${detailAddress})`;
  }
  return `(${address})`;
};

export const getFullAddress = (
  zoneCode: string,
  address: string,
  detailAddress: string | null,
): string => {
  if (detailAddress && detailAddress !== "") {
    return `[${zoneCode}] ${address}, ${detailAddress}`;
  }
  return `[${zoneCode}] ${address}`;
};

export const getPhoneNumber = (phone: string): string => {
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};

export const formattedPhoneNumber = (phone: string): string => {
  return phone.replace('+82 10', '010').replace(/-/g, '').replace(/\s+/g, '');
}

export const getFileSize = (fileSize: number): string => {
  if (fileSize < 1024) {
    return `${fileSize.toFixed(2)} B`;
  } else if (fileSize < 1024 * 1024) {
    return `${(fileSize / 1024).toFixed(2)} KB`;
  } else return `${(fileSize / (1024 * 1024)).toFixed(2)} MB`;
};

const OrderStageMap = new Map<OrderStage, OrderStatus>([
  ["new", "견적 대기"],
  ["quote-approval", "견적 승인"],
  ["in-production", "제작 중"],
  ["production-completed", "제작 완료"],
  ["completed", "거래 완료"],
]);

const ManufacturingMap = new Map<Manufacturing, ManufacturingName>([
  ["laser-cutting", "레이저 가공"],
  ["bending", "절곡"],
  ["welding", "용접"],
]);

const PostprocessingMap = new Map<PostProcessing, PostProcessingName>([
  ["painting", "도색"],
  ["plating", "도금"],
]);

const SignupMethodMap = new Map<SignupMethod, SignupMethodName>([
  ["BASIC", ""],
  ["OAUTH_KAKAO", "(카카오)"],
]);

export const getOrderStatus = (key: OrderStage) => OrderStageMap.get(key);

export const getManufacuring = (key: Manufacturing) =>
  ManufacturingMap.get(key)!!;

const getPostprocessing = (key: PostProcessing) => PostprocessingMap.get(key)!!;

export const getSignupMethod = (key: SignupMethod) => SignupMethodMap.get(key)!!;

export const getManufacurings = (keys: Manufacturing[]) => {
  const manufacturings: string[] = [];
  keys.forEach((key) => manufacturings.push(getManufacuring(key)));
  return manufacturings.join(", ");
};

export const getPostprocessings = (keys: PostProcessing[]) => {
  const postProcessings: string[] = [];
  keys.forEach((key) => postProcessings.push(getPostprocessing(key)));
  return postProcessings.join(", ");
};
