'use strict';

module.exports = function(grunt) {
    //Load all grunt tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-sw-precache');

    grunt.initConfig({
        watch: {
            js: {
                files: ['app/js/app.js'],
                tasks: ['browserify', 'concat_css']
            }
        },
        browserify: {
            js: {
                src: 'app/js/*.js',
                dest: 'app/build/bundle.js'
            },
            css: {
                files: "app/less/*.less",
                tasks: ["less"]
            }
        },
        less: {
            // production config is also available
            development: {
                options: {
                    // Specifies directories to scan for @import directives when parsing.
                    // Default value is the directory of the source, which is probably what you want.
                    paths: ["public/stylesheets/"]
                },
                files: {
                    // compilation.css  :  source.less
                    "app/build/css/app.css": "app/less/app.less"
                }
            }
        },
        'sw-precache': {
            options: {
                baseDir: 'app/build/',
                cacheId: 'progressive-test-package',
                workerFileName: 'sw.js',
                verbose: true
            },
            'default': {
                staticFileGlobs: [
                    'app/css/**/*.css',
                    'app/*.html',
                    'font/**/*.{woff,ttf,svg,eot}',
                    'app/images/**/*.{gif,png,jpg}',
                    'app/build/*.js'
                ]
            },
            'develop': {
                staticFileGlobs: [
                    'font/**/*.{woff,ttf,svg,eot}'
                ]
            }
        },
        concat_css: {
            options: {
                // Task-specific options go here.
            },
            all: {
                src: ["app/css/*.css"],
                dest: "app/build/css/app.css"
            }
        }
    });

    //the default task running 'grunt' in console is 'watch'
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('copy', ['copy', 'browserify','sw-precache']);
};
