import {Crud} from "../../components/Crud";
import {Menus} from "../../api/backend/Menus";
import {
    AssetCreate, AssetResponse, BidCreate, BidResponse,
    CollectionCreate, CollectionResponse,
    GroupCreate,
    GroupResponse,
    MenuCreate,
    MenuResponse, PlacementCreate, PlacementResponse, ProcessCreate, ProcessResponse,
    ProviderCreate,
    ProviderResponse, SuscriptionCreate, SuscriptionResponse,
    UserCreate,
    UserFull, WalletCreate, WalletResponse
} from "../../api/Types";
import {Users} from "../../api/backend/Users";
import {Groups} from "../../api/backend/Groups";
import {Providers} from "../../api/backend/Providers";
import {Suscriptions} from "../../api/backend/Suscriptions";
import {Processes} from "../../api/backend/Processes";
import {Collections} from "../../api/backend/Collections";
import {Assets} from "../../api/backend/Assets";
import {Wallets} from "../../api/backend/Wallets";
import {Bids} from "../../api/backend/Bids";
import {Placements} from "../../api/backend/Placements";

export const CrudMenus = () => <Crud<Menus, MenuResponse, MenuCreate> controller={new Menus()}/>
export const CrudUsers = () => <Crud<Users, UserFull, UserCreate> controller={new Users()}/>
export const CrudGroups = () => <Crud<Groups, GroupResponse, GroupCreate> controller={new Groups()}/>
export const CrudProviders = () => <Crud<Providers, ProviderResponse, ProviderCreate> controller={new Providers()}/>
export const CrudSuscriptions = () => <Crud<Suscriptions, SuscriptionResponse, SuscriptionCreate> controller={new Suscriptions()}/>
export const CrudProcesses = () => <Crud<Processes, ProcessResponse, ProcessCreate> controller={new Processes()}/>
export const CrudCollections = () => <Crud<Collections, CollectionResponse, CollectionCreate> controller={new Collections()}/>
export const CrudAssets = () => <Crud<Assets, AssetResponse, AssetCreate> controller={new Assets()}/>
export const CrudWallets= () => <Crud<Wallets, WalletResponse, WalletCreate> controller={new Wallets()}/>
export const CrudBids= () => <Crud<Bids, BidResponse, BidCreate> controller={new Bids()}/>
export const CrudPlacements= () => <Crud<Placements, PlacementResponse, PlacementCreate> controller={new Placements()}/>
