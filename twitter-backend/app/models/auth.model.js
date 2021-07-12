const moment = require('moment');
const appConfig = require('../config/app');
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        username: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        profileImageUrl: {
            type: Sequelize.STRING,
            defaultValue: '',
            get() {
                const image = this.getDataValue('profileImageUrl');
                console.log(image);
                return image ? `${appConfig.appUrl}:${appConfig.appPort}/user/${image}` : '';
            }
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
    return User;
};
