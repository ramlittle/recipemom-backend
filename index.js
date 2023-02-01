//DEPENDENCIES
const express = require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const server= express();
const port = 8080;
require('dotenv').config();
//MIDDLEWARES
server.use(morgan('dev'));
server.use(cors());
server.use(bodyParser.json());
server.use(helmet());

//ROUTES
// const RecipeRouter=require('./routes/recipes');
const UserRouter=require('./routes/users');
const FavoriteRouter=require('./routes/favorites');

//DEPRECATION WARNING SOLN
mongoose.set('strictQuery',false)

//DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true, useUnifiedTopology: true,
})

server.get('/',(request,response)=>{
    response.send('welcome to recipe API')
})

//ENDPOINTS
// server.use('/api/recipes/v2',RecipeRouter)
server.use('/api/v1/users', UserRouter );
server.use('/api/v1/favorites', FavoriteRouter );

// server.listen(port,()=>{
//     console.log(`server running on port ${port}`)
// })

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT }`);
})
