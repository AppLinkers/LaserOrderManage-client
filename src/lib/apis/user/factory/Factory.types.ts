export type IFactoryAccountResponse = {
  companyName: string;
  representative: string;
  fax: string;
};

export type IEditFactoryAccountRequest = {
  companyName: string;
  representative: string;
  fax: string;
};

export type IFactoryUser = {
  phone: string;
  zipCode: string;
  address: string;
  detailAddress: string | null;
};
