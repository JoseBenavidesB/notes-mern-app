
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        require: [true, 'Name is required']
    },
    email: {
        type: String,
        require: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        require: [true, 'Password is required'],
    },
    status: {
        type: Boolean,
        default: true
    }
});

//metodos que pueden sobrescribir, elimina password  __v de la respuesta json

UserSchema.methods.toJSON = function() {
    const { password, __v, ...userData } = this.toObject();
    return userData;
}

module.exports = model( 'Users', UserSchema );