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
            type: Sequelize.STRING
        }
    });
    return Tweet;
};
