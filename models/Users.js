const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    pictureLink:String,
    favorites: [
        {type:mongoose.Schema.Types.ObjectId,ref:'Favorite'}
    ]
});

module.exports=mongoose.model('User',UserSchema);
