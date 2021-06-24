import axios from '../axios';

const AuthService = {
    login: (data) => {
        return axios.post("/login", data)
            .then(({ data }) => {
                setHeaderAndStorage(data);
                return data;
            })
            .catch(err => {
                console.log("Auth service err", err);
                throw err
            });

    },

    signup: (data) => {
        return axios.post("/signup", data)
            .then(({ data }) => {
                setHeaderAndStorage(data);
                return data;
            })
            .catch(err => {
                console.log("Auth service err", err);
                throw err
            });
    },

    editProfile: (data) => {
        return axios.post('/edit-profile', data);
    }
};

const setHeaderAndStorage = ({ user, token }) => {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
}

export default AuthService;