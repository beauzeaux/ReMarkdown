requirejs.config({
    paths: {
        "dojo": "../bower_components/dojo",
        "text": "../bower_components/requirejs-text/text",
        "pegjs": "../lib/peg-0.8.0.min",
        "Core": "../plugins/Core",
        "TestPlugins": './TestPlugins',
        "order": './lib/order'
    },
    waitSeconds: 15,
    shim: {
        'pegjs': {
            exports: 'PEG'
        },
    },
});
var tests = [
    './PluginLoader/test',
    './ElementFactory/test',
    './plugins/Core/test',
    './ReMarkdownTests'
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