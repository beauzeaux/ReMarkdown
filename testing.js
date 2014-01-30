var requirejs = require('requirejs');

requirejs.config({
    config: {
        baseUrl: __dirname, //let requirejs set its path relative to this file
        text: {
            env: 'node'
        }
    },
    paths: {
        helpers: 'lib/helpers/helpers',
        text: 'lib/require/text',
        parserTemplate: './parser_template.handlebars',
        dojo: 'lib/dojo-release-1.9.2-src/dojo'
    },
    nodeRequire: require
});

requirejs(['ParserFactory', 'html', 'text!tests/orderedlist.txt'],
function(ParserFactory, html, minify, test){
    var onLoaded = function(parserFactory) {
        console.log("Parser Ready");
        var parser = parserFactory.parser('Document');
        var result = parser.parse(test);
        console.log(html.prettyPrint(result, {indent_size:2}));
    }
    var plugins = ['example', 'quote', 'list'];
    var parserFactory = new ParserFactory(plugins);
    parserFactory.onLoad({callback:onLoaded});
})