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
      console.dir(response);
      session.send(session.message.text);
    }
  }

// i implemented eslint and convict. let me know when you come back
// -hussain
  luis_nlp.getLuisIntent(session.message.text,send_response);

};
