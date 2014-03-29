define([
    "intern!object",
    "intern/chai!assert",
    "ReMarkdown",
    "xml/parser",
    "xml/equal"
], function (registerSuite, assert, ReMarkdown, dojoXML, xmlCmp) {
    registerSuite({
        name: 'ReMarkdown Parser',
        setup: function () {
            parser = ReMarkdown({pluginList: ["Core/Core"]});
        },
        "Creation": function () {
            assert.notEqual(parser, null, "Constructor returns a valid object");
        },
        "Core Parsing": function () {
            var dfd = this.async(10000);
            var test = "Hello World\n";
            var expected = "<!DOCTYPE html><html><head>" +
                "<title></title></head><body><p>Hello World</p></body></html>"
            var promise = parser.parse(test);
            promise.then(dfd.callback(function (result) {
                var a = dojoXML.parse(expected);
                var b = dojoXML.parse(result);
                var cmp = new xmlCmp();
                var ret = cmp.areEqual(a, b);
                assert(ret, "Paragraph parses correctly");
            }));
        }
    });
});
