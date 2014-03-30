define([
    "intern!object",
    "intern/chai!assert",
    "ReMarkdown",
    "ReMarkdown/PluginLoader",
    "ReMarkdown/ElementFactory",
    "dojo/string",
    "dojo/Deferred",
    "dojo/promise/all",
    "xml/parser",
    "xml/equal",
    "ReMarkdown/pegjs",
    "dojo/text!./1_in.rm",
    "dojo/text!./1_out.html"
],
    function (registerSuite, assert, ReMarkdown, PluginLoader, ElementFactory, dojoString, Deferred, all, dojoXML, xmlCmp, pegjs, test1in, test1out) {
        registerSuite({
            name: 'PluginTest: Code',
            setup: function () {
                //TODO: move these to individual tests
                pl = new PluginLoader(["Base/code/code"]);
                efp = pl.renderers().then(function (renderers) {
                    return new ElementFactory(renderers);
                });
                RMparser = ReMarkdown({pluginList: ["Core/Core", "Base/code/code"]});
            },
            "Creation": function () {
                assert(pl != null, "New Creates a non-null plugin loader");
            },
            "Valid Grammar": function () {
                var dfd = this.async(10000);
                parser = pl.grammar().then(function (grammar) {
                    var ret;
                    //Don't crash the testing suite with thrown errors
                    try {
                        ret = pegjs.buildParser(grammar);
                    } catch (ex) {
                        ret = null;
                    }
                    return ret;
                });
                parser.then(dfd.callback(function (parser) {
                    assert(parser != null, "Grammar is valid");
                }));
            },
            "Overwrites Core": function () {
                return pl.manifest().then(function (manifest) {
                    assert(manifest.grammar.blocks.indexOf("Paragraph") == -1, "Overwrites Paragraph Rule");
                    assert(manifest.grammar.spans.indexOf("Document") == -1, "Overwrites Document Rule");
                    assert(manifest.grammar.spans.indexOf("Blocks") == -1, "Overwrites Blocks Rule");
                });
            },
            "Element Renderers": function () {
                return pl.renderers().then(function (renderers) {
                    ["blockCode"].map(function (key) {
                        assert(key in renderers, key + " is in renderers");
                    });
                });
            },
            "Block Elements": function () {
                return pl.manifest().then(function (manifest) {
                    ["blockCode"].map(function (block) {
                        assert(manifest.grammar.blocks.indexOf(block) > -1, block + " is in block defs");
                    });
                });
            },
            "Span Elements": function () {
                return pl.manifest().then(function (manifest) {
                    [].map(function (span) {
                        assert(manifest.grammar.spans.indexOf(span) > -1, span + " is in span defs");
                    });
                });
            },
            "Sync Render": function () {
                return efp.then(function(ef){
                    var ret = ef.element('blockCode', ['T','e','s','t']);
                    var a = dojoXML.parse('<code class="rmd-CodeBloc">Test</code>');
                    var b = dojoXML.parse(ret);
                    var cmp = new xmlCmp();
                    var ret = cmp.areEqual(a, b);
                    assert(ret, "Parse test");
                });
            },
            "Parsing": function () {
                dfd = this.async(10000, 1);
                [
                    [test1in, test1out]
                ].map(function (test) {
                        var promise = RMparser.parse(test[0]);
                        promise.then(dfd.resolve(function (result) {
                            var a = dojoXML.parse(test[1]);
                            var b = dojoXML.parse(result);
                            var cmp = new xmlCmp();
                            var ret = cmp.areEqual(a, b);
                            assert(ret, "Parse test");
                        }));
                    });
            }});
    });