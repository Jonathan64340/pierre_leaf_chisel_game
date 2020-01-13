/**
 * @Author - Domingues Jonathan
 * @Date - 12/01/2020
 * @Game - Pierre / Feuille / Ciseaux
 */

// Imports modules
const dotenv = require('dotenv');
const express = require('express');
const router = require('./routes/routes');
const cookieParser = require('cookie-parser');

// Configuration
// Load defaut config (.env)
dotenv.config();

// Initialize app
const app = express();

// Initialize cookie
app.use(cookieParser());

// Define EJS for templating
app.set('view engine', 'EJS');
app.use(express.static('public'));

// Bind routes
app.use(router);

// Listen server
app.listen(process.env.PORT, function () { 
    console.log('Server is running on port : ' + process.env.PORT);
});