'use strict';

// Required functions
var luis_nlp = require('./luis');

// Chatbot intents - context


// Chatbot main function
module.exports.reply = function (session) {
  var send_response = function(response,isError){
    if(isError){
      console.log(response);
    }else{
      console.log(response);
      session.send(session.message.text);
    }
  }

  luis_nlp.getLuisIntent(session.message.text,send_response);

};
