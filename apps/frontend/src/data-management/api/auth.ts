import AbstractApiModule from "./AbstractApiModule";
import axios from "axios";


interface LoginResponse {
    token: string;
    success: boolean;
}

    export default class AuthApi extends AbstractApiModule {
    

    public static async login(username: string, password: string): Promise<LoginResponse> {
        return axios.post(`${this.apiUrl}/api/auth/login`, {
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


}


