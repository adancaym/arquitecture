import {Controller} from "../core/Controller";
import {
    AssetResponse,
    AssetCreate,
    AssetResponseSort,
    BidResponse,
    BidCreate,
    CollectionCreate,
    MenuCreate
} from "../Types";
import {EntityHtmlHelper} from "../core/EntityHtmlHelper";
import {ModalToTable} from "../core/FieldReducers";
import {JsonToTable} from "react-json-to-table";
import {catchReponse, processReponse, ResponseFormat} from "../core/ApiConsumer";
import {IOptions} from "../core/Endpoint";
import {FormHelper} from "../core/Forms";
import * as Yup from "yup";

export class Bids extends Controller<BidResponse, BidCreate> {
    table: EntityHtmlHelper<BidResponse>
    forms: FormHelper<BidCreate>


    constructor() {
        super('bids');
        this.table = new EntityHtmlHelper<BidResponse>([
            {type: 'id', key: 'id', label: 'id'},
            {type: 'readOnlyInTable', key: 'assets', label: 'Number of assets', reducer: e => <p>{e.assets.length}</p>},
            {type: 'readOnlyInTable', key: 'user', label: 'User', reducer: e => <p>{e.user.name}</p>},
            {type: 'readOnlyInTable', key: 'wallet', label: 'Wallet', reducer: e => <p>{e.wallet.name}</p>},
            {type: 'number', key: 'minimalBid', label: 'Minimal Bid'},
            {type: 'number', key: 'maximalBid', label: 'Maximal Bid'},
            {type: 'number', key: 'outbidAmount', label: 'Outbid Amount'},
            {type: 'number', key: 'expirationTime', label: 'Expiration Time'},
        ]);
        this.forms = new FormHelper<BidCreate>({
            initialValues: {
                assets: [],
                wallet: '',
                minimalBid: 0,
                maximalBid: 0,
                outbidAmount: 0,
                expirationTime: 0
            },
            onSubmit: (values: BidCreate) => {
                if (values.id) {
                    return this.update(values.id, values)
                } else {
                    return this.create(values)
                }
            },
            validationSchema: Yup.object({})
        })
    }

    convert(object: BidResponse): BidCreate {
        return {
            id: object.id,
            wallet: object.wallet.id,
            assets: object.assets,
            expirationTime: object.expirationTime,
            maximalBid: object.maximalBid,
            minimalBid: object.minimalBid,
            outbidAmount: object.outbidAmount
        };
    }
}

