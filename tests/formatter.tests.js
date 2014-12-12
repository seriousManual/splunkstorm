var expect = require('chai').use(require('sinon-chai')).expect;

var JSONFormatter = require('../lib/JSONFormatter');
var KVPFormatter = require('../lib/KVPFormatter');

describe('formatter', function() {
    describe('KVP', function() {
        var f;

        before(function() {
            f = new KVPFormatter();
        });

        it('should format simple kvp', function() {
            expect(f.format({foo: 'bar', bax: 'baz'})).to.equal('foo=bar, bax=baz');
        });

        it('should remove linebreaks', function() {
            expect(f.format({a: 'b\n\nb'})).to.equal('a="b b"');
        });

        it('should remove whitespaces', function() {
            expect(f.format({a: 'b  b'})).to.equal('a="b b"');
        });

        it('should replace double quotes with single quotes', function() {
            expect(f.format({a: 'b"b'})).to.equal('a=b\'b');
        });

        it('should trim', function() {
            expect(f.format({a: ' b '})).to.equal('a=b');
        });

        it('should wrap in double quotes when whitespaces are present', function() {
            expect(f.format({a: 'b b'})).to.equal('a="b b"');
        });

        it('return an empty string', function() {
            expect(f.format({a: ''})).to.equal('a=""');
        });
    });

    describe('JSON', function() {
        var f;

        before(function() {
            f = new JSONFormatter();
        });

        it('should format', function() {
            expect(f.format({a: 'b'})).to.equal('{"a":"b"}');
        });
    });
});