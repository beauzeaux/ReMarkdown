define([
    "intern!object",
    "intern/chai!assert",
    "ReMarkdown/PluginLoader",
    "ReMarkdown/ElementFactory",
    "dojo/Deferred",
    "dojo/promise/all",
    "xml/parser",
    "xml/equal",
    "ReMarkdown/pegjs",
    "../BasePluginTester",
    "dojo/text!./1_in.rm",
    "dojo/text!./1_out.html",
    "dojo/text!./2_in.rm",
    "dojo/text!./2_out.html",
    //These are just to load the individual tests!
    "./Paragraph",
    "./Document",
    "./Blocks"
], function (registerSuite, assert, PluginLoader, ElementFactory,
             Deferred, all, dojoXML, xmlCmp, pegjs, PluginTester,
             test1in, test1out, test2in, test2out
    ) {
    registerSuite({
        name: 'Core Plugins',
        setup: function () {
            pl = new PluginLoader(["TestPlugins/TestPlugins", "Core/Core"]);
            efp = pl.renderers().then(function (renderers) {
                return new ElementFactory(renderers);
            });
        },
        "Creation": function () {
            assert(pl != null, "New Creates a non-null plugin loader");
        },
        "Valid Grammar": function () {
            var dfd = this.async(100000);
            parser = pl.grammar();
            parser.then(function (grammar) {
                var ret;
                //Don't crash the testing suite with thrown errors
                try {
                    ret = pegjs.buildParser(grammar);
                    return ret;
                } catch (ex) {
                    ret = null;
                    return ret;
                }
            });
            parser.then(dfd.callback(function (parser) {
                    assert(parser != null, "Grammar is valid");
                }
            ));
        },
        "Plugin Manifest": function () {
            return pl.manifest().then(function (manifest) {
                assert(manifest.grammar.blocks.indexOf("Paragraph") == -1, "Overwrites Paragraph Rule");
                assert(manifest.grammar.spans.indexOf("Document") == -1, "Overwrites Document Rule");
                assert(manifest.grammar.spans.indexOf("Blocks") == -1, "Overwrites Blocks Rule");
            });
        },
        "Element Renderers": function () {
            return pl.renderers().then(function (renderers) {
                assert('Paragraph' in renderers, "Paragraph Renderer Registered");
                assert('Document' in renderers, "Document Renderer Registered");
                assert('Blocks' in renderers, "Blocks Renderer Registered");
            });
        }
    });
    PluginTester.TestParse({
        name: "Core",
        paths: ["Core/Core"],
        tests: [
            [test1in, test1out],
            [test2in, test2out]
        ]
    })
});
