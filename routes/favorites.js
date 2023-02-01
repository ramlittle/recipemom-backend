const express = require('express');
const router = express.Router();
 
// Model
const Favorite = require('../models/Favorites');
 
//routes

//Add Favorite
router.post('/addFavorite', ( request, response ) => {
    try{

        let addFavorite = new Favorite(
            {
                ...request.body,
            }
        );
        addFavorite.save().then( result => {
            response.send({ status: "Favorite Added" });
        });
    }catch(error){
            response.status(500).send({status: 'server error'})
    }
});

 //Remove from Favorite
router.delete('/:id', ( request, response ) => {
    try{

        Favorite.deleteOne({ _id: request.params.id })
        .then( result => {
            if( result.deletedCount === 1 ){
                response.send({
                    status: "Favorite has been removed"
                });
            }
        });
    }catch(error){
        response.status(500).send({status: 'server error'});
    }
  });
  
//Display all favorites
router.get('/', async (request, response)=>{
    try{
        const results = await Favorite.find({})
    .exec();
    response.send(results);
    }
    catch(error){
        response.status(500).send({status: ' server error'})
    }
});

module.exports = router;
