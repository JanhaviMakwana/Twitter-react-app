const dbConfig = require('../config/db.config');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tweet = require('./tweets.model')(sequelize, Sequelize);
db.comment = require('./comments.model')(sequelize, Sequelize);
db.user = require('./auth.model')(sequelize, Sequelize);
db.like = require('./likes.controller')(sequelize, Sequelize);


db.user.hasMany(db.tweet);
db.tweet.belongsTo(db.user, { constraints: true, onDelete: 'CASCADE' });

db.tweet.hasMany(db.like);
db.tweet.hasMany(db.comment);

db.like.belongsTo(db.tweet, { constraints: true, onDelete: 'CASCADE' });
db.comment.belongsTo(db.tweet, { constraints: true, onDelete: 'CASCADE' });

db.user.hasMany(db.like);
db.user.hasMany(db.comment);

db.like.belongsTo(db.user, { constraints: true, onDelete: 'CASCADE' });
db.comment.belongsTo(db.user, { constraints: true, onDelete: 'CASCADE' });

module.exports = db;