import {Controller} from "../core/Controller";
import {
    CollectionCreate,
    CollectionResponse,
} from "../Types";
import {FormHelper} from "../core/Forms";
import {EntityHtmlHelper} from "../core/EntityHtmlHelper";
import * as Yup from "yup";
import {JsonToTable} from "react-json-to-table";
import {ModalToTable} from "../core/FieldReducers";


export class Collections extends Controller<CollectionResponse, CollectionCreate> {
    forms: FormHelper<CollectionCreate>
    table: EntityHtmlHelper<CollectionResponse>

    constructor() {

        super('srcCollections');
        this.table = new EntityHtmlHelper<CollectionResponse>([
            {type: 'id', key: 'id', label: 'id'},
            {type: 'text', key: 'name', label: 'Name'},
            {type: 'readOnlyInTable', key: 'status', label: 'Status'},
            {type: 'readOnlyInTable', key: 'provider', label: 'Provider'},
            {type: 'readOnlyInTable', key: 'apikey', label: 'Apikey used'},
            {type: 'readOnlyInTable', key: 'trais', label: 'Trait Qty',
                reducer: (o) => <>{o.srcCollection && <p>{Object.keys(o.srcCollection?.collection?.traits).length}</p>}</>
            },
            {
                type: 'table',
                key: 'srcCollection',
                label: 'Collection',
                reducer: (o) => {
                    const clone = JSON.parse(JSON.stringify(o))
                    if (clone.srcCollection) delete clone.srcCollection?.collection?.editors
                    return <>
                        {clone.srcCollection && <ModalToTable name={'Ver'} size={'lg'}>
                            <div className="table-responsive" style={{maxHeight: '70vh'}}>
                                {<JsonToTable json={clone.srcCollection}></JsonToTable>}
                            </div>
                        </ModalToTable>}
                    </>
                }
            },{
                type: 'table',
                key: 'editor',
                label: 'Editor',
                reducer: (o) => {
                    return <ModalToTable name={'Ver'} size={'lg'}>
                        <div className="table-responsive" style={{maxHeight: '70vh'}}>
                            {o.srcCollection && <JsonToTable json={{editors: o.srcCollection?.collection?.editors}}></JsonToTable>}
                        </div>
                    </ModalToTable>
                }
            },
        ]);
        this.forms = new FormHelper<CollectionCreate>({
            initialValues: {
                name: '',
            },
            onSubmit: async (values: CollectionCreate) => {
                if (values.id) {
                    return this.update(values.id, values)
                } else {
                    return this.create(values)
                }
            },
            validationSchema: Yup.object({
                name: Yup.string().min(3).required(),
            })
        })
    }

    convert(object: CollectionResponse): CollectionCreate {
        return {
            id: object.id,
            name: object.name,
        };
    }

}