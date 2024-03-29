const Clarifai = require('clarifai');

// api key
const app = new Clarifai.App({
 apiKey: 'a0a70926e040489eafbb16b5509c97a8'
});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json("Error: cannot work with api"));
}

const handleImage = (req, res, db) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status.json('Error: unable to get entries'));
}

module.exports = {
	handleImage,
	handleApiCall
}