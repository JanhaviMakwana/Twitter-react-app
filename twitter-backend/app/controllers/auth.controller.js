const db = require('../models');
const User = db.user;
const { validationResult } = require('express-validator');
const Op = db.Sequelize.Op;

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            "email": email
        });
        if (!user) return res.status(404).json({ message: 'User not found' });

        return res.send(user);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    };

    try {
        const user = await User.create(req.body)
        return res.send(user);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

exports.findUserById = async (req, res) => {

    const { userId } = req.params;
    if (userId) {
        try {
            const user = await User.findByPk(userId);
            return res.send(user);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    } else {
        res.status(400).send({
            message: 'Invalid userId!'
        })
    }
}

exports.editProfile = async (req, res) => {

    const { userId, username, imgurl, name } = req.body;

    const user = await User.findByPk(userId);
    if (user) {
        try {
            const updatedUser = await User.update({ username: username, profileImage: imgurl, name: name }, { where: { id: userId } });
            return res.send(updatedUser);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }

    } else {
        res.status(400).send({
            message: 'Invalid userId!'
        })
    }
};