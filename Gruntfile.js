/*
 * jsql-core
 *
 * Copyright (c) 2018 JSQL
 * Licensed under the ISC license.
 */

'use strict';

module.exports = function (grunt) {

    grunt.initConfig({

        clean: {
            files: ['dist']
        },

        concat: {
            options: {
                separator: ''
            },
            dist: {
                src: [
                    'src/jsql-core.js',
                    'src/jsql-core-repo.js',
                    'src/jsql-core-tx.js',
                    'src/jsql-core-utils.js',
                    'src/jsql-core-export.js'
                ],
                dest: 'dist/jsql-core.js'
            }
        },


        uglify: {
            options: {
                mangle: false
            },
            target: {
                files: {
                    'dist/jsql-core.min.js': ['dist/jsql-core.js'],
                    'dist/jsql-core.js': ['dist/jsql-core.js']
                }
            }
        },

        copy: {

            dist: {

                files: [
                    {
                        expand: true,
                        cwd: '.',
                        src: ['isc.md', 'jsql-core.d.ts', 'package.json'],
                        dest: './dist'
                    }
                ]

            }

        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'concat', 'uglify', 'copy']);

};
