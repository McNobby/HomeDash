import AbstractApiModule from "./AbstractApiModule";
import axios from "axios";
import AuthStore from "../stores/auth";


interface LoginResponse {
    token: string;
    username: string;
    id: string;
    success: boolean;
}

interface Me {
    username: string;
}

export default class AuthApi extends AbstractApiModule {
    

    public async login(username: string, password: string): Promise<LoginResponse> {
        return this.api.post(`/auth/login`, {
                username: username,
                password: password
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {             
                console.log(error.message, error.name);
                return {
                    token: '',
                    success: false
                }
            }
        );
    }

    public async getMe(): Promise<Me|null> {
        if(!AuthStore.isLoggedIn()){
            return null;
        }

        return this.api.get(`/auth/me`, {
            headers: {
                Authorization: `Bearer ${AuthStore.getToken()}`
            }
        }).then((response) => {
            return response.data.user;
        }).catch((error) => {
            console.log(error.message, error.name);
            return {
                user: {
                    username: '',
                }
            }
        });

    }
}


