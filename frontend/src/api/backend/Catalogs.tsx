import {Catalog} from "../Types";
import {Controller} from "../core/Controller";


export class Catalogs extends Controller<Catalog, Catalog> {
    constructor() {
        super('catalogs');
    }

    listRoles() {
        return this.http.get<Catalog>(this.endpoint.endpointUrl().toString()).then(r => r.data.roles)
    }
    listProcessName() {
        return this.http.get<Catalog>(this.endpoint.endpointUrl().toString()).then(r => r.data.processNames)
    }

    listProvidersName() {
        return this.http.get<Catalog>(this.endpoint.endpointUrl().toString()).then(r => r.data.providers)
    }

    convert(object: Catalog) {
        return {} as Catalog;
    }
}
