//enable enviroment variables
require("dotenv").config();

const Server = require("./models/server");


const app = new Server();

app.listen();

