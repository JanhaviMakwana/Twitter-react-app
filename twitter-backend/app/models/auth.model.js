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
        profileImage: {
            type: Sequelize.STRING
        }
    });
    return User;
};
