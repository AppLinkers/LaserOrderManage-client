export const AVAILABLE_FILE_TYPE = [
  ".dwg",
  ".dxf",
  ".pdf",
  ".png",
  ".jpg",
  ".jpeg",
];

export const AVAILABLE_ORDER_FILE_TYPE = [
  ".pdf",
  ".hwp",
  ".cell",
  ".docx",
  ".doc",
  ".xlsx",
  ".xls",
  ".jpg",
  ".jpeg",
  ".png",
];

interface IIngredient {
  key: string;
}

export const INGREDIENTS: IIngredient[] = [
  { key: "2HL" },
  { key: "HL" },
  { key: "2PL" },
  { key: "PL" },
  { key: "430" },
  { key: "AC" },
  { key: "AL" },
  { key: "ALCK" },
  { key: "AR" },
  { key: "ATOS" },
  { key: "CK" },
  { key: "CR" },
  { key: "CU" },
  { key: "EGI" },
  { key: "GI" },
  { key: "HGI" },
  { key: "MS" },
  { key: "MS-N" },
  { key: "PO" },
  { key: "S45" },
  { key: "SM490" },
  { key: "SPCC" },
  { key: "SS" },
  { key: "SS400" },
  { key: "SS41" },
  { key: "STS" },
  { key: "SUS" },
  { key: "SUSCK" },
  { key: "TI" },
];

export const GRAPH_COLORS = [
  "rgb(211, 211, 211)",
  "rgb(75, 181, 67)",
  "rgb(33, 150, 243)",
  "rgb(255, 193, 7)",
];

export const GRAPH_BACKGROUND_COLORS = [
  "rgb(211, 211, 211, 0.5)",
  "rgb(75, 181, 67, 0.5)",
  "rgb(33, 150, 243, 0.5)",
  "rgb(255, 193, 7, 0.5)",
];

export const MAX_THICKNESS = 19;

export const BASE_URL = "https://api.kumoh.org";
export const WEB_URL = "https://www.kumoh.org";

export const PORTFOLIO_LINK =
  "https://ordermanage.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%B3%E1%86%B7%E1%84%8B%E1%85%A9IMT_%E1%84%8F%E1%85%A1%E1%84%90%E1%85%A1%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3.pdf";

export const BLUR_URL_1_1 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8Wg8AAk8BZuQcWLwAAAAASUVORK5CYII=";

export const BLUR_URL_2_1 =
  "iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAQAAABeK7cBAAAADUlEQVR42mN8Ws/AAAAFGwFmI0jhxgAAAABJRU5ErkJggg==";
