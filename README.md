Fork of the abondoned [splunkstorm](https://github.com/coccyx/splunkstorm) project.

# Splunk-Storm [![Build Status](https://travis-ci.org/zaphod1984/splunk-storm.png)](https://travis-ci.org/zaphod1984/splunk-storm)

[![NPM](https://nodei.co/npm/splunk-storm.png)](https://nodei.co/npm/splunk-storm/)

[![NPM](https://nodei.co/npm-dl/splunk-storm.png?months=3)](https://nodei.co/npm/splunk-storm/)

## Installation

````bash
$ npm i splunk-storm --save
````

## Usage

In order for the examples to work, you'll need a SplunkStorm account.
If you don't already have one, you can get one from http://www.splunkstorm.com

From your freshly set up account you'll need the SplunkStorm credentials the consist of your access token, your project Id and a API Hostname:

<p align="center">
  <img src="https://raw.github.com/zaphod1984/splunk-storm/master/img/credentials.png" width="250" />
</p>

````javascript
var SplunkStorm = require('splunk-storm');

var logger = new SplunkStorm({
    apiKey: 'you-api-key',
    projectId: 'project-id',
    apiHostName: 'api-host-name'
});

logger.send('foo=bar', null, null, null, function(error) {
    //error is null if everything went well
});

````

Happy logging!