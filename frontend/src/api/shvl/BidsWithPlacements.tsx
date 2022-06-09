export interface User {
    id: string;
}

export interface AssetContract {
    address: string;
    asset_contract_type: string;
    created_date: Date;
    name: string;
    nft_version: string;
    opensea_version?: any;
    owner?: number;
    schema_name: string;
    symbol: string;
    total_supply: string;
    description?: any;
    external_link?: any;
    image_url?: any;
    default_to_fiat: boolean;
    dev_buyer_fee_basis_points: number;
    dev_seller_fee_basis_points: number;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: number;
    opensea_seller_fee_basis_points: number;
    buyer_fee_basis_points: number;
    seller_fee_basis_points: number;
    payout_address?: any;
}

export interface DisplayData {
    card_display_style: string;
    images: any[];
}

export interface Collection {
    banner_image_url?: any;
    chat_url?: any;
    created_date: Date;
    default_to_fiat: boolean;
    description?: any;
    dev_buyer_fee_basis_points: string;
    dev_seller_fee_basis_points: string;
    discord_url?: any;
    display_data: DisplayData;
    external_url?: any;
    featured: boolean;
    featured_image_url?: any;
    hidden: boolean;
    safelist_request_status: string;
    image_url?: any;
    is_subject_to_whitelist: boolean;
    large_image_url?: any;
    medium_username?: any;
    name: string;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: string;
    opensea_seller_fee_basis_points: string;
    payout_address?: any;
    require_email: boolean;
    short_description?: any;
    slug: string;
    telegram_url?: any;
    twitter_username?: any;
    instagram_username?: any;
    wiki_url?: any;
    is_nsfw: boolean;
}

export interface Owner {
    user?: any;
    profile_img_url: string;
    address: string;
    config: string;
}

export interface User2 {
    username?: any;
}

export interface Creator {
    user: User2;
    profile_img_url: string;
    address: string;
    config: string;
}

export interface Trait {
    trait_type: string;
    value: any;
    display_type?: any;
    max_value?: any;
    trait_count: number;
    order?: any;
}

export interface Asset3 {
    decimals: number;
    token_id: string;
}

export interface PaymentToken {
    symbol: string;
    address: string;
    image_url: string;
    name?: any;
    decimals: number;
    eth_price: string;
    usd_price: string;
}

export interface FromAccount {
    user?: any;
    profile_img_url: string;
    address: string;
    config: string;
}

export interface ToAccount {
    user?: any;
    profile_img_url: string;
    address: string;
    config: string;
}

export interface Transaction {
    block_hash: string;
    block_number: string;
    from_account: FromAccount;
    id: number;
    timestamp: Date;
    to_account: ToAccount;
    transaction_hash: string;
    transaction_index: string;
}

export interface LastSale {
    asset: Asset3;
    asset_bundle?: any;
    event_type: string;
    event_timestamp: Date;
    auction_type?: any;
    total_price: string;
    payment_token: PaymentToken;
    transaction: Transaction;
    created_date: Date;
    quantity: string;
}

export interface Asset2 {
    id: number;
    num_sales: number;
    background_color?: any;
    image_url: string;
    image_preview_url: string;
    image_thumbnail_url: string;
    image_original_url: string;
    animation_url?: any;
    animation_original_url?: any;
    name: string;
    description: string;
    external_link: string;
    asset_contract: AssetContract;
    permalink: string;
    collection: Collection;
    decimals: number;
    token_metadata: string;
    is_nsfw: boolean;
    owner: Owner;
    sell_orders?: any;
    seaport_sell_orders?: any;
    creator: Creator;
    traits: Trait[];
    last_sale: LastSale;
    top_bid?: any;
    listing_date?: any;
    is_presale: boolean;
    transfer_fee_payment_token?: any;
    transfer_fee?: any;
    token_id: string;
}

export interface PaymentToken2 {
    symbol: string;
    address: string;
    image_url?: any;
    name?: any;
    decimals: number;
    eth_price: string;
    usd_price?: any;
}

export interface User3 {
    username?: any;
}

export interface FromAccount2 {
    user: User3;
    profile_img_url: string;
    address: string;
    config: string;
}

export interface AssetContract2 {
    address: string;
    asset_contract_type: string;
    created_date: Date;
    name: string;
    nft_version: string;
    opensea_version?: any;
    owner?: any;
    schema_name: string;
    symbol: string;
    total_supply: string;
    description?: any;
    external_link?: any;
    image_url?: any;
    default_to_fiat: boolean;
    dev_buyer_fee_basis_points: number;
    dev_seller_fee_basis_points: number;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: number;
    opensea_seller_fee_basis_points: number;
    buyer_fee_basis_points: number;
    seller_fee_basis_points: number;
    payout_address?: any;
}

export interface DisplayData2 {
    card_display_style: string;
    images: any[];
}

export interface Collection2 {
    banner_image_url?: any;
    chat_url?: any;
    created_date: Date;
    default_to_fiat: boolean;
    description?: any;
    dev_buyer_fee_basis_points: string;
    dev_seller_fee_basis_points: string;
    discord_url?: any;
    display_data: DisplayData2;
    external_url?: any;
    featured: boolean;
    featured_image_url?: any;
    hidden: boolean;
    safelist_request_status: string;
    image_url?: any;
    is_subject_to_whitelist: boolean;
    large_image_url?: any;
    medium_username?: any;
    name: string;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: string;
    opensea_seller_fee_basis_points: string;
    payout_address?: any;
    require_email: boolean;
    short_description?: any;
    slug: string;
    telegram_url?: any;
    twitter_username?: any;
    instagram_username?: any;
    wiki_url?: any;
    is_nsfw: boolean;
}

