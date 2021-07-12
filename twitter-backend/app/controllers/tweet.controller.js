const db = require('../models');
const fs = require('fs');
const Tweet = db.tweet;
const Like = db.like;
const Op = db.Sequelize.Op;


exports.postTweet = async (req, res) => {
    const { description } = req.body;
    if (description) {
        try {
            const postedTweet = await req.user.createTweet({ description });
            return res.send(postedTweet);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    } else {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }
};

exports.getTweets = async (req, res) => {
    try {
        const fetchedTweets = await Tweet.findAll({ include: ['likes', 'user'] });
        return res.send(fetchedTweets);

    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.uploadImage = async (req, res) => {
    const { tweetId } = req.params;
    if (req.file) {
        const tweet = await Tweet.update({ imageUrl: req.file.filename }, { where: { id: tweetId } });
        if (tweet) {
            return res.send(tweet)
        } else {
            return res.status(404).json({ message: 'Tweet not found' });
        }
    }
    return res.status(500).json('No image uploaded')
};

exports.reTweet = async (req, res) => {
    const data = req.body;
    try {
        const retweet = await req.user.createTweet(data);
        console.log(retweet);
        return res.send(retweet);

    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.findTweetById = async (req, res) => {

    const { tweetId } = req.params;

    if (tweetId) {
        try {
            const tweet = await Tweet.findByPk(tweetId);
            return res.send(tweet);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    } else {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
}