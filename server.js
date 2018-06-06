// SERVER

'use strict';

const    express = require('express');
const   mongoose = require('mongoose');
const bodyParser = require('body-parser');
const     morgan = require('morgan');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');
const blogPostRouter = require('./Routes/router');

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static('Public'));
app.use("/posts", blogPostRouter);
app.get("/", (req,res)=> {
	res.sendFile(__dirname + "/Views/index.html");
});

// catch-all
app.use('*', function (req, res) {
	res.status(404).json({ message: 'Hit the catch-all' });
});


let server;

// RUN
function runServer(databaseUrl, port=PORT) {

	return new Promise( (resolve, reject) => {
		// connect to DB
		mongoose.connect( databaseUrl, err => {
			if (err) {
				return reject(err);
			}

			// start server
			server = app.listen(port, () => {
				console.log(`BlogPosts is listening on port ${port}`);
				resolve();
			})
			.on('error', err => {
				mongoose.disconnect();
				reject(err);
			});// start server
		});// mongoose.connect
	});// new Promise
}//runServer


function closeServer() {
	return mongoose.disconnect().then( ()=> {
		return new Promise( (resolve,reject)=> {
			console.log("Closing Server");
			server.close( err=> {
				if (err) {
					return reject(err);
				}
				resolve();
			});// server.close
		});// new Promise
	})// mongoose.disconnect
}//closeServer


if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };

