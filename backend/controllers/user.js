
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const User = require('../models/user');

/* -----------get users -------------- */
const userGet = async (req , res) => {

    const users = await User.find({status:true});
    
    res.status(200).json({
        users
    });
};

/* -----------update user -------------- */
const userPut = async (req, res) => {
    
    const { id } = req.params;
    const { _id, password, google, email, ...others } = req.body;

    //validate db
    if ( password ) {
        //encrypt password
        const salt = bcryptjs.genSaltSync();
        others.password = bcryptjs.hashSync( password, salt);
    }

    const dbUser = await User.findByIdAndUpdate( id, others, { new: true } );

    res.status(201).json({
        dbUser
    })
};

/* -----------create user -------------- */
const userPost = async (req, res) => {
    
    const { name, email, password } = req.body;
    const user = new User( { name, email, password } );

    
    //encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);

    //save DB
    await user.save();

    //generate JWT
    const token = await generateJWT( user._id );

    res.status(201).json({ 
        _id: user._id,
        user,
        token
    });

};

/* -----------delete user -------------- */
const userDelete = async (req, res) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { status: false } );

    res.status(200).json(
        user
    ) 
};



module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
}