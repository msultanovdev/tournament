import $api from "../http";

export default class UserService {
    fetchUsers() {
        return $api.get('/account');
    }
}