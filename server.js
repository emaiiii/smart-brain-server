const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
var knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {
	res.send("Success: it is working");
})

// post request for user sign in 
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})


// post request for user registration 
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})


// get request for profile id
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})


// put request to update image uploads
app.put('/image', (req, res) => {image.handleImage(req, res, db)})

// post reqyest 
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


app.listen(process.env.PORT || 3000, () => {
	console.log(`Success: app is running on port ${process.env.PORT}`);
})