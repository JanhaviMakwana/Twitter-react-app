import axios from '../axios';

const AuthService = {
    login: (authData) => {
        return axios.post("/login", authData)
            .then(({ data }) => {
                setHeaderAndStorage(data);
                return data.user;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });

    },

    signup: (authData) => {
        return axios.post("/signup", authData)
            .then(({ data }) => {
                setHeaderAndStorage(data);
                return data.user;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    },

    editProfile: (userId, profileData) => {
        return axios.post(`/edit-profile/${userId}`, profileData)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    },
    updateProfileImage: (userId, profileImageData) => {
        return axios.post(`/upload-profile-image/${userId}`, profileImageData)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    },
    getUserProfile: (userId) => {
        return axios.get(`/get-user/${userId}`)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    }
};

const setHeaderAndStorage = ({ user, token }) => {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
}

export default AuthService;