import axios from '../axios';

const TweetService = {
    postTweet: (tweetData, userId) => {
        return axios.post(`/post-tweet/${userId}`, tweetData)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    },
    getAllTweets: () => {
        return axios.get('/get-tweets')
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    },
    likeTweet: (userId, tweetId) => {
        return axios.get(`/like-tweet/${userId}/${tweetId}`)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    },

    uploadTweetImage: (imageData, tweetId) => {
        return axios.post(`/upload-image/${tweetId}`, imageData)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    },
    retweet: (tweetData, userId) => {
        return axios.post(`/retweet/${userId}`, tweetData)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    },

    getTweetById: (tweetId) => {
        return axios.get(`/tweet/${tweetId}`)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    },
    postComment: (data, userId, tweetId) => {
        return axios.post(`/post-comment/${userId}/${tweetId}`, data)
            .then(({ data }) => {
                return data;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    }
};

export default TweetService;