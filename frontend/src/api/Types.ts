import {SrcCollection} from "./shvl/Collection";
import {Asset} from "./shvl/Asset";

export interface User {
    id: string;
    name: string;
    picture: string;
}

export interface UserFull {
    id: string;
    name: string;
    picture: string;
    email: string;
    role: string;
    groups: Array<GroupResponse>
    subscriptions: Array<SuscriptionResponse>
}

export interface UserLogin {
    id: string
    email: string;
    password: string;

}

type Role = 'user' | 'admin';

export interface UserCreate {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: Role;
    groups?: Array<string>
    subscriptions?: Array<string>
}

export interface MenuCreate {
    id?: string;
    name: string;
    icon: string;
    menus: Array<string>;
    path: string;
}

export interface GroupCreate {
    id?: string;
    name: string;
    menus: Array<string>;
}

export interface GroupResponse {
    id: string;
    name: string;
    icon: string;
    menus: Array<MenuResponse>;
    createdAt: Date;
    updatedAt: Date;
}

export interface MenuResponse {
    id: string;
    name: string;
    icon: string;
    menus: Array<MenuResponse>;
    path: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface LoginSuccess {
    user: any,
    token: string
}

export interface LoginSend {
}

export interface ProviderResponse {
    id: string;
    name: string;
    keyId: Array<string>;
    urlBase: string;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProviderCreate {
    id?: string;
    name: string;
    keyId: Array<string>;
    urlBase: string;
    enabled: boolean;

}

export interface SuscriptionCreate {
    id?: string
    name: string,
    validity: number,
    price: number;
}

export interface SuscriptionResponse {
    id: string
    name: string,
    validity: number,
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProcessResponse {
    id: string,
    name: string;
    provider: ProviderResponse;
    requireApiKey: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProcessCreate {
    id?: string,
    name: string;
    provider: string;
    requireApiKey: boolean
}

export interface Catalog {
    id: string
    roles: Array<string>;
    processNames: Array<string>;
    providers: Array<string>;
}

export interface CollectionResponse {
    id: string,
    name: string
    slug: string
    minToken: number
    maxToken: number
    totalAssets: number
    totalAssetPopulated: number
    status: string
    provider: string;
    detail?: SrcCollection
    traits: Array<{
        key: string,
        value: Array<string>
    }>
    createdAt: Date
    updatedAt: Date
}

export interface CollectionCreate {
    id?: string,
    name: string
}

export interface AssetResponse {
    id: string;
    name: string
    srcCollection: SrcCollection,
    detail: Asset;
    createdAt: Date;
    updatedAt: Date;
}

export interface AssetResponseSort {
    id: string;
    name: Asset;
}

export interface AssetCreate {

}

export interface WalletCreate {
    id?: string;
    name: string;
    secret: string;
}

export interface WalletResponse {
    id: string;
    name: string;
    secret: string;
    user: UserFull;
    updatedAt: Date;
    createdAt: Date;
}

export interface BidCreate {
    id?: string;
    wallet: string;
    minimalBid: number;
    maximalBid: number;
    outbidAmount: number;
    expirationTime: number;
    assets: Array<string>
}
export interface BidResponse {
    id: string;
    wallet: WalletResponse;
    minimalBid: number;
    maximalBid: number;
    outbidAmount: number;
    expirationTime: number;
    user: UserFull;
    assets: Array<string>
    createdAt: Date;
    updatedAt: Date;
}

export interface PlacementResponse {
    id: string
    user: UserFull
    asset: AssetResponse
    wallet: WalletResponse
    status: string;
    bid: string;
    createdAt: Date
    updatedAt: Date
}

export interface PlacementCreate {

}