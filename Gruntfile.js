/*
 * grunt-deserve
 * https://github.com/Bartvds/grunt-deserve
 *
 * Copyright (c) 2013 Bart van der Schoor
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc',
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},

		// Configuration to be run (and then tested).
		deserve: {
			default: {
			},
			custom: {
				options: {
					port: 8071,
					tinyport: 32198,
					hostname: '127.0.0.1',
					base: 'test/fixtures/base_custom'
				}
			},
			keepalive: {
				options: {
					keepalive: true,
					base: 'test/fixtures/base_custom'
				}
			}
		},
		deserve_reload: {
			default: {
			},
			custom: {
				options: {
					tinyport: 32198,
					hostname: '127.0.0.1'
				}
			}
		},
		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'deserve:default', 'deserve:custom', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

	grunt.registerTask('edit_01', ['deserve:keepalive']);
	grunt.registerTask('edit_02', ['deserve_reload:default']);

};
