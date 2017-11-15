var restify = require('restify');
var builder = require('botbuilder');
var chatbot = require('./chatbot');
const config = require('./config');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
  appId: config.get('appSubId'),
  appPassword: config.get('appSubKey')
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    chatbot.reply(session);
});



let intentKeys = {
  help: 'help',
  about: 'about'
}
