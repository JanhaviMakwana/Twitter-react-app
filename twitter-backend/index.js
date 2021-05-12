const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'origin': 'http://localhost:3000',
    'methods': 'GET, HEAD, PUT,POST,DELETE'
}));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const server = require('http').createServer(app);

require("./app/routes/routes")(app);

const db = require('./app/models');

db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
})

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Twitttter" });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});