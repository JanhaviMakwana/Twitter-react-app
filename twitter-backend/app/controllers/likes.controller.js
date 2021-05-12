const db = require('../models');
const Like = db.like;
const Tweet = db.tweet;
const Op = db.Sequelize.Op;

exports.tweetLike = async (req, res) => {
    const { userId, tweetId } = req.body;
    try {
        const tweet = await Tweet.findByPk(tweetId);
        let liked = await Like.findOne({
            where: {
                [Op.and]: [
                    { tweetId: tweetId },
                    { userId: userId }
                ]
            }
        })
        if (!liked) {
            let newLike = await Like.create({
                userId: userId,
                tweetId: tweetId
            });
            return res.send(newLike);
        } else {
            Like.destroy({
                where: {
                    userId: userId,
                    tweetId: tweetId
                }
            }).then(num => {
                if (num == 1) {
                    res.send({
                        message: "Unliked successfully!"
                    });
                } else {
                    res.send({
                        message: `Error!`
                    });
                }
            }).catch(err => {
                res.status(500).send({
                    message: "Could not unlike"
                });
            });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

exports.getLike = async (req, res) => {
    const { userId, tweetId } = req.body;
    try {
        const response = await Like.findAll({ where: { userId: userId, tweetId: tweetId }, attributes: ['liked'] })
        res.send(response);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}