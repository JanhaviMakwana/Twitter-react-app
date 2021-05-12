import axios from '../axios';

class TweetService {
    tweet(data) {
        console.log(data);
        return axios.post('/create-tweet', data);
    }

    getTweetById(id) {
        return axios.get(`/tweet/${id}`);
    }
    getLike(data) {
        return axios.post('/like', data);
    }

    postComment(data) {
        return axios.post('/comment', data);
    }

    getTweets(userId) {
        return axios.get(`/tweets/${userId}`);
    }
};

export default new TweetService();