# splunkstorm [![Build Status](https://travis-ci.org/zaphod1984/splunkstorm.png)](https://travis-ci.org/zaphod1984/splunkstorm)

[![NPM](https://nodei.co/npm/splunkstorm.png)](https://nodei.co/npm/splunkstorm/)

[![NPM](https://nodei.co/npm-dl/splunkstorm.png?months=3)](https://nodei.co/npm/splunkstorm/)

## Installation

````bash
$ npm i splunkstorm --save
````

## Usage

In order for the examples to work, you'll need a SplunkStorm account.
If you don't already have one, you can get one from http://www.splunkstorm.com

From your freshly set up account you'll need the SplunkStorm credentials the consist of your access token, your project Id and a API Hostname:

<p align="center">
  <img src="https://raw.github.com/zaphod1984/splunkstorm/master/img/credentials.png" width="350" />
</p>

````javascript
var SplunkStorm = require('splunkstorm');

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