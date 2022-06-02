import {Controller} from "../core/Controller";
import {AssetResponse, AssetCreate, AssetResponseSort, PlacementResponse, PlacementCreate} from "../Types";
import {EntityHtmlHelper} from "../core/EntityHtmlHelper";
import {ModalToTable} from "../core/FieldReducers";
import {JsonToTable} from "react-json-to-table";
import {catchReponse, processReponse, ResponseFormat} from "../core/ApiConsumer";
import {IOptions} from "../core/Endpoint";

export class Placements extends Controller<PlacementResponse, PlacementCreate> {
    table: EntityHtmlHelper<PlacementResponse>


    constructor() {
        super('placements');
        this.table = new EntityHtmlHelper<PlacementResponse>([
            {type: 'id', key: 'id', label: 'id'},
            {type: 'readOnlyInTable', key: 'user', label: 'User', reducer: e => <p>{e.user.name}</p>},
            {type: 'readOnlyInTable', key: 'asset', label: 'Asset', reducer: e => <p>{e.asset.name}</p>},
            {type: 'readOnlyInTable', key: 'wallet', label: 'Wallet', reducer: e => <p>{e.wallet.name}</p>},
            {type: 'readOnlyInTable', key: 'bid', label: 'Bid', reducer: e => <p>{e.bid}</p>},
            {type: 'readOnlyInTable', key: 'event', label: 'Find last offer', reducer: e => <ModalToTable name={'Last offer'} size={'lg'}><JsonToTable json={e}/></ModalToTable>},
        ]);
    }

    convert(object: PlacementResponse): PlacementCreate {
        return {} as PlacementCreate;
    }


}

