module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', '../s*/**/*.js']
    },
    jshint: {
      options: {
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    min: {
      dist: {
        src: 'js/src/*.js',
        dest: 'js/dist/all.min.js'
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint');

};