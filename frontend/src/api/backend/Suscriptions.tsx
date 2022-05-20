import {Controller} from "../core/Controller";
import {ProviderCreate, ProviderResponse} from "../Types";
import {FormHelper} from "../core/Forms";
import {EntityHtmlHelper} from "../core/EntityHtmlHelper";
import * as Yup from "yup";


export class Providers extends Controller<ProviderResponse, ProviderCreate> {
    forms: FormHelper<ProviderCreate>
    table: EntityHtmlHelper<ProviderResponse>

    constructor() {

        super('providers');
        this.table = new EntityHtmlHelper<ProviderResponse>([
            {type: 'id', key: 'id', label: 'id'},
            {type: 'text', key: 'name', label: 'Nombre'},
            {type: 'text', key: 'urlBase', label: 'Ruta'},
            {type: 'text', key: 'keyId', label: 'Key id | API KEY'},
        ]);
        this.forms = new FormHelper<ProviderCreate>({
            initialValues: {
                id: '',
                name: '',
                keyId: '',
                urlBase: '',

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
                keyID: Yup.string().required(),
                urlBase: Yup.string().min(1).required()
            })
        })
    }
}