 /* globals require */
 module.exports = function(grunt) {
     'use strict';
     require('load-grunt-tasks')(grunt);
     var saveLicense = require('uglify-save-license');
     grunt.initConfig({

         config: {
             path: {
                 src: {
                     root: 'app',
                     js: 'app/javascript',
                     scss: 'app/styles',
                     data: 'app/data',
                     bower_components: 'bower_components'
                 },
                 webapp: {
                     root: 'dist',
                     js: 'dist/js',
                     css: 'dist/css',
                     data: 'dist/data'
                 }
             },
             version: '0.0.1'
         },

         connect: {
             livereload: {
                 options: {
                     port: 9000,
                     // Change this to '0.0.0.0' to access the server from outside.
                     hostname: 'localhost',
                     livereload: 35729,
                     base: 'dist'
                 }
             }

             // livereload: {
             //     options: {
             //         open: true,
             //         middleware: function(connect) {
             //             return [
             //                 connect.static('<%= config.path.webapp.root %>')
             //             ];
             //         }
             //     }
             // }
         },

         clean: ['<%= config.path.webapp.root %>'],

         copy: {
             main: {
                 files: [{
                     expand: true,
                     cwd: 'app/data',
                     src: ['**/*'],
                     dest: 'dist/data'
                 }, {
                     expand: true,
                     cwd: 'app/',
                     src: ['*.html'],
                     dest: 'dist'
                 }]
             }
         },

         sass: {
             all: {
                 options: {
                              style: 'compressed',
                     trace: true
                 },
                 files: [{
                     expand: true,
                     cwd: '<%= config.path.src.scss %>',
                     src: [
                         '**/*.scss'
                     ],
                     dest: '<%= config.path.src.scss %>',
                     ext: '.min.css'
                 }]
             }
         },

         concat: {
             options: {
                 separator: ';'
             },
             basic: {
                 src: [
                     '<%= config.path.src.scss %>/screen.min.css'
                 ],
                 dest: '<%= config.path.webapp.css %>/screen.min.css'
             }
         },

         jshint: {
             files: ['<%= config.path.src.js %>/troutSpotrApp/*.js',
                 '<%= config.path.src.js %>/troutSpotrApp/configuration/**/*.js',
                 '<%= config.path.src.js %>/troutSpotrApp/api/**/*.js',
                 '<%= config.path.src.js %>/troutSpotrApp/ui/**/*.js'
             ],
             options: {
                 curly: true,
                 eqeqeq: false,
                 es3: true,
                 eqnull: true,
                 browser: true,
                 noyield: true,
                 globals: {
                     jQuery: true,
                     angular: true
                 }
             }
         },

         uglify: {
             dashboard_dev: {
                 files: {
                     '<%= config.path.webapp.js %>/troutSpotr.min.js': [
                         // '<%= config.path.src.js %>/bower_components/jquery/dist/jquery.min.js',
                         '<%= config.path.src.bower_components %>/angular/angular.min.js',
                         '<%= config.path.src.bower_components %>/angular-animate/angular-animate.min.js',
                         '<%= config.path.src.bower_components %>/lodash/lodash.min.js',
                         '<%= config.path.src.bower_components %>/d3/d3.min.js',
                         '<%= config.path.src.bower_components %>/topojson/topojson.js',

                         // Modules
                         '<%= config.path.src.js %>/troutSpotrApp/LibraryModule.js',
                         '<%= config.path.src.js %>/troutSpotrApp/ConfigurationModule.js',
                         '<%= config.path.src.js %>/troutSpotrApp/ApiModule.js',
                         '<%= config.path.src.js %>/troutSpotrApp/UiModule.js',
                         '<%= config.path.src.js %>/troutSpotrAppModule.js',

                         // Configuration
                         // '<%= config.path.src.js %>/troutSpotrApp/configuration/constants/EndpointDevConstants.js',

                         // Services
                         '<%= config.path.src.js %>/troutSpotrApp/library/**/*.js',
                         '<%= config.path.src.js %>/troutSpotrApp/api/**/*.js',
                         '<%= config.path.src.js %>/troutSpotrApp/ui/**/*.js',

                         // Templates - created by `grunt-angular-templates`
                         //   and found under ngtemplates.ConserviceDashboard.dest
                         '<%= ngtemplates.ui.dest %>'
                     ]
                 },
                 options: {
                     mangle: false,
                     compress: false,
                     beautify: true,
                     preserveComments: saveLicense
                 }
             }
         },

         watch: {
             grunt: {
                 files: ['Gruntfile.js'],
                 reload: true
             },

             sass: {
                 files: '<%= config.path.src.root %>/scss/**/*.scss',
                 tasks: ['sass', 'concat'],
                 options: {
                     atBegin: true
                 }
             },

             uglify: {
                 files: '<%= config.path.src.root %>/js/**/*.js',
                 tasks: ['uglify:dashboard_dev'],
                 options: {
                     atBegin: true
                 }
             },
             ngtemplates: {
                 files: '<%= config.path.src.js %>/troutSpotrApp/**/*.html',
                 tasks: ['ngtemplates'],
                 options: {
                     atBegin: true
                 }
             }
         },

         ngtemplates: {
             ui: {
                 src: '<%= config.path.src.js %>/troutSpotrApp/ui/**/*.html',
                 dest: '<%= config.path.src.js %>/templates.js'
             }
         }
     });

     grunt.registerTask('serve', 'Compile then start a connect web server', function() {
         grunt.task.run([
             'connect:livereload',
             'copy:main', 'sass', 'ngtemplates', 'concat', 'uglify:dashboard_dev', 'watch'
         ]);
     });


     grunt.registerTask('build', ['copy:main', 'jshint', 'sass', 'ngtemplates', 'concat', 'uglify:dashboard_dev']);
     grunt.registerTask('default', ['clean', 'copy:main', 'sass', 'ngtemplates', 'concat', 'uglify:dashboard_dev']);
 };