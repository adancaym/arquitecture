import React from "react";

export interface Children {
    children?: JSX.Element | JSX.Element[] | React.ReactNode
}

export interface Collection {
    banner_image_url: string;
    chat_url?: any;
    created_date: Date;
    default_to_fiat: boolean;
    description: string;
    dev_buyer_fee_basis_points: number;
    dev_seller_fee_basis_points: number;
    discord_url: string;
    display_data: string;
    external_url: string;
    featured: boolean;
    featured_image_url: string;
    hidden: boolean;
    safelist_request_status: string;
    image_url: string;
    is_subject_to_whitelist: boolean;
    large_image_url: string;
    medium_username: string;
    name: string;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: number;
    opensea_seller_fee_basis_points: number;
    payout_address: string;
    require_email: boolean;
    short_description?: any;
    slug: string;
    telegram_url: string;
    twitter_username: string;
    instagram_username: string;
    wiki_url?: any;
    is_nsfw: boolean;
}

export interface CreateCollectionResponseDto {
    message: string;
    Collection: Collection;
}

