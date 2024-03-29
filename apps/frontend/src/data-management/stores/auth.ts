import { reactive } from "vue";
import AuthApi from "../api/auth";

interface User {
    username: string;
    id?: string;
    isAdmin?: boolean;
    isset?: boolean;
}

export default class AuthStore {

    private static store = reactive({
        token: localStorage.getItem('token') || '',
        user: {
            id: '',
            username: '',
            isAdmin: false,
            isSet: false
        }
    })

    private static api = new AuthApi();

    public static getStore() {
        return AuthStore.store;
    }

    public static async loginAndSetToken(username: string, password: string) {
        let loginResponse = await this.api.login(username, password)
        if(!loginResponse.success){
            return alert('Login failed');
        }
        AuthStore.setToken(loginResponse.token);
        AuthStore.setUser(loginResponse.username, loginResponse.id);
    }


    public static getToken() {
        return AuthStore.store.token;
    }


    public static isLoggedIn() {
        return AuthStore.store.token !== '';
    }


    private static setToken(token: string) {
        AuthStore.store.token = token;
        localStorage.setItem('token', token);
    }


    private static setUser(username: string, id: string = '', isAdmin: boolean = false) {
        this.store.user.username = username;
        this.store.user.id = id;
        this.store.user.isAdmin = isAdmin;
        this.store.user.isSet = !!username;
    }


    public static async getUser(): Promise<User> {
        if(!AuthStore.isLoggedIn()){
            return AuthStore.store.user;
        }

        if(!AuthStore.store.user.isSet){
            let User = await this.api.getMe()
            if(!User){
                return AuthStore.store.user;
            }
            AuthStore.setUser(User.username);
        }
        return AuthStore.store.user;
    }


    public static async logout() {
        AuthStore.setToken('');
        AuthStore.setUser('');
    }


} 