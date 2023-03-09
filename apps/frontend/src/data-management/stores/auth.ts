import { reactive } from "vue";
import AuthApi from "../api/auth";

export default class AuthStore {

    public store = reactive({
        token: '',
        user: {
            id: '',
            name: '',
        }
    })

    public async loginAndSetToken(username: string, password: string) {
        this.setToken((await AuthApi.login(username, password)).token);
    }

    public getToken() {
        return this.store.token;
    }

    public setToken(token: string) {
        this.store.token = token;
    }

} 