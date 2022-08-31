const mongoose = require('mongoose');

const dbConnection = async ()=>{

    try {

        await mongoose.connect( process.env.MONGODB_ATLAS);

        console.log('Database Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error in datbase');
    }

};


module.exports = {
    dbConnection,
}