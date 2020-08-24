const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'Cindy',
			email: 'cindy.phann@gmail.com',
			password: 'mama',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Erik',
			email: 'airwickmai@gmail.com',
			password: 'mama',
			entries: 0,
			joined: new Date()
		},
	],
	login: [
		{
			id: '987',
			hash: '',
			email: 'cindy.phann@gmail.com'
		}
	]
}

app.get('/', (req,res) => {
	res.send(database.users);
})

// post request for user sign in 
app.post('/signin', (req, res) => {

	if(req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
		res.json('Success: signing in');
	}
	else{
		res.status(400).json('Error: failed to log in');
	}
})


// post request for user registration 
app.post('/register', (req, res) => {
	
	const{email, name, password} = req.body;
	database.users.push({
		id: '125',
		name: name,
		email: email,
		entries: 0,
		joined: new Date()
	})

	res.json(database.users[database.users.length - 1]);
})


// get request for profile id
app.get('/profile/:id', (req, res) => {
	
	const {id} = req.params;
	let found = false;

	database.users.forEach(user => {
		if(user.id === id) {
			found = true;
			return res.json(user);
		}
	})

	if(!found){
		res.status(400).json('Error: user not found');
	}
})


// put request oto update image uploads
app.put('/image', (req, res) => {
	
	const {id} = req.body;
	let found = false;

	database.users.forEach(user => {
		if(user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	})

		if(!found){
		res.status(400).json('Error: user not found');
	}
})

/*bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});*/

app.listen(3000, () => {
	console.log('Success: app is running on port 3000');
})