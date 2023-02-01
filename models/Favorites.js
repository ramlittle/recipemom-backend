const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
    userID:String,
    recipe:{}
});

module.exports=mongoose.model('Favorite',FavoriteSchema);
