#!/usr/bin/env node
/**
 * Created by beauzeaux on 12/21/13.
 */
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
        parserTemplate: './parser_template.handlebars'
    },
    nodeRequire: require
});


var Elements = {
    SpanElements: new Array(),
    BlockElements: new Array(),
    AdditionalElements: new Array(),
    prelude: ""
};

var loadPluginList = function (pluginList, elements) {
    for (var i in pluginList) {
        var plugin = requirejs('./plugins/' + pluginList[i] + "/" + pluginList[i]);
        if (plugin.SpanElements)
            elements.SpanElements = elements.SpanElements.concat(plugin.SpanElements);
        if (plugin.BlockElements)
            elements.BlockElements = elements.BlockElements.concat(plugin.BlockElements);
        if (plugin.AdditionalElements)
            elements.AdditionalElements = elements.AdditionalElements.concat(plugin.AdditionalElements);
        if (plugin.prelude)
            elements.prelude = elements.prelude + plugin.prelude;
    }
    return elements;
};

var defaultPluginList = [
    'citation',
    'formatting',
    'image',
    'link',
    'list',
    'quote',
    'heading',
    'code',
    'equation'
];
var fs = require('fs');
var handlebars = require('handlebars');
var pegjs = require('pegjs');

var Elements = loadPluginList(defaultPluginList, Elements);
var template_text = requirejs('text!parserTemplate');
var template = handlebars.compile(template_text);
var output = template(Elements);
var parser;

try {
    parser = pegjs.buildParser(output, {trackLineAndColumn: true});
} catch (ex) {
    //ERRORS IN parser creation, used for debugging plugins
    //Pretty print the error message with helpers on finding the offending line
    var lines = output.split("\n");
    console.log(ex);
    var min = ex.line - 10;
    if (min < 0) min = 0;
    var max = ex.line + 10;
    if (max >= lines.length) max = lines.length
    for (var i = min; i < max; i++) {
        if (i == ex.line) {
            console.log("--");
            console.log(">" + lines[i]);
            console.log("--");
        } else {
            console.log(lines[i]);
        }
    }
    console.log(lines[ex.line]);
    return 1;
}

if (process.argv[2] == "-o") {
    console.log(output);
}
else if (process.argv[2] == "-t") {
    if (process.argv.length == 4) {
        tests = requirejs('./test');
        tests.test_func(parser, process.argv[3]);
        return;
    }
    tests = requirejs('./test');
    tests.test_func(parser, null);
}
else if (process.argv[2] != null) {
    var input = fs.readFileSync(process.argv[2], 'utf8');
    try {
        var output = parser.parse(input);
    } catch (ex) {
        console.log(ex);
        return -1;
    }
    console.log(JSON.stringify(output));
}
