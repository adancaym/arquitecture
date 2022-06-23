export interface Trait {
    key: string;
    values: string[];
    _id: string;
}

export interface SrcCollection {
    id: string;
    name: string;
    status: string;
    slug: string;
    minToken: number;
    maxToken: number;
    totalAssetPopulated: number;
    traits: Trait[];
}


