var util = require('util');
var qs = require('querystring');

var request = require('request');

var JSONFormatter = require('./lib/JSONFormatter');
var KVPFormatter = require('./lib/KVPFormatter');

function SplunkStorm(options) {
    this._apiKey = options.apiKey;
    this._projectId = options.projectId;
    this._apiUrl = util.format('https://%s/1/inputs/http', options.apiHostName);
    this._formatter = options.formatter === 'json' ?
        new JSONFormatter() :
        new KVPFormatter();
}

SplunkStorm.prototype.send = function (logMessage, sourceType, host, source, callback) {
    sourceType = sourceType || 'syslog';

    params = {
        'project': this._projectId,
        'sourcetype': sourceType
    };

    if (host) params['host'] = host;
    if (source) params['source'] = source;

    var queryString = qs.stringify(params);
    var url = this._apiUrl + '?' + queryString;

    if (typeof logMessage === 'object') {
        logMessage = this._formatter.format(logMessage);
    }

    var options = {
        maxSockets: 1,
        uri: url,
        method: 'POST',
        body: logMessage,
        headers: {
            Authorization: "Basic " + new Buffer(":" + this._apiKey).toString("base64")
        }
    };

    request(options, function (error) {
        callback(error);
    });
};

module.exports = SplunkStorm;