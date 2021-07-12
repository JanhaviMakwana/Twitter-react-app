const db = require('../models');
const User = db.user;
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/app');
const Op = db.Sequelize.Op;

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            "email": email
        });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (!(bcrypt.compare(password, user.password))) return res.status(401).json({ message: 'Incorrect password !' });

        const userWithToken = generateToken(user.get({ raw: true }));

        return res.send(userWithToken);
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
        const user = await User.create(req.body);

        const userWithToken = generateToken(user.get({ raw: true }));

        return res.send(userWithToken);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

exports.editProfile = async (req, res) => {

    const { userId } = req.params;
    const { username, name } = req.body;

    const user = await User.findByPk(userId);
    if (user) {
        try {
            const updatedUser = await user.update({ username: username, name: name });
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

exports.uploadProfileImage = async (req, res) => {
    const { userId } = req.params;
    if (req.file) {
        const updatedUser = await User.update({ profileImageUrl: req.file.filename }, { where: { id: userId } });
        if (updatedUser) {
            return res.send({message: 'successfully updated user profile...'});
        } else {
            return res.status(404).json({ message: 'Tweet not found' });
        }
    }
    return res.status(500).json('No image uploaded')
};

exports.getUserProfile = async (req, res) => {
    try {
        res.send(req.user);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const generateToken = (user) => {
    delete user.password;

    const token = jwt.sign(user, config.appKey, { expiresIn: '86400' });

    return { ...{ user }, ...{ token } }
};


