

//This file directs next js to use routes.js for navigation
//when the app loads up. This file customizes next to do extra operations


const { createServer } = require('http');
const next = require('next');

//checks environment variable to see if next should run 
//in dev or production mode
const app = next({
	dev: process.env.NODE_ENV !== 'production'
});


const routes = require('./routes');
const handler = routes.getRequestHandler(app);

//set up the app and make it listen to a specific port
app.prepare().then(() => {
	createServer(handler).listen(3000, (err) => {
		if (err) throw err;
		console.log('Ready on localhost:3000');
	});
});