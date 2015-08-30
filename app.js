//app.js

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

var http = require('http');
var url = require('url');

app.use(express.static(__dirname));

app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);

app.get('/sendSMS', function (request, response) {
	var queryData = url.parse(request.url, true).query;

	if (queryData.number) {

		var phoneNumber = queryData.number;
		console.log(phoneNumber);

		var accountSid = "AC221a5436cabf4e30ba3515c318ee4851";
		var authToken = "96082b6ec2806621e26f5482323381e8";

		var client = require('twilio')("AC221a5436cabf4e30ba3515c318ee4851", "96082b6ec2806621e26f5482323381e8");
		 
		client.sms.messages.create({
		    to:phoneNumber,
		    from:'+17028307755',
		    body:"Greg Attra's Twilio webapp reporting for duty!"
		}, function(error, message) {
		    if (!error) {
		        console.log('Success! The SID for this SMS message is:');
		        console.log(message.sid);
		 
		        console.log('Message sent on:');
		        console.log(message.dateCreated);
		    } else {
		        console.log('Oops! There was an error.');
		        console.log(error);
		    }
		});

	}
});

app.get('/', function(request, response) {
  response.render('index.html');
});


/*var server = http.createServer(sendSMSHandler);

server.listen();*/


app.listen(app.get('port'), function() {
  console.log('Node app is running on port whatever');
});




