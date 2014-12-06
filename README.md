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


## Example
````javascript
var SplunkStorm = require('splunkstorm');

var logger = new SplunkStorm({
    apiKey: 'you-api-key',
    projectId: 'your-project-id',
    apiHostName: 'your-api-host-name'
});

logger.send('foo=bar', null, null, null, function(error) {
    //error is null if everything went well
});

````

### Splunkstorm(options)
The constructor creates a SplunkStorm instance which is used to log to the backend.
It accepts a options hash consisting of:
* `apiKey`: your API Key which identifies your user account
* `projectId`: a SplunkStorm account is organized in projects which are used to categorize log messages
* `apiHostName`: the hostname assigned to you by SplunkStorm

### Splunkstorm#send(logMessage, sourceType, host, source, callback)
The `send` method is used to send acctual log messages and accepts five parameters:

* `message`: accepts strings and objects, if an object has been assigned it will automatically be json-stringified. Note that splunk recommends the usage of key-value pairs: http://dev.splunk.com/view/logging-best-practices/SP-CAAADP6
* `sourceType`: the source of the log message, defaults to syslog
* `host`: the hostname, optional
* `source`: specify a source, optional
* `callback`: called upon completion, the callback accepts an error parameter which is null if no error has appeard

## Used in
- **winston-splunkstorm** https://github.com/zaphod1984/winston-splunkstorm

Happy logging!
