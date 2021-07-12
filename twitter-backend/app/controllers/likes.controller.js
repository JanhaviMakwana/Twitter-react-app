const db = require('../models');
const Like = db.like;
const Tweet = db.tweet;
const Op = db.Sequelize.Op;


exports.likeTweet = async (req, res) => {
    const { tweetId } = req.params;
    try {
        const fetchedLike = await req.user.getLikes({ where: { tweetId: tweetId } });
        const fetchedTweet = await Tweet.findByPk(tweetId);
        if (fetchedLike.length === 0) { //like 
            const liked = await req.user.createLike({ tweetId: tweetId });
            fetchedTweet.totalLikes = fetchedTweet.totalLikes + 1;
            fetchedTweet.save();
            return res.send(liked);
        } else {        //unlike
            const unliked = await fetchedLike[0].destroy();
            fetchedTweet.totalLikes = fetchedTweet.totalLikes - 1;
            fetchedTweet.save();
            return res.send(unliked);
        }

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
