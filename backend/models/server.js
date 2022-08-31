const express = require("express");
const cors = require("cors");
const { dbConnection } = require('../database/config')



class Server {

    constructor () {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth    : '/api/v1/auth',
            notes   : '/api/v1/notes',
            user    : '/api/v1/user',
        }

        // Connect to DATABASE
        this.connectDB();


        //enable midlewares
        this.middlewares();


        //app routes
        this.routes();
    };

    //connect dabase
    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        //enable CORS
        this.app.use(cors()) 

        // parse and read body
        this.app.use( express.json() );

        //public directory
        this.app.use( express.static('public') );

    }

    routes () {
        this.app.use( this.paths.notes, require( '../routes/notes'));
        this.app.use( this.paths.user, require( '../routes/user'));
        this.app.use( this.paths.auth, require('../routes/auth'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Running on port", this.port);
        });
    }

}

module.exports = Server;