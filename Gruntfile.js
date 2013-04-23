/*
 * grunt-deserve
 * https://github.com/Bartvds/grunt-deserve
 *
 * Copyright (c) 2013 Bart van der Schoor
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-deserve');

	// Project configuration.
	grunt.initConfig({
		deserve: {
			base: {
				options: {
					keepalive: true,
					base: 'files'
				}
			}
		},
		deserve_reload: {
			base: {}
		}
	});

	grunt.registerTask('default', ['deserve:base']);
	grunt.registerTask('reload', ['deserve_reload']);
	grunt.registerTask('edit_01', ['deserve:keepalive']);
	grunt.registerTask('edit_02', ['deserve_reload']);
};
