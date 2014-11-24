var expect = require('chai').use(require('sinon-chai')).expect;
var proxyquire = require('proxyquire');
var sinon = require('sinon');

describe('splunkstorm', function() {
    var requestMock = sinon.spy(function(options, callback) {
        callback(requestMock._return.error, requestMock._return.result);
    });
    requestMock._return = {};

    var SplunkStorm = proxyquire('../index', { 'request': requestMock });
    var logger = new SplunkStorm({
        apiKey: 'fooApiKey',
        projectId: 'fooProjectId',
        apiHostName: 'fooApiHostName'
    });

    afterEach(function() {
        requestMock.reset();
        requestMock._return = {};
    });

    it('should call the API (no additional params)', function() {
        requestMock._return = {error: null, result: 'fooBar'};

        logger.send('foo', null, null, null, function(error) {
            expect(error).to.be.null;
        });

        expect(requestMock).to.be.calledOnce;
        expect(requestMock).to.be.calledWith({
            body: "foo",
            headers: { Authorization: "Basic OmZvb0FwaUtleQ==" },
            maxSockets: 1,
            method: "POST",
            uri: "https://fooApiHostName/1/inputs/http?project=fooProjectId&sourcetype=syslog"
        });
    });

    it('should call the API /w params (string as message)', function() {
        requestMock._return = {error: null, result: 'fooBar'};

        logger.send('foo', 'fooSourceType', 'fooHost', 'fooSource', function(error) {
            expect(error).to.be.null;
        });

        expect(requestMock).to.be.calledOnce;
        expect(requestMock).to.be.calledWith({
            body: "foo",
            headers: { Authorization: "Basic OmZvb0FwaUtleQ==" },
            maxSockets: 1,
            method: "POST",
            uri: "https://fooApiHostName/1/inputs/http?project=fooProjectId&sourcetype=fooSourceType&host=fooHost&source=fooSource"
        });
    });

    it('should call the API /w params (object as message)', function() {
        requestMock._return = {error: null, result: 'fooBar'};

        logger.send({foo: 'bar'}, 'fooSourceType', 'fooHost', 'fooSource', function(error) {
            expect(error).to.be.null;
        });

        expect(requestMock).to.be.calledOnce;
        expect(requestMock).to.be.calledWith({
            body: "{\"foo\":\"bar\"}",
            headers: { Authorization: "Basic OmZvb0FwaUtleQ==" },
            maxSockets: 1,
            method: "POST",
            uri: "https://fooApiHostName/1/inputs/http?project=fooProjectId&sourcetype=fooSourceType&host=fooHost&source=fooSource"
        });
    });

    it('should call the API /w error', function() {
        requestMock._return = {error: new Error('caboom!'), result: 'fooBar'};

        logger.send('foo', 'fooSourceType', 'fooHost', 'fooSource', function(error) {
            expect(error.message).to.equal('caboom!');
        });
    });
});