'use strict';

var request = require('request');
var querystring = require('querystring');
const config = require('../../config');


module.exports.getLuisIntent = function(utterance,send_response) {
    var endpoint =
        "https://westcentralus.api.cognitive.microsoft.com/luis/v2.0/apps/";

    // Set the LUIS_APP_ID environment variable
    // to df67dcdb-c37d-46af-88e1-8b97951ca1c2, which is the ID
    // of a public sample application.
    var luisAppId = config.get('luisSubId');

    // Set the LUIS_SUBSCRIPTION_KEY environment variable
    // to the value of your Cognitive Services subscription key
    var queryParams = {
        "subscription-key": config.get('luisSubKey') || ,
        "timezoneOffset": "0",
        "verbose":  true,
        "q": utterance
    }

    var luisRequest = endpoint + luisAppId + '?' + querystring.stringify(queryParams);

    request(luisRequest, function (err, response, body) {
            if (err)
                send_response(err,true);
            else {
                var data = JSON.parse(body);
                send_response(data,false);
            }
        });
}

//module.exports.processedText = function (text) {
//  getLuisIntent(text);
//};
