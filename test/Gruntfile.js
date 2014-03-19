module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-qunit-junit');
    grunt.loadNpmTasks('grunt-plato');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        qunit: {
            all: {
                options: {
                    urls: [
                        'http://localhost:8002/all.html'
                    ],
                    timeout: 10000
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8002,
                    base: '.',
                    hostname: '*'
                }
            }
        },
        plato: {
            ReMarkdown: {
                options: {
                    exclude: /^test\/lib\//
                },
                files: {
                    '_build/plato': ['test/**/*.js', 'PluginLoader/**/*.js', 'ElementFactory/**/*.js', 'ReMarkdown.js',
                        'Utils.js']
                }
            }
        }
    });
    grunt.registerTask('test', ['connect', 'qunit_junit', 'qunit']);
    grunt.registerTask('jenkins', ['test', 'plato']);
};