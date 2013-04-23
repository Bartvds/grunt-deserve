'use strict';

var grunt = require('grunt');
var request = require('request');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.deserve = {
	setUp: function (done) {
		// setup here if necessary
		done();
	},
	default_options_content: function (test) {
		test.expect(4);

		var expected = grunt.file.read('test/fixtures/base_default/index.html');

		request.get('http://localhost:8000/test/fixtures/base_default/index.html', function (error, response, body) {
			test.ok(!error, 'should not receive an error.');
			test.ok(response, 'should receive an response.');
			test.equal(response.statusCode, 200, 'should have response status 200.');
			test.equal(body, expected, 'should return correct content.');

			test.done();
		});
	},
	default_options_reload: function (test) {
		test.expect(4);

		request.get('http://localhost:35729/changed', function (error, response, body) {
			test.ok(!error, 'should not receive an error.');
			test.ok(response, 'should receive an response.');
			test.equal(response.statusCode, 200, 'should have response status 200.');
			test.ok(body, 'should return some content');

			test.done();
		});
	},
	custom_options_content: function (test) {
		test.expect(4);

		var expected = grunt.file.read('test/fixtures/base_custom/index.html');

		request.get('http://127.0.0.1:8071/index.html', function (error, response, body) {
			test.ok(!error, 'should not receive an error.');
			test.ok(response, 'should receive an response.');
			test.equal(response.statusCode, 200, 'should have response status 200.');
			test.equal(body, expected, 'should return correct content.');

			test.done();
		});
	},
	custom_options_reload: function (test) {
		test.expect(4);
		//weak test.. need real ip?
		request.get('http://127.0.0.1:32198/changed', function (error, response, body) {
			test.ok(!error, 'should not receive an error.');
			test.ok(response, 'should receive an response.');
			test.equal(response.statusCode, 200, 'should have response status 200.');
			test.ok(body, 'should return some content');

			test.done();
		});
	}
};
