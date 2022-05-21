import {Controller} from "../core/Controller";
import {AssetResponse, AssetCreate, AssetResponseSort} from "../Types";
import {EntityHtmlHelper} from "../core/EntityHtmlHelper";
import {ModalToTable} from "../core/FieldReducers";
import {JsonToTable} from "react-json-to-table";
import {catchReponse, processReponse, ResponseFormat} from "../core/ApiConsumer";
import {IOptions} from "../core/Endpoint";

export class Assets extends Controller<AssetResponse, AssetCreate> {
    table: EntityHtmlHelper<AssetResponse>


    constructor() {
        super('assets');
        this.table = new EntityHtmlHelper<AssetResponse>([
            {type: 'id', key: 'id', label: 'id'},
            {type: 'text', key: 'name', label: 'Name'},
            {type: 'readOnlyInTable', key: 'provider', label: 'Provider'},
            {type: 'readOnlyInTable', key: 'apikey', label: 'Apikey used'},
            {
                type: 'table',
                key: 'srcCollection',
                label: 'Traits',
                reducer: (o) => {
                    return <ModalToTable name={'Ver'} size={'lg'}>
                        <div className="table-responsive" style={{maxHeight: '70vh'}}>
                            {<JsonToTable json={o.asset.traits}></JsonToTable>}
                        </div>
                    </ModalToTable>
                }
            }
        ]);
    }

    convert(object: AssetResponse): AssetCreate {
        return {};
    }

    findBySrcCollection(srcCollection: string, params?: IOptions):Promise<ResponseFormat<AssetResponseSort>>{
        return this.http.get<ResponseFormat<AssetResponseSort>>(this.endpoint.appendUri('srcCollection').toString(), {
            params: {srcCollection, ...params?.params}
        }).then(processReponse)
            .catch(catchReponse)
    }

    findCollectionRangeTokenId(srcCollection: string, from: number, to: number) {
        return this.http.get(this.endpoint.appendUri('token_range').toString(), {
            params: {srcCollection, from, to}
        }).then(processReponse)
            .catch(catchReponse)
    }

    findBySrcCollectionAndTraitValue(srcCollection: string, traitType: string, value: string, params?: IOptions):Promise<ResponseFormat<AssetResponseSort>> {
        return this.http.get<ResponseFormat<AssetResponseSort>>(this.endpoint.appendUri('trait_type').toString(), {
            params: {srcCollection, traitType, value, ...params?.params}
        }).then(processReponse)
            .catch(catchReponse)
    }
    findTraitTypesBySrcCollection(srcCollection: string): Promise<ResponseFormat<string>> {
        return this.http.get<ResponseFormat<string>>(this.endpoint.appendUri('type_traits_name').toString(), {
            params: {srcCollection}
        }).then(processReponse)
            .catch(catchReponse)
    }
    findTraitValuesBySrcCollectionAndTypeTrait(srcCollection: string, type_trait: string):Promise<ResponseFormat<string>> {
        return this.http.get<ResponseFormat<string>>(this.endpoint.appendUri('trait_values_by_type').toString(), {
            params: {srcCollection, type_trait}
        }).then(processReponse)
            .catch(catchReponse)
    }
}

