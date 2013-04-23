/*
 * Bart van der Schoor
 * Licensed under the MIT license.
 *
 * butchered from grunt-contrib-connect & livereload
 */

'use strict';

var url = require('url');
var path = require('path');

// reworked from grunt-livereload
var getSnippet = function (tinylrPort) {
	return [
		'<!-- livereload snippet -->',
		'<script>',
		'var js = document.createElement("script");',
		'js.src = "http://" + (location.host || "localhost").split(":")[0]+ ":' + tinylrPort + '/livereload.js?snipver=1";',
		'document.getElementsByTagName("head")[0].appendChild(js);',
		'</script>',
		''
	].join('\n');
};

//
// This function returns a connect middleware that will insert a snippet
// of JavaScript needed to connect to the livereload server
var getLiveReloadMiddleware = function (tinylrPort) {


	// code from grunt-livereload
	return function (req, res, next) {
		var write = res.write;

		var filepath = url.parse(req.url).pathname;
		filepath = filepath.slice(-1) === '/' ? filepath + 'index.html' : filepath;

		if (path.extname(filepath) !== '.html') {
			return next();
		}

		res.write = function (string, encoding) {
			var body = string instanceof Buffer ? string.toString() : string;

			body = body.replace(/<\/body>/, function (w) {
				return getSnippet(tinylrPort) + w;
			});

			if (string instanceof Buffer) {
				string = new Buffer(body);
			} else {
				string = body;
			}

			if (!this.headerSent) {
				this.setHeader('content-length', Buffer.byteLength(body));
				this._implicitHeader();
			}

			write.call(res, string, encoding);
		};

		next();
	};
};

module.exports = function (grunt) {

	var express = require('express');
	var tinylr = require('tiny-lr');
	var request = require('request');
	var util = require('util');

	//TODO keep map of servers? poll for servers?
	var tinylrPort = 35729;

	grunt.registerMultiTask('deserve', 'Start a dev server.', function () {

		// Merge task-specific options with these defaults.
		var options = this.options({
			port: 8000,
			hostname: 'localhost',
			base: '.',
			debug: false,
			dev: true,
			tinyport: tinylrPort,
			keepalive: false
		});

		// Connect requires the base path to be absolute.
		options.base = path.resolve(options.base);

		//grunt.log.writeln(util.inspect(options));

		var done = this.async();
		var setupApp = function () {
			var app = express();

			//app.set('view engine', 'jade');
			//app.set('views', __dirname + '/views');
			if (grunt.option('debug') || options.debug) {
				app.use(express.logger('debug'));
			}
			else if (options.dev) {
				app.use(express.logger('dev'));
			}
			//TODO merge dev api's services
			/*
			 app.use(express.cookieParser());
			 app.use(express.bodyParser());
			 app.use(express.query());
			 app.use(express.methodOverride());*/
			app.use(getLiveReloadMiddleware(options.tinyport));
			app.use(express.static(options.base));
			//app.use(app.router);

			grunt.log.writeln('Starting webserver on %s:%s.', options.hostname, options.port);
			grunt.log.writeln('Serving files from %s', options.base);

			app.listen(options.port, options.hostname);

			app.on('error', function (err) {
				if (err.code === 'EADDRINUSE') {
					grunt.fatal('Port %d is already in use by another process.', options.port);
				} else {
					grunt.fatal(err);
				}
			});

			if (this.flags.keepalive || options.keepalive) {
				grunt.log.writeln('Waiting forever...');
			}
			else {
				done();
			}
		};

		//TODO add polling of port

		var that = this;
		var tinylrServer = tinylr();
		tinylrServer.listen(options.tinyport, function () {
			grunt.log.writeln('Started tiny-lr on %s:%d.', options.hostname, options.tinyport);
			setupApp.call(that);
		});
	});

	grunt.registerMultiTask('deserve_reload', 'Trigger reload on connected browsers', function () {
		var options = this.options({
			hostname: 'localhost',
			debug: true,
			tinyport: tinylrPort
		});
		var done = this.async();
		if (options.debug) {
			grunt.log.writeln('Reloading on %s:%s.', options.hostname, options.tinyport);
		}
		request.get('http://' + options.hostname + ':' + options.tinyport + '/changed', function (error, response, body) {
			if (error) {
				grunt.log.writeln('error! %s', error);
			}
			else {
				grunt.log.writeln('reloaded %s', response.statusCode);
			}
			if (options.debug && body) {
				grunt.log.writeln(body);
			}
			done();
		});
	});

};
