import {Controller} from "../core/Controller";
import {ProviderCreate, ProviderResponse, SuscriptionCreate, SuscriptionResponse} from "../Types";
import {FormHelper} from "../core/Forms";
import {EntityHtmlHelper} from "../core/EntityHtmlHelper";
import * as Yup from "yup";


export class Suscriptions extends Controller<SuscriptionResponse, SuscriptionCreate> {
    forms: FormHelper<SuscriptionCreate>
    table: EntityHtmlHelper<SuscriptionResponse>

    constructor() {

        super('suscriptions');
        this.table = new EntityHtmlHelper<SuscriptionResponse>([
            {type: 'id', key: 'id', label: 'id'},
            {type: 'text', key: 'name', label: 'Name'},
            {type: 'number', key: 'validity', label: 'Duration|Validity (months)'},
            {type: 'number', key: 'price', label: 'Price'},
        ]);
        this.forms = new FormHelper<SuscriptionCreate>({
            initialValues: {
                name: '',
                validity: 0,
                price: 0,
            },
            onSubmit: (values: SuscriptionCreate) => {
                if (values.id) {
                    return this.update(values.id, values)
                } else {
                    return this.create(values)
                }
            },
            validationSchema: Yup.object({
                name: Yup.string().min(3).required(),
                validity: Yup.number().required().min(0),
                price: Yup.number().min(1).required()
            })
        })
    }

    convert(object: SuscriptionResponse): SuscriptionCreate {
        return {
            id: object.id,
            name: object.name,
            price: object.price,
            validity: object.validity
        };
    }

}