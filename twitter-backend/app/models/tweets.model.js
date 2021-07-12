const moment = require('moment');
const appConfig = require('../config/app');

module.exports = (sequelize, Sequelize) => {
    const Tweet = sequelize.define("tweet", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: Sequelize.STRING
        },
        imageUrl: {
            type: Sequelize.STRING,
            defaultValue: '',
            get() {
                const image = this.getDataValue('imageUrl');
                return image ? `${appConfig.appUrl}:${appConfig.appPort}/${image}` : '';
            }
        },
        totalLikes: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        createdAt: {
            type: Sequelize.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
            }
        },
        updatedAt: {
            type: Sequelize.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss');
            }
        }
    });
    return Tweet;
};
