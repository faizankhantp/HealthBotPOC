'use strict';

// Required functions
var luisNLP = require('./luis');
var intentsResponse = require('./intentsResponse');

// Chatbot intents - context


// Chatbot main function
module.exports.reply = function (session) {

  var send_response = function(response,isError){
    if(isError){
      console.log(response);
    }else{


      let resp = 'i am confused. dafa ho';
      let topScoringIntent = response.topScoringIntent;
      let intent = topScoringIntent.score > 0.1 ? topScoringIntent.intent : 'None';
      let context = session.privateConversationData.context || '';
      console.log('intent', intent, 'context', context);
      let responses = [];

      if (!intentsResponse.all[intent].contextNecessary) {
        if (context) {
          if(intentsResponse.all[intent].contextIn.indexOf(context)>-1){
            responses = intentsResponse.all[intent].reply[context].reply;
            if(intentsResponse.all[intent].reply[context].contextSet){
              session.privateConversationData.context = intentsResponse.all[intent].reply[context].contextSet;
            }
          }else{
            responses = intentsResponse.all.None.reply.default.reply;
          }

        }
        else {
          console.log('in else');
          responses = intentsResponse.all[intent].reply.default.reply;
          if(intentsResponse.all[intent].reply.default.contextSet){
            session.privateConversationData.context = intentsResponse.all[intent].reply.default.contextSet;
          }
        }

      }else{
        if(intentsResponse.all[intent].contextIn.indexOf(context)>-1){
          responses = intentsResponse.all[intent].reply[context].reply;
          if(intentsResponse.all[intent].reply[context].contextSet){
            session.privateConversationData.context = intentsResponse.all[intent].reply[context].contextSet;
          }
        }else{
          responses = intentsResponse.all.None.reply.default.reply;
        }
      }

      let randIndex = Math.floor(Math.random() * (responses.length)) ;
      resp = responses[randIndex];
      session.send(resp);
      // session.privateConversationData.context = 'a';
      // session.save();
      // console.log(intentsResponse);

    }
  }

  luisNLP.getLuisIntent(session.message.text,send_response);

};
