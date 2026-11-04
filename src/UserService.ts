import type { NewUser } from './NewUser';
import type ApiClient from "./ApiClient";
import type { User } from "./User";

export default class UserService {
    constructor(private readonly client: ApiClient) { }

    fetch() {
        return this.client.get<User[]>('users');
    }

    find(id: number) {
        return this.client.get<User>(`users/${id}`);
    }

    create(data: Omit<User, 'id'>) {
        return this.client.post<NewUser, Omit<User, 'id'>>('users', data);
    }

    update(id: number, data: Omit<User, 'id'>) {
        return this.client.put<NewUser, Omit<User, 'id'>>(`users/${id}`, data);
    }

    delete(id: number) {
        return this.client.delete(`users/${id}`);
    }
}
