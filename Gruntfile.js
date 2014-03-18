module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-qunit-junit');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        qunit: {
            all: {
                options: {
                    urls: [
                        'http://localhost:8002/test/all.html'
                    ],
                    timeout: 10000
                }
            },
        },
        connect: {
            server: {
                options: {
                    port: 8002,
                    base: '.'
                }
            }
        },
    });
    grunt.registerTask('test', ['connect', 'qunit']);
}