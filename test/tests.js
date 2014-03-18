/**
 * Created by Nicholas on 2/7/14.
 */
requirejs.config({
    paths: {
        "dojo": "../lib/dojo-release-1.9.2-src/dojo",
        "dojox": "../lib/dojo-release-1.9.2-src/dojox",
        Utils: '../Utils',
        text: '../lib/require/text',
        order: '../lib/require/order',
        pegjs: '../lib/pegjs/peg-0.8.0',
        'ReMarkdown': '../',
        "PluginTests": './plugins',
        'Base': '../plugins/Base'
    },
    waitSeconds: 15,
    shim: {
        'pegjs': {
            exports: 'PEG'
        },
    },
    packages: [
        {
            name: 'basic',
            location: 'plugins/basic',
            main: 'basic.js'
        },
    ],
});
var tests = [
    //'rjs'
    'PluginLoader/test',
    'ElementFactory/test',
    'plugins/Core/test',
    'ReMarkdownTests'
    //'plugins/Base/test'
    //'deferredtests',
    //'requiredefine'
];
var reqs = tests.map(function (req) {
    return "order!" + req
});
requirejs(reqs,
    function () {
        QUnit.config.testTimeout = 10000;
        QUnit.load();
        QUnit.start();
    });