import {Controller} from "../core/Controller";
import {GroupCreate, GroupResponse, ProcessCreate, ProcessResponse} from "../Types";
import {EntityHtmlHelper} from "../core/EntityHtmlHelper";
import icons from "../Helpers/Icons.json";
import {ArrayObjectReducer, BooleanToHuman, DateReducer} from "../core/FieldReducers";
import {FormHelper} from "../core/Forms";
import * as Yup from "yup";
import {Providers} from "./Providers";
import {Catalogs} from "./Catalogs";

export class Processes extends Controller<ProcessResponse, ProcessCreate> {

    constructor() {
        super('processes');
        this.table = new EntityHtmlHelper<ProcessResponse>([
            {type: 'id', key: 'id', label: 'id'},
            {
                type: 'select',
                key: 'name',
                label: 'Nombre',
                options: () => new Catalogs().listProcessName().then( c => c.map(e => ({name: e, value: e}))),
                reducer: (e) => <p>{e.name}</p>
            },
            {
                type: 'select',
                key: 'provider',
                label: 'Proveedor',
                options: () => new Providers().optionsEnabled(),
                reducer: (o) => <p>{o.provider.name}</p>
            },
            {type: 'checkbox', key: 'requireApiKey', label: 'Requiere api key?',reducer: o => <BooleanToHuman bool={o.requireApiKey} />},

            {
                type: 'dateReadOnly',
                key: 'createdAt',
                label: 'Fecha de creación',
                reducer: (e) => <DateReducer date={new Date(e.createdAt)}/>
            },
            {
                type: 'dateReadOnly',
                key: 'updatedAt',
                label: 'Fecha de actualización',
                reducer: (e) => <DateReducer date={new Date(e.updatedAt)}/>
            },
        ]);
        this.forms = new FormHelper<ProcessCreate>({
            initialValues: {
                name: '',
                provider: '',
                requireApiKey: false,
            },
            onSubmit: (values: ProcessCreate) => {
                if (values.id) {
                    return this.update(values.id, values)
                } else {
                    return this.create(values)
                }
            },
            validationSchema: Yup.object({
                name: Yup.string().min(3).required(),
                provider: Yup.string().required(),
                requireApiKey: Yup.boolean().required()
            })
        })
    }

    convert(object: ProcessResponse): ProcessCreate {
        return {
            id: object.id,
            name: object.name,
            provider: object.provider.id,
            requireApiKey: object.requireApiKey
        };
    }
}