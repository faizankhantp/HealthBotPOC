'use strict';

const path = require('path');
const convict = require('convict');

let conf = convict({
  env: {
    docs: 'Application development Environment',
    format: ['test', 'qa', 'dev', 'local', 'prod', 'production', 'staging'],
    default: 'local',
    env: 'NODE_ENV'
  },
 luisSubId: {
   docs: 'app id for luis',
   format: '*',
   default: ''
 },
 luisSubKey: {
   docs: 'app key for luis',
   format: '*',
   default: ''
 },

 appSubId: {
   docs: 'app id',
   format: '*',
   default: ''
 },
 appSubKey: {
   docs: 'app key',
   format: '*',
   default: ''
 }
});



// Get config according to current environment

let env = conf.get('env');



// Merge with default values (check convict module's npm page for precedence order)

conf.loadFile(path.resolve(__dirname + `/env/${env}.json`));



// Validate config

conf.validate({strict: true});



module.exports = conf;
