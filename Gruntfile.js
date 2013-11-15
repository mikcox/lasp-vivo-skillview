// Generated on 2013-04-03 using generator-webapp 0.1.5
'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

var gateway = require('gateway');
var phpGateway = function (dir) {
    return gateway(require('path').resolve(dir), {
        '.php': 'php-cgi'
    });
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // load all grunt tasks as we config, this skips initial call
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                files: [
                    '<%= yeoman.app %>/*.html',
                    '<%= yeoman.app %>/*.php',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,webp}'
                ],
                tasks: ['livereload']
            }
        },

        //to run two tasks at once, grunt module concurrent
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            continuous: {
                tasks: ["karma:unit_auto", "karma:e2e_auto"]
            }


        },
        karma: {
            //single run
            e2e: {
                configFile: 'test/config/karma-e2e.conf.js',
                autoWatch: false,
                singleRun: true
            },
            unit: {
                configFile: 'test/config/karma-unit.conf.js',
                autoWatch: false,
                singleRun: true
            },
            //continuous run
            e2e_auto: {
                configFile: 'test/config/karma-e2e.conf.js',
                autoWatch: true,
                singleRun: false
            },
            unit_auto: {
                configFile: 'test/config/karma-unit.conf.js',
                autoWatch: true,
                singleRun: false
            },
            midway: {
                configFile: 'test/config/karma-midway.conf.js',
                autoWatch: false,
                singleRun: true
            }
        },
        connect: {
            options: {
                port: 8000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            phpGateway('app'),
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'app')
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'dist')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        jshint: {
            scripts: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/scripts/controllers/*.js',
                    '<%= yeoman.app %>/scripts/filters/*.js',
                    '<%= yeoman.app %>/scripts/directives/*.js',
                    '<%= yeoman.app %>/scripts/button_actions/*.js',
                    '<%= yeoman.app %>/scripts/services/*.js',
                    //'<%= yeoman.app %>/scripts/{,*/}*.js'
//                '!<%= yeoman.app %>/scripts/vendor/*',
//                'test/spec/{,*/}*.js'
                ],
                options: {
                    jshintrc: '.jshintrc',
                    curly: true,
                    eqeqeq: true,
                    immed: true,
                    latedef: true,
                    newcap: true,
                    noarg: true,
                    sub: true,
                    undef: true,
                    boss: true,
                    eqnull: true,
                    unused: true,
                    browser: true,
                    strict: true,
                    jquery: true,
                    //ignores seems to not be working, need to just qualify what we want
                    ignores: [
                        '<%= yeoman.app %>/scripts/lib/*.js',
                        '<%= yeoman.app %>/scripts/app.js'
                    ]
                },
                globals: {
                    angular: true,
                    moment: true,
                    console: true,
                    define: true,
                    require: true
                }
            },

            tests: {
                src: [
                    '<%= yeoman.app %>/../test/e2e/*.js',
                    '<%= yeoman.app %>/../test/unit/*.js'
                ],
                options: {
                    jshintrc: '.jshintrc',
                    curly: true,
                    eqeqeq: true,
                    immed: true,
                    latedef: true,
                    newcap: true,
                    noarg: true,
                    sub: true,
                    undef: true,
                    boss: true,
                    eqnull: true,
                    unused: true,
                    browser: true,
                    strict: true,
                    jquery: true,
                    //ignores seems to not be working, need to just qualify what we want
                    ignores: [
                        '<%= yeoman.app %>/../tests/lib/**/*.js',
                        '<%= yeoman.app %>/../tests/config/*.js'
                    ]
                },
                globals: {
                    angular: true,
                    moment: true,
                    console: true,
                    define: true,
                    require: true
                }
            }
        },

        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        files: [
            {
                // rather than compiling multiple files here you should
                cwd: '<%= yeoman.app %>/scripts',
                ext: '.js'
            }
        ],

        test: {
            files: [
                {
                    expand: true,
                    cwd: '.tmp/spec'
                }
            ]
        },

        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: 'app/components',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
         dist: {}
         },*/

        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/main.js': [
                        '<%= yeoman.app %>/scripts/{,*/}*.js'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.{png,jpg,jpeg}',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                     // https://github.com/yeoman/grunt-usemin/issues/44
                     //collapseWhitespace: true,
                     collapseBooleanAttributes: true,
                     removeAttributeQuotes: true,
                     removeRedundantAttributes: true,
                     useShortDoctype: true,
                     removeEmptyAttributes: true,
                     removeOptionalTags: true*/
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        src: '*.html',
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,txt}',
                            '.htaccess'
                        ]
                    }
                ]
            }
        },
        bower: {
            all: {
                rjsConfig: '<%= yeoman.app %>/scripts/main.js'
            }
        }
    });

    grunt.renameTask('regarde', 'watch');

    //by using our watch module grunt server will watch for any changes and
    //apply automatically
    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'livereload-start',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });


    grunt.registerTask('testall', [
        'unit',
        'e2e'
    ]);

    grunt.registerTask('unit', [
        'clean:server',
        'karma:unit'
    ]);

    grunt.registerTask('e2e', [
        'clean:server',
        'livereload-start',
        'connect:livereload',
        'karma:e2e'
    ]);

    grunt.registerTask('continuous', [
        'clean:server',
        'livereload-start',
        'connect:livereload',
        "concurrent:continuous"
    ]);
//    still debating on benefit of midway tests
    grunt.registerTask('test:midway', [
        'clean:server',
        'livereload-start',
        'connect:livereload',
        'karma:midway'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'usemin'
    ]);

    grunt.registerTask('hint-tests', [
        'jshint:tests'
    ]);
    grunt.registerTask('hint-scripts', [
        'jshint:scripts'
    ]);
    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
