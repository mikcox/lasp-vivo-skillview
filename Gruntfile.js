// Generated on 2013-04-03 using generator-webapp 0.1.5
'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};
var gateway = require('gateway');
var phpGateway = function (dir) {
    return gateway(require('path').resolve(dir), { '.php': 'php-cgi' });
};
// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

// Plugin Registration & Task configuration
//-------------------------------------------------------------

module.exports = function (grunt) {
    // load all grunt tasks as we config, this skips initial load
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };
    grunt.initConfig({
        yeoman: yeomanConfig,
        //currently run $templateCache is not loaded prior to the config
        //file, so this is broken because the app always makes the ajax
        //request to /views before using $temlateCache (templateUrl)
        //This can be fixed if we make our partials directives
        ngtemplates: {
            skillsModule: {
                options: {
                    module: 'skillsModule'
                },
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                src: ['<%= yeoman.app %>/views/*.php'],
                dest: '<%= yeoman.app %>/scripts/skillsModuleTemplates.js'
            }
        },
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
        concurrent: {
            options: { logConcurrentOutput: true },
            continuous: {
                tasks: [
                    'karma:unit_auto',
                    'karma:e2e_auto'
                ]
            }
        },
        karma: {
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
                        return [mountFolder(connect, 'dist')];
                    }
                }
            }
        },
        open: { server: { path: 'http://localhost:<%= connect.options.port %>' } },
        clean: {
            dist: [
                '.tmp',
                '<%= yeoman.dist %>/*'
            ],
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
                    '<%= yeoman.app %>/scripts/services/*.js'
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
            server: { options: { debugInfo: true } }
        },

        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/app/scripts/main.js': [
                        '<%= yeoman.app %>/components/angular/angular.min.js',
                        '<%= yeoman.app %>/components/jquery/jquery.min.js',
                        '<%= yeoman.app %>/scripts/lib/*.js',
                        '<%= yeoman.app %>/scripts/app.js',
                        '<%= yeoman.app %>/scripts/controllers/*.js',
                        '<%= yeoman.app %>/scripts/filters/*.js',
                        '<%= yeoman.app %>/scripts/services/*.js',
                        '<%= yeoman.app %>/scripts/directives/*.js'
                    ]
                } } },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.php',
            options: { dest: '<%= yeoman.dist %>' }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.php'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: { dirs: ['<%= yeoman.dist %>'] }
        },
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.{png,jpg,jpeg}',
                        dest: '<%= yeoman.dist %>/app/images'
                    }
                ]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/app/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true

                },
                files: {
                    '<%= yeoman.app %>/../dist/app/index.php': '<%= yeoman.app %>/index.php',
                    '<%= yeoman.app %>/../dist/app/views/all-skills.php': '<%= yeoman.app %>/views/all-skills.php',
                    '<%= yeoman.app %>/../dist/app/views/map-a-skill.php': '<%= yeoman.app %>/views/map-a-skill.php'
                }
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
        bower: { all: { rjsConfig: '<%= yeoman.app %>/scripts/main.js' } }
    });
    grunt.renameTask('regarde', 'watch');
    //by using our watch module grunt server will watch for any changes and
    //apply automatically

    // Task registration, format = ('name', [task1:target, task2:target])
    //-------------------------------------------------------

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run([
                'build',
                'open',
                'connect:dist:keepalive'
            ]);
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
        'concurrent:continuous'
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
        'htmlmin:dist',
        //currently broken
        //'ngtemplates:skillsModule',
        //'concat',
        'cssmin',
        'uglify',
        'copy',
        'usemin'
    ]);
    grunt.registerTask('hint-tests', ['jshint:tests']);
    grunt.registerTask('hint-scripts', ['jshint:scripts']);
    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
    grunt.registerTask('templates', ['ngtemplates']);
};
