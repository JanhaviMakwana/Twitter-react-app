const db = require('../models');
const Comment = db.comment;
const Tweet = db.tweet;
const Op = db.Sequelize.Op;

exports.tweetComment = async (req, res) => {
    const { userId, tweetId, comment } = req.body;
    try {
        const tweet = await Tweet.findByPk(tweetId);
        let newComment = await Comment.create({
            userId: userId,
            tweetId: tweetId,
            comment: comment
        });
        return res.send(newComment);
    } catch (e) {
        res.status(500).json({ message: e.message });

    }
};