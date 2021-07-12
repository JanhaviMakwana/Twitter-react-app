const moment = require('moment');

module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        description: {
            type: Sequelize.STRING
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
    return Comment;
};