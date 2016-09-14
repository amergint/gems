/**
 * Created by luis on 9/12/16.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true,
                ignore: "*.test.js",
                presets: ['es2015', 'stage-2']
            },
            dist: {
                files: {
                    // if the source file has an extension of es6 then
                    // we change the name of the source file accordingly.
                    // The result file's extension is always .js
                    "./dist/index.js": "./src/index.js"
                }
            }
        },
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify"]
                    ]
                },
                files: {
                    // if the source file has an extension of es6 then
                    // we change the name of the source file accordingly.
                    // The result file's extension is always .js
                    "./dist/bundle.js": ["./dist/testingBrowserify.js"]
                }
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'src',
                src: ['*','!*.test.js'],
                dest: 'dist/'
            }
        },
        clean: ["dist"],
        watch: {
            scripts: {
                files: ["./src/*.js"],
                tasks: ["babel", "browserify"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("build", ["babel", "copy", "browserify"]);
};