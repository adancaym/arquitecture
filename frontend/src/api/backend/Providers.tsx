import {Controller} from "../core/Controller";
import {ProviderCreate, ProviderResponse} from "../Types";
import {FormHelper} from "../core/Forms";
import {EntityHtmlHelper, OptionsFieldEntityHtmlHelper} from "../core/EntityHtmlHelper";
import * as Yup from "yup";
import {ArrayObjectReducer, BooleanToHuman} from "../core/FieldReducers";
import {Catalogs} from "./Catalogs";


export class Providers extends Controller<ProviderResponse, ProviderCreate> {
    forms: FormHelper<ProviderCreate>
    table: EntityHtmlHelper<ProviderResponse>

    constructor() {

        super('providers');
        this.table = new EntityHtmlHelper<ProviderResponse>([
            {
                type: 'select',
                key: 'name',
                label: 'Nombre',
                options: () => new Catalogs().listProvidersName().then( c => c.map(e => ({name: e, value: e}))),
                reducer: (e) => <p>{e.name}</p>
            },
            {type: 'text', key: 'urlBase', label: 'Ruta'},
            {type: 'checkbox', key: 'enabled', label: 'Habilitado',reducer: o => <BooleanToHuman bool={o.enabled} />},
            {
                type: 'arrayString',
                key: 'keyId',
                label: 'Api key | Token',
                options: (e) => e.map(key => ({value: key, name: key})),
                reducer: (o) => <ArrayObjectReducer array={o.keyId.map(e => ({name: e}))}/>
            },
        ]);
        this.forms = new FormHelper<ProviderCreate>({
            initialValues: {
                id: '',
                name: '',
                keyId: [],
                urlBase: '',
                enabled: false

            },
            onSubmit: (values: ProviderCreate) => {
                if (values.id) {
                    return this.update(values.id, values)
                } else {
                    return this.create(values)
                }
            },
            validationSchema: Yup.object({
                name: Yup.string().min(3).required(),
                keyID: Yup.array(),
                urlBase: Yup.string().min(1).required(),
                enabled: Yup.boolean().required()
            })
        })
    }
    optionsEnabled(): Promise<Array<OptionsFieldEntityHtmlHelper>> {
        this.pagination.page = 1;
        this.pagination.limit = 1;
        return this.list<ProviderResponse>().then(r => {
            this.pagination.limit = r.count
            return this.list<ProviderResponse>()
                .then(r => r.rows.filter(e => e.enabled).map((e: ProviderResponse) => {
                    const option: OptionsFieldEntityHtmlHelper = {
                        name: e.name,
                        value: e.id
                    }
                    return option
                }));
        })
    }

    convert(object: ProviderResponse): ProviderCreate {
        return {
            id: object.id,
            name: object.name,
            keyId: object.keyId,
            urlBase: object.urlBase,
            enabled: object.enabled
        };
    }
}