module.exports = app => {
    var router = require("express").Router();
    const { login, signup, editProfile, findUserById,verifyJWT } = require('../controllers/auth.controller');
    const { createTweet, getAllTweets, findTweetById } = require('../controllers/tweet.controller');
    const { tweetLike } = require('../controllers/likes.controller');
    const { tweetComment } = require(`../controllers/comment.controller`);

    router.post('/login', login);
    router.post('/signup', signup);
    router.get('/:userId',[verifyJWT], findUserById);
    router.post('/edit-profile',[verifyJWT], editProfile);
    router.post('/create-tweet',[verifyJWT], createTweet);
    router.get('/tweets/:userId',[verifyJWT], getAllTweets);
    router.get('/tweet/:id',[verifyJWT], findTweetById);
    router.post('/like',[verifyJWT], tweetLike);
    router.post('/comment',[verifyJWT], tweetComment)
    app.use('/', router);
};
