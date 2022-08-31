
const User = require('../models/user')

//verify email exist?
const emailExist = async(email = '')=> {
        const existeEmail = await User.findOne( { email });
        //console.log(existeEmail);
        if ( existeEmail ) {
            throw new Error(`The email: ${ email } is already register on DB`)
        }
};

//verify user exist?
const userExist = async (id)=> {
    const existeUser = await User.findById(id);
    
    if ( !existeUser ) {
        /* return res.status(400).json({
            msg: 'EMAIL ALREADY EXISTS'
        }) */
        throw new Error(`The user with the id: ${ id } doesn't exists`)
    }};

module.exports = {
    emailExist,
    userExist,
}