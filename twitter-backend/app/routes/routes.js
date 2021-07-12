const express = require('express');
module.exports = app => {
    var router = require("express").Router();
    const { login, signup, editProfile, uploadProfileImage, getUserProfile } = require('../controllers/auth.controller');
    const { findTweetById, postTweet, getTweets, uploadImage, reTweet } = require('../controllers/tweet.controller');
    const { likeTweet } = require('../controllers/likes.controller');
    const { postComment } = require(`../controllers/comment.controller`);
    const { authenticate, getCurrentUser } = require('../middleware/auth');
    const { imageUpload } = require('../middleware/imageUpload');

    router.post('/login', login);
    router.post('/signup', signup);
    router.post('/post-tweet/:userId', [authenticate, getCurrentUser], postTweet);
    router.get('/get-tweets', [authenticate], getTweets);
    router.get('/like-tweet/:userId/:tweetId', [authenticate, getCurrentUser], likeTweet);
    router.post('/upload-profile-image/:userId', [authenticate, imageUpload], uploadProfileImage);
    router.post('/upload-image/:tweetId', [authenticate, imageUpload], uploadImage);
    router.get('/get-user/:userId', [authenticate, getCurrentUser], getUserProfile);
    router.post('/retweet/:userId', [authenticate, getCurrentUser], reTweet);
    router.get('/tweet/:tweetId', [authenticate], findTweetById);
    router.post('/post-comment/:userId/:tweetId', [authenticate, getCurrentUser], postComment);
    router.post('/edit-profile/:userId', [authenticate], editProfile);

    app.use('/', router);

};
