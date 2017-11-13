var restify = require('restify');
var builder = require('botbuilder');


// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
  appId: '801d74f2-392b-46fc-b0ba-2cea016423b2',
  appPassword: 'lgrrLVGK58=:uncVLW594;&'
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

console.log(intents.models.classA.status.unseen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});
