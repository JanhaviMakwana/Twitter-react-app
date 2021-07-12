const jwt = require('jsonwebtoken');
const appConfig = require('../config/app');
const db = require('../models');

exports.authenticate =  (req, res, next) => {
    const token = req.headers['authorization'].split('Bearer ')[1];
    if(!token) {
        return res.status(400).json({message: 'Access Denied ! Invalid User'});
    }else{
        jwt.verify(token, appConfig.appKey, (err, result) => {
            if(err) {
                return res.status(400).json({
                    message: 'Access Denied ! Invalid User'
                })
            }
            next();
        })
    };
};

exports.getCurrentUser = async (req, res, next) => {
    const {userId} = req.params;
    try{
        const user = await db.user.findByPk(userId);
        req.user = user;
        next();

    }catch (e) {
        return res.status(500).json({ message: e.message });
    }
};