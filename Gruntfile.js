'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js',
        '!assets/js/scripts.min.js'
      ]
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'assets/css/main.min.css' : 'assets/scss/app.scss'
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'assets/js/scripts.min.js': [
            'assets/vendor/foundation/js/foundation/abide.js',
            'assets/vendor/foundation/js/foundation/accordian.js',
            'assets/vendor/foundation/js/foundation/alert.js',
            'assets/vendor/foundation/js/foundation/clearing.js',
            'assets/vendor/foundation/js/foundation/dropdown.js',
            'assets/vendor/foundation/js/foundation/framework.js',
            'assets/vendor/foundation/js/foundation/helpers.js',
            'assets/vendor/foundation/js/foundation/interchange.js',
            'assets/vendor/foundation/js/foundation/joyride.js',
            'assets/vendor/foundation/js/foundation/magellan.js',
            'assets/vendor/foundation/js/foundation/offcanvas.js',
            'assets/vendor/foundation/js/foundation/orbit.js',
            'assets/vendor/foundation/js/foundation/reveal.js',
            'assets/vendor/foundation/js/foundation/tab.js',
            'assets/vendor/foundation/js/foundation/tooltip.js',
            'assets/vendor/foundation/js/foundation/topbar.js',
            'assets/vendor/foundation/js/foundation.js',
            'assets/js/plugins/*.js',
            'assets/js/_*.js'
          ]
        },
        options: {
          // JS source map: to enable, uncomment the lines below and update sourceMappingURL based on your install
          // sourceMap: 'assets/js/scripts.min.js.map',
          // sourceMappingURL: '/app/themes/roots/assets/js/scripts.min.js.map'
        }
      }
    },
    version: {
      options: {
        file: 'lib/scripts.php',
        css: 'assets/css/main.min.css',
        cssHandle: 'roots_main',
        js: 'assets/js/scripts.min.js',
        jsHandle: 'roots_scripts'
      }
    },
    modernizr: {
      dist: {
        devFile: 'assets/vendor/modernizr/modernizr.js',
        outputFile: 'assets/js/vendor/modernizr.min.js',
        files: [
          ['assets/js/scripts.min.js'],
          ['assets/css/main.min.css']
        ],
        uglify: true,
        parseFiles: false
      }
    },
    watch: {
      sass: {
        files: [
          'assets/vendor/foundation/scss/normalize.scss',
          'assets/vendor/foundation/scss/foundation.scss',
          'assets/scss/*.scss'
        ],
        tasks: ['sass', 'version']
      },
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'uglify', 'version']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: false
        },
        files: [
          'assets/css/main.min.css',
          'assets/js/scripts.min.js',
          'templates/*.php',
          '*.php'
        ]
      }
    },
    clean: {
      dist: [
        'assets/css/main.min.css',
        'assets/js/scripts.min.js'
      ]
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-wp-version');
  grunt.loadNpmTasks('grunt-modernizr');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'sass',
    'uglify',
    'version'
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);
  grunt.registerTask('build', [
    'default',
    'modernizr'
  ]);

};
