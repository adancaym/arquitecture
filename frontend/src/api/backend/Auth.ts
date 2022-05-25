import { AxiosRequestConfig } from "axios";

import { catchReponse, processReponse } from "../core/ApiConsumer";
import { Controller } from "../core/Controller";
import { LoginSend, LoginSuccess, UserFull, UserLogin } from "../Types";

export class Auth extends Controller<UserLogin, UserFull> {

    constructor() {
        super('auth', () => `${process.env.REACT_APP_MASTER_KEY}`);
    }

    login(user: string, pass: string) {
        const credentials = btoa(user + ':' + pass);
        const basicAuth = 'Basic ' + credentials;
        const config = { headers: { "Authorization": basicAuth } };
        const data: LoginSend = {
            access_token: this.getAccessToken()
        }
        // this method only login not create a user
        return this.create<LoginSuccess, LoginSend>(data, config);
    }

    create<R, S>(data: S, config?: AxiosRequestConfig): Promise<R> {
        return this.http
            .post<R, S>(this.endpoint.endpointUrl().toString(), data, config)
            .then(processReponse)
            .catch(catchReponse)
    }
}
