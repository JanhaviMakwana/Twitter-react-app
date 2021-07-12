const db = require('../models');
const Comment = db.comment;
const Tweet = db.tweet;

exports.postComment = async (req, res) => {
    const { tweetId } = req.params;
    const { desc } = req.body;

    try {
        const postedComment = await req.user.createComment({ description: desc, tweetId: tweetId });
        res.send(postedComment);

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