export interface Owner2 {
    user?: any;
    profile_img_url: string;
    address: string;
    config: string;
}

export interface Asset4 {
    id: number;
    num_sales: number;
    background_color?: any;
    image_url: string;
    image_preview_url: string;
    image_thumbnail_url: string;
    image_original_url: string;
    animation_url?: any;
    animation_original_url?: any;
    name?: string;
    description: string;
    external_link: string;
    asset_contract: AssetContract2;
    permalink: string;
    collection: Collection2;
    decimals: number;
    token_metadata: string;
    is_nsfw: boolean;
    owner: Owner2;
    token_id: string;
}

export interface Event {
    asset_bundle?: any;
    event_type: string;
    event_timestamp: Date;
    auction_type?: any;
    total_price?: any;
    payment_token: PaymentToken2;
    transaction?: any;
    created_date: Date;
    quantity: string;
    approved_account?: any;
    bid_amount: string;
    collection_slug: string;
    contract_address: string;
    custom_event_name?: any;
    dev_fee_payment_event?: any;
    dev_seller_fee_basis_points: number;
    duration?: any;
    ending_price?: any;
    from_account: FromAccount2;
    id: number;
    is_private?: any;
    owner_account?: any;
    seller?: any;
    starting_price?: any;
    to_account?: any;
    winner_account?: any;
    listing_time?: any;
    asset: Asset4;
}

export interface Asset5 {
    id: string;
    address: string;
}

export interface Metadata {
    asset: Asset5;
    schema: string;
}

export interface MakerAccount {
    user?: any;
    profile_img_url: string;
    address: string;
    config: string;
}

export interface TakerAccount {
    user: number;
    profile_img_url: string;
    address: string;
    config: string;
}

export interface FeeRecipientAccount {
    user: number;
    profile_img_url: string;
    address: string;
    config: string;
}

export interface PaymentTokenContract {
    name?: any;
    symbol: string;
    decimals: number;
    address: string;
    imageUrl?: any;
    ethPrice: string;
    usdPrice?: any;
}

export interface Owner3 {
    user?: any;
    profile_img_url: string;
    address: string;
    config: string;
}

export interface AssetContract3 {
    name: string;
    description?: any;
    type: string;
    schemaName: string;
    address: string;
    tokenSymbol: string;
    buyerFeeBasisPoints: number;
    sellerFeeBasisPoints: number;
    openseaBuyerFeeBasisPoints: number;
    openseaSellerFeeBasisPoints: number;
    devBuyerFeeBasisPoints: number;
    devSellerFeeBasisPoints: number;
    imageUrl?: any;
    externalLink?: any;
}

export interface DisplayData3 {
    card_display_style: string;
    images: any[];
}

export interface Collection3 {
    createdDate: Date;
    name: string;
    description?: any;
    slug: string;
    hidden: boolean;
    featured: boolean;
    featuredImageUrl?: any;
    displayData: DisplayData3;
    paymentTokens: any[];
    openseaBuyerFeeBasisPoints: number;
    openseaSellerFeeBasisPoints: number;
    devBuyerFeeBasisPoints: number;
    devSellerFeeBasisPoints: number;
    payoutAddress?: any;
    imageUrl?: any;
    largeImageUrl?: any;
    externalLink?: any;
    wikiLink?: any;
}

export interface Asset6 {
    tokenId: string;
    tokenAddress: string;
    name: string;
    description: string;
    owner: Owner3;
    assetContract: AssetContract3;
    collection: Collection3;
    orders?: any;
    sellOrders?: any;
    buyOrders?: any;
    imageUrl: string;
    imagePreviewUrl: string;
    imageUrlOriginal: string;
    imageUrlThumbnail: string;
    externalLink: string;
    openseaLink: string;
    numSales: number;
    lastSale?: any;
    backgroundColor?: any;
    transferFee?: any;
    transferFeePaymentToken?: any;
}

export interface Order {
    hash: string;
    cancelledOrFinalized: boolean;
    markedInvalid: boolean;
    metadata: Metadata;
    quantity: string;
    exchange: string;
    makerAccount: MakerAccount;
    takerAccount: TakerAccount;
    maker: string;
    taker: string;
    makerRelayerFee: string;
    takerRelayerFee: string;
    makerProtocolFee: string;
    takerProtocolFee: string;
    makerReferrerFee: string;
    waitingForBestCounterOrder: boolean;
    feeMethod: number;
    feeRecipientAccount: FeeRecipientAccount;
    feeRecipient: string;
    side: number;
    saleKind: number;
    target: string;
    howToCall: number;
    calldata: string;
    replacementPattern: string;
    staticTarget: string;
    staticExtradata: string;
    paymentToken: string;
    basePrice: string;
    extra: string;
    currentBounty: string;
    currentPrice: string;
    createdTime: string;
    listingTime: string;
    expirationTime: string;
    salt: string;
    v: number;
    r: string;
    s: string;
    paymentTokenContract: PaymentTokenContract;
    asset: Asset6;
}

export interface Placement {
    user: string;
    asset: string;
    status: string;
    wallet: string;
    event: Event[];
    bid: string;
    keywords: string[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    id: string;
    order?: Order;
}

export interface Asset {
    id: string;
    name?: string;
    srcCollection: string;
    provider: string;
    apikey: string;
    asset: Asset2;
    createdAt: Date;
    updatedAt: Date;
    placements: Placement[];
}

export interface Row {
    id: string;
    user: User;
    wallet: string;
    minimalBid: string;
    maximalBid: string;
    outbidAmount: string;
    expirationTime: number;
    assets: Asset[];
    createdAt: Date;
    updatedAt: Date;
}

export interface BidWithPlacement {
    count: number;
    rows: Row[];
}


