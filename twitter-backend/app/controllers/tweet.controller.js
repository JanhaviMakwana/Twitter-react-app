const db = require('../models');
const fs = require('fs');
const Tweet = db.tweet;
const Like = db.like;
const Op = db.Sequelize.Op;

exports.createTweet = async (req, res) => {
    const { description } = req.body;
    if (description) {
        try {
            const postTweet = await Tweet.create(req.body)
            return res.send(postTweet);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    } else {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
}

exports.findTweetById = async (req, res) => {

    const { id } = req.params;

    if (id) {
        try {
            const tweet = await Tweet.findByPk(id);
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

exports.getAllTweets = async (req, res) => {

    const condition = req.params.userId ? req.params.userId : null;
    try {
        const tweets = await Tweet.findAll({ where: null, include: [{ model: db.user, as: 'user' }, { model: db.like, as: 'likes' }] });
        return res.send(tweets);
    } catch (err) {
        console.log("Error while finding tweets", err);
    };
}
