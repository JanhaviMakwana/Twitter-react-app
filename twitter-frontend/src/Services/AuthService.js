import axios from '../axios';

class AuthService {
    login(data) {
        return axios.post("/login", data);
    }

    signup(data) {
        return axios.post("/signup", data);
    }

    editProfile(data) {
        return axios.post('/edit-profile', data);
    }

    getuser(userId) {
        console.log(userId);
        return axios.get(`/${userId}`);
    }

};

export default new AuthService();