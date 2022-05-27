import axios from 'axios'
import {AuthModel, UserModel} from './_models'
import {Auth} from "../../../../api/backend/Auth";
import {LoginSuccess, UserFull} from "../../../../api/Types";
import {Users} from "../../../../api/backend/Users";

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
export const LOGIN_URL = `${API_URL}/login`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
export function login(email: string, password: string): Promise<LoginSuccess> {
    const auth = new Auth()
    return auth.login(email, password)
}

// Server should return AuthModel
export function register(
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    password_confirmation: string
) {
    return axios.post(REGISTER_URL, {
        email,
        first_name: firstname,
        last_name: lastname,
        password,
        password_confirmation,
    })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
    return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
        email,
    })
}

export function getUserByToken() {
    const userService = new Users();
    return userService.me();
}
