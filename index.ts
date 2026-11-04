import ApiClient from "./ApiClient";
import UserService from "./UserService";

const service = new UserService(ApiClient.getInstance());

// Get all users
const response = await service.fetch();
console.log(response.data);

// Get user by id
const byId = await service.find(1);
console.log(byId.data);

// Creates a new user
const created = await service.create({name: 'John Doe', email: 'john.doe@test.com'});
console.log(created.data);

