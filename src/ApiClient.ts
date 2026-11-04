import axios from 'axios';
import 'dotenv/config';

export default class ApiClient {
    private static instance: ApiClient | null = null;

    private constructor(
        public readonly url: string = 'https://jsonplaceholder.typicode.com'
    ) { }

    static getInstance() {
        if (this.instance === null)
            this.instance = new ApiClient();

        return this.instance;
    }

    get<T>(endpoint: string) {
        return axios.get<T>(`${this.url}/${endpoint}`)
    }

    post<T, D>(endpoint: string, data: D) {
        return axios.post<T>(`${this.url}/${endpoint}`, { data });
    }

    put<T, D>(endpoint: string, data: D) {
        return axios.put<T>(`${this.url}/${endpoint}`, { data });
    }

    delete<T = Record<string, never>>(endpoint: string) {
        return axios.delete<T>(`${this.url}/${endpoint}`);
    }
}
