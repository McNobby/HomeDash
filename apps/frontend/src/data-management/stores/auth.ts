import { reactive } from "vue";
import AuthApi from "../api/auth";

interface User {
    username: string;
    id: string;
}

export default class AuthStore {

    public static store = reactive({
        token: localStorage.getItem('token') || '',
        user: {
            id: '',
            username: '',
        }
    })

    public static async loginAndSetToken(username: string, password: string) {
        let loginResponse = await AuthApi.login(username, password)
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


    private static setUser(username: string, id: string) {
        AuthStore.store.user.username = username;
        AuthStore.store.user.id = id;
    }


    public static getUser(): User {
        return AuthStore.store.user;
    }

} 