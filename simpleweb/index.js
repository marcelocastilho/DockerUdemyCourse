const express = require('express');
const redis = require('redis');
const process = require('process');


const app = express();
const client = redis.createClient({
	host:'redis-server', //this configuration came from the docker-compose	
	port: 6379
});
client.set('visits', 0);

app.get('/', (req, res) => {
	process.exit(99);
	client.get('visits', (err, visits) => {
		res.send('Numbr of visits is ' + visits);
		client.set('visits', parseInt(visits) + 1);
	});
});

app.listen(8081, () => {
	console.log('Listening at port 8081');	
});

