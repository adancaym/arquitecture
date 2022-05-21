import {Controller} from "../core/Controller";
import {WalletResponse, WalletCreate, CollectionCreate} from "../Types";
import {EntityHtmlHelper} from "../core/EntityHtmlHelper";

import {FormHelper} from "../core/Forms";
import * as Yup from "yup";
import {catchReponse, processReponse, ResponseFormat} from "../core/ApiConsumer";
import {IOptions} from "../core/Endpoint";

export class Wallets extends Controller<WalletResponse, WalletCreate> {
    table: EntityHtmlHelper<WalletResponse>
    forms: FormHelper<WalletCreate>

    constructor() {
        super('wallets');
        this.table = new EntityHtmlHelper<WalletResponse>([
            {type: 'id', key: 'id', label: 'id'},
            {type: 'text', key: 'name', label: 'Wallet Name'},
            {
                type: 'password',
                key: 'secret',
                label: 'Wallet secret',
                reducer: (e) => <p>{new Array(e.secret.length + 1).join('*')}</p>
            }
        ]);
        this.forms = new FormHelper<WalletCreate>({
            initialValues: {
                name: '',
                secret: ''
            },
            onSubmit: (values: CollectionCreate) => {
                if (values.id) {
                    return this.update(values.id, values)
                } else {
                    return this.create(values)
                }
            },
            validationSchema: Yup.object({
                name: Yup.string().min(3).required(),
                secret: Yup.string().min(3).required(),
            })
        })
    }

    convert(object: WalletResponse): WalletCreate {
        return {
            id: object.id,
            name: object.name,
            secret: object.secret
        };
    }
    myWallets(params?: IOptions): Promise<ResponseFormat<WalletResponse>> {
        return this.http.get<ResponseFormat<WalletResponse>>(this.endpoint.appendUri('myWallets').toString(), params).then(processReponse)
            .catch(catchReponse)
    }

}

