const express = require('express');
const cors = require('cors');
const PORT = require('./app/config/app').appPort;

const app = express();

app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type', 'Origin', 'Authorization'],
    'credentials': true,
    'origin': 'http://localhost:3000',
    'methods': 'GET, HEAD, PUT,POST,DELETE'
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/uploads'));

require("./app/routes/routes")(app);

const server = require('http').createServer(app);

const db = require('./app/models');

db.sequelize.sync({ force: false}).then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})


