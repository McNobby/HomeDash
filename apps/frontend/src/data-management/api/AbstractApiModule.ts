import axios from "axios";

export default abstract class AbstractApiModule {

    protected apiUrl = 'http://localhost:9000/v1';
    protected api = axios.create({
        baseURL: this.apiUrl,
        timeout: 2000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    protected getToken(): string {
        return localStorage.getItem('token') || '';
    }

}