import axios from "axios";

export default abstract class AbstractApiModule {

    protected apiUrl = 'http://localhost:9000/api';
    protected api = axios.create({
        baseURL: this.apiUrl,
        timeout: 2000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    protected getToken() {
        localStorage.getItem('token') || '';
    }

}