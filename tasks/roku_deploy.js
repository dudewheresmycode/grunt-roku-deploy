/*
 * grunt-roku-deploy
 * https://github.com/dudewheresmycode/grunt-roku-deploy
 *
 * Copyright (c) 2019 Brian Robinson
 * Licensed under the MIT license.
 */

'use strict';
const url = require('url')
const fs = require('fs')
const request = require('request')

function random_id(){
  return Math.round(Math.random()*10e5).toString(16)  + "" + (new Date()).getTime().toString(16);
}
module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('roku_deploy', "Deploy to a Roku device", function(){
    // var options = this.options();
    var options = this.options({
      address: null,
      username: 'rokudev',
      password: null,
      version: grunt.config.get("pkg.version"),
      build_id: random_id()
    });

    if(options.address == null){
      grunt.log.errorlns("Missing `address` (Roku IP address).");
      return;
    }
    if(options.password == null){
      grunt.log.errorlns("Missing `password`.");
      return;
    }
    var addrs = url.format({
      host: options.address,
      protocol: 'http',
      pathname: 'plugin_install'
    });

    var zipFile = this.data.files.src;
    var done = this.async();
    grunt.log.writelns("Uploading: "+zipFile)
    // console.log(zipFile);
    var rokuOptions = {
      url: addrs,
      formData: {
        mysubmit: 'Replace',
        archive: fs.createReadStream(zipFile)
      }
    };
    request.post(rokuOptions, function(err, resp, body){
      // console.log(err, body);

      if (resp != undefined && resp.statusCode != undefined && resp.statusCode == 200) {
        if (resp.body.indexOf("Identical to previous version -- not replacing.") != -1){
          grunt.log.errorlns("Deploy cancelled by Roku: the package is identical to the package already on the Roku.");
        }else{
          grunt.log.oklns("Successfully deployed: "+zipFile);
        }
      }else{
        grunt.log.errorlns("Failed to deploy to " + options.address + "! see Roku device console output for details.")
        if( resp != undefined ){
          grunt.log.errorlns(resp.body);
        }
      }
      done();
    }).auth(options.username, options.password, false)
  });

};
