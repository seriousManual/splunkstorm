var util = require('util');

var PATTERN_LINEBREAK_REPLACE = /[\r\n]+/g;
var PATTERN_WHITESPACE_REPLACE = /\s+/g;
var PATTERN_WHITESPACE_DETECT = /\s/;
var PATTERN_QUOTE = /"/g;

function KVPFormatter() {

}

KVPFormatter.prototype.format = function (parameters) {
    return Object.keys(parameters)
        .map(function (key) {
            var value = (parameters[key] + '')
                .replace(PATTERN_LINEBREAK_REPLACE, ' ')
                .replace(PATTERN_WHITESPACE_REPLACE, ' ')
                .replace(PATTERN_QUOTE, '\'')
                .trim();

            if (value.match(PATTERN_WHITESPACE_DETECT)) {
                value = util.format('"%s"', value);
            }

            if (!value) {
                value = '""';
            }

            return util.format('%s=%s', key, value);
        })
        .join(', ');
};

module.exports = KVPFormatter;