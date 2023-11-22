export interface IDeliveryAddressListResponse {
    content: IDeliveryAddress[];
    totalElements: number;
}

export interface IDeliveryAddress {
    id: number;
    name: string;
    zipCode: string;
    address: string;
    detailAddress: string;
    receiver: string;
    phone1: string;
    phone2: string | null;
    isDefault: boolean;
}