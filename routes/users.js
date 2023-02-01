const express = require('express');
const router = express.Router();
 //*Bcrypt
const bcrypt = require('bcrypt');

// Model
const User = require('../models/Users');


//signup
router.post('/signUp', async ( request, response ) => {
    try{
        const hashedPassword = await bcrypt.hash( request.body.password, 10 );
        const newUser = new User({
            ...request.body,
            password: hashedPassword
        });
  
    //check if user is already existing
        const checkEmail=await User.findOne({email:request.body.email});
        if(checkEmail!=null){
            return response.send({status: 'user already exists '})//put return so that when true, does not read next line
        }
        //adds new user if email is not yet existing
            newUser.save().then( result => {
                response.send({ status: "User has been created" });
            })
  
    }catch(error){
        response.status(500).send({status: 'server error'})
    }
  
 
});


// login
router.post('/login', ( request, response ) => {
    try{

        User.findOne({ email: request.body.email }).then( result => {
            bcrypt.compare( request.body.password, result.password, ( err, match ) => {
                if( match ){
                    // Autheticated, valid email and password
                    response.send({
                        status: "Valid crendentials",
                        id: result._id,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        email: result.email,
                        pictureLink: result.pictureLink
                    });
                }else{
                    response.send({
                        status: "Invalid credentials"
                    })
                }    
            });
        });
    }catch{
        response.status(500).send({status:'server error'})
    }

});
 
 
module.exports = router;
