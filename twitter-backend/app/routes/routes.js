module.exports = app => {
    var router = require("express").Router();
    const { login, signup, editProfile, findUserById } = require('../controllers/auth.controller');
    const { createTweet, getAllTweets, findTweetById } = require('../controllers/tweet.controller');
    const { tweetLike } = require('../controllers/likes.controller');
    const { tweetComment } = require(`../controllers/comment.controller`);
    const userFile = require('../middleware/upload');

    router.post('/login', login);
    router.post('/signup', signup);
    router.get('/:userId', findUserById);
    router.post('/edit-profile', editProfile);
    router.post('/create-tweet', createTweet);
    router.get('/tweets/:userId', getAllTweets);
    router.get('/tweet/:id', findTweetById);
    router.post('/like', tweetLike);
    router.post('/comment', tweetComment)
    app.use('/', router);
};
