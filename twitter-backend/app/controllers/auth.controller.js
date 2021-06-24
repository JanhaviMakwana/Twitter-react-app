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

exports.verifyJWT = (req, res, next) => {
    const token = req.headers['authorization'].split('Bearer ')[1];
    if (!token) {
        return res.status(400).json({message: 'Invalid user!'});
    }else{
        jwt.verify(token, config.appKey, (err, res) => {
            if(err){
                return res.status(400).json({
                    message: 'Invalid user!'
                })
            }
            next();
        })
    };
};

const generateToken = (user) => {
    delete user.password;

    const token = jwt.sign(user, config.appKey, { expiresIn: '86400' });

    return { ...{ user }, ...{ token } }
};


