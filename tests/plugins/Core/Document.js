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
        name: 'Document',
        setup: function () {
            pl = new PluginLoader(["TestPlugins/TestPlugins", "Core/Document/Document"]);
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
                assert(manifest.grammar.blocks.indexOf("Document") == -1,
                    "Sets Paragraph Rule" + "\n" + manifest.grammar.blocks);
            });
        },
        "Element Renderers": function () {
            return pl.renderers().then(function (renderers) {
                assert('Document' in renderers, "Paragraph Renderer Registered");
            });
        },
        "Sync Rendering": function () {
            var dfd = this.async(10000, 1);
            efp.then(function (ef) {
                var sync = ef.element('Sync', 'Test');
                var pRes = ef.element('Document', sync);
                pRes.then(dfd.callback(function (result) {
                    var expected = "<!DOCTYPE html><html><head><title></title></head><body>Sync:Test</body></html>";
                    var a = dojoXML.parse(expected);
                    var b = dojoXML.parse(result);
                    var cmp = new xmlCmp();
                    assert.ok(cmp.areEqual(a, b), "Paragraph renders correctly");
                }));
            });
        },
        "Async Rendering": function () {
            var dfd = this.async(10000, 1);
            efp.then(function (ef) {
                var async = ef.element('Async', 'Test');
                var pRes = ef.element('Document', async);
                pRes.then(dfd.callback(function (result) {
                    var expected = "<!DOCTYPE html><html><head><title></title></head><body>Async:Test</body></html>";
                    var a = dojoXML.parse(expected);
                    var b = dojoXML.parse(result);
                    var cmp = new xmlCmp();
                    assert.ok(cmp.areEqual(a, b), "Paragraph renders correctly");
                }));
            });
        }
    });
});

