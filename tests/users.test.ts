import { describe, it, expect, beforeEach } from 'bun:test';
import UserService from '../src/UserService';
import ApiClient from '../src/ApiClient';
import type { User } from '../src/User';
import type { NewUser } from '../src/NewUser';

describe('Users', () => {
    let service: UserService;

    beforeEach(() => {
        service = new UserService(ApiClient.getInstance());
    });

    it('Get all', async () => {
        const response = await service.fetch();

        const users = response.data;

        expect(users).toBeInstanceOf(Array);
        expect(users[0]?.id).toBe(1);
        expect(users[0]?.name).toBeTypeOf('string');
        expect(users[0]?.email).toBeTypeOf('string');
    });

    it('Get by id', async () => {
        const id = 1;
        const response = await service.find(id);

        const user = response.data;

        expect(user.id).toBe(id);
        expect(user.name).toBeTypeOf('string');
        expect(user.email).toBeTypeOf('string');
    });

    it('Create new', async () => {
        const user: Omit<User, "id"> = { name: 'John Doe', email: "john.doe@test.com" }
        const response = await service.create(user);

        const created = response.data as NewUser;

        expect(created.id).toBe(11);
        expect(created.data.name).toBe(user.name);
        expect(created.data.email).toBe(user.email);
    });

    it('Update by id', async () => {
        const id = 1;
        const user: Omit<User, "id"> = { name: 'Jane Doe', email: "jane.doe@test.com" };
        const response = await service.update(id, user);

        const updated = response.data;

        expect(updated.id).toBe(id);
        expect(updated.data.name).toBe(user.name);
        expect(updated.data.email).toBe(user.email);
    });

    it('Delete by id', async () => {
        const id = 1;
        const response = await service.delete(id);

        expect(response.status).toBe(200);
        expect(response.data).toEqual({});
    });
});
