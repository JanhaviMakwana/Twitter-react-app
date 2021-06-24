const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type', 'Origin','X-Auth-Token', 'Authorization'],
    'origin': 'http://localhost:3000',
    'methods': 'GET, HEAD, PUT,POST,DELETE'
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const server = require('http').createServer(app);

require("./app/routes/routes")(app);

const db = require('./app/models');

db.sequelize.sync({ force: false     }).then(() => {
    console.log("Drop and re-sync db.");
})

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Twitttter" });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});