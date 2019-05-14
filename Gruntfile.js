/*
 * Copyright (c) 2017-2019 JSQL Sp. z.o.o. (Ltd, LLC) www.jsql.it
 * See LICENSE or https://jsql.it/public-packages-license
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
            prod: {
                src: [
                    'src/jsql-core.js',
                    'src/jsql-core-repo.js',
                    'src/jsql-core-tx.js',
                    'src/jsql-core-utils.js',
                    'src/jsql-core-export.js'
                ],
                dest: 'dist/jsql-core.js'
            },
            test: {
                src: [
                    'src/jsql-core.js',
                    'src/jsql-core-repo.js',
                    'src/jsql-core-tx.js',
                    'src/jsql-core-utils.js'
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
                        src: ['LICENSE.md', 'jsql-core.d.ts', 'package.json'],
                        dest: './dist'
                    }
                ]

            }

        },

        open : {
            browser : {
                path : 'test/index.html'
            },
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-open');

    grunt.registerTask('default', ['clean', 'concat:prod', 'uglify', 'copy']);
    grunt.registerTask('build-test', ['clean', 'concat:test', 'uglify', 'copy']);
    grunt.registerTask('open-mocha', ['open:browser']);


};
