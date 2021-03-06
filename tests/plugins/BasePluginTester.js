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
    "ReMarkdown/pegjs"
],
    function (registerSuite, assert, ReMarkdown, PluginLoader, ElementFactory, dojoString, Deferred, all, dojoXML, xmlCmp, pegjs) {
        /**
         * Tests a plugin or plugin collection against the basic sanity checks
         * @param def an object of the form
         * {
     *   name: STRING,
     *   paths: [STRING], //the loading path of the plugin (should be defined for the dojo loader)
     *   blocks: [STRING], //the block elements defined by the plugin
     *   spans: [STRING] //the span elements defined by the plugin
     * }
         * @constructor
         */
        var TestPlugin = function (def) {
            registerSuite({
                name: 'PluginTest: ' + def.name,
                setup: function () {
                    //TODO: move these to individual tests
                    pl = new PluginLoader(["TestPlugins/TestPlugins"].concat(def.paths));
                    efp = pl.renderers().then(function (renderers) {
                        return new ElementFactory(renderers);
                    });
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
                        Object.keys(def.renderers).map(function (key) {
                            assert(key in renderers, key + " is in renderers");
                        });
                    });
                },
                "Block Elements": function () {
                    return pl.manifest().then(function (manifest) {
                        def.blocks.map(function (block) {
                            assert(manifest.grammar.blocks.indexOf(block) > -1, block + " is in block defs");
                        });
                    });
                },
                "Span Elements": function () {
                    return pl.manifest().then(function (manifest) {
                        def.spans.map(function (span) {
                            assert(manifest.grammar.spans.indexOf(span) > -1, span + " is in span defs");
                        });
                    });
                },
                "Sync Render": function () {
                    var dfd = this.async(1000, def.renderers.length);
                    efp.then(function (ef) {
                        Object.keys(def.renderers).map(function(key) {
                            var sync = ef.element('Sync', 'Test');
                            var ret = ef.element(key, sync);
                            ret.then(dfd.callback(function (result) {
                                var expected = dojoString.substitute(def.renderers[key], {content: "Sync:Test"});
                                var a = dojoXML.parse(expected);
                                var b = dojoXML.parse(result);
                                var cmp = new xmlCmp();
                                var ret = cmp.areEqual(a, b);
                                assert(ret, def.name + ":" + key + " renders correctly\n" + result + "\n" + expected);
                            }));
                        });
                    });
                },
                "Async Render": function () {
                    var dfd = this.async(1000, def.renderers.length);
                    efp.then(function (ef) {
                        Object.keys(def.renderers).map(function(key) {
                            var sync = ef.element('Async', 'Test');
                            var ret = ef.element(key, sync);
                            ret.then(dfd.callback(function (result) {
                                var expected = dojoString.substitute(def.renderers[key], {content: "Async:Test"});
                                var a = dojoXML.parse(expected);
                                var b = dojoXML.parse(result);
                                var cmp = new xmlCmp();
                                var ret = cmp.areEqual(a, b);
                                assert(ret, def.name + ":" + key + " renders correctly\n" + result + "\n" + expected);
                            }));
                        });
                    });
                }
            });
        };

        var TestParse = function(def) {
            registerSuite({
                name: 'ParseTest: ' + def.name,
                setup: function () {
                    var pluginList = ["TestPlugins/TestPlugins"].concat(def.paths);
                    parser = new ReMarkdown({pluginList: pluginList});
                },
                "Parsing": function(){
                    dfd = this.async(10000, def.tests.length);
                    def.tests.map(function(test){
                        var promise = parser.parse(test[0]);
                        promise.then(dfd.callback(function(result){
                            var a = dojoXML.parse(test[1]);
                            var b = dojoXML.parse(result);
                            var cmp = new xmlCmp();
                            var ret = cmp.areEqual(a,b);
                            assert(ret, "Parse test");
                        }));
                    });
                }
            });
        };

        return {
            TestPlugin: TestPlugin,
            TestParse: TestParse
        }
    });
