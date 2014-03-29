define([
    "intern!object",
    "intern/chai!assert",
    "ReMarkdown/PluginLoader",
    "ReMarkdown/ElementFactory",
    "dojo/Deferred",
    "dojo/promise/all",
    "xml/parser",
    "xml/equal",
    "ReMarkdown/pegjs"
], function (registerSuite, assert, PluginLoader, ElementFactory, Deferred, all, dojoXML, xmlCmp, pegjs) {
    registerSuite({
        name: 'Blocks',
        setup: function () {
            pl = new PluginLoader(["TestPlugins/TestPlugins", "Core/Blocks/Blocks"]);
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
                assert(manifest.grammar.blocks.indexOf("Blocks") == -1,
                    "Sets Paragraph Rule" + "\n" + manifest.grammar.blocks);
            });
        },
        "Element Renderers": function () {
            return pl.renderers().then(function (renderers) {
                assert('Blocks' in renderers, "Blocks Renderer Registered");
            });
        },
        "Sync Rendering": function () {
            var dfd = this.async(10000, 1);
            efp.then(function (ef) {
                var sync = ef.element('Sync', 'Test');
                var pRes = ef.element('Blocks', [sync]);
                pRes.then(dfd.callback(function (result) {
                    var expected = "Sync:Test";
                    assert.ok(result === expected, "Blocks render correctly");
                }));
            });
        },
        "Async Rendering": function () {
            var dfd = this.async(10000, 1);
            efp.then(function (ef) {
                var async = ef.element('Async', 'Test');
                var pRes = ef.element('Blocks', [async]);
                pRes.then(dfd.callback(function (result) {
                    var expected = "Async:Test"
                    assert.ok(result === expected, "Blocks render correctly");
                }));
            });
        }
    });
});

