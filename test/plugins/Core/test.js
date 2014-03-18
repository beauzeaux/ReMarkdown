define(['dojo/when', 'ReMarkdown/PluginLoader/PluginLoader',
    'ReMarkdown/ElementFactory/ElementFactory', 'pegjs',
    'text!plugins/Core/ParagraphBasic.html', 'text!plugins/Core/BlocksBasic.html', 'text!plugins/Core/DocumentBasic.html',
    'text!plugins/Core/ParagraphAsync.html', 'text!plugins/Core/BlocksAsync.html'
],
    function (when, PluginLoader, ElementFactory, pegjs, BasicParagraph, BasicBlocks, BasicDocument, AsyncParagraph, AsyncBlocks) {
        asyncTest("Basic Loading: Core", 2, function () {
            var pl = new PluginLoader(['ReMarkdown/plugins/Core/Core']);
            var gPromise = pl.grammar();
            var pegTest = function (grammar) {
                try {
                    var peg = pegjs.buildParser(grammar, {output: "source"});
                } catch (err) {
                    console.log(err);
                    return false;
                }
                return true;
            };
            when(gPromise, function (grammar) {
                ok(true, "Plugin Loaded");
                ok(pegTest(grammar), "Resulting Grammar is valid");
                start();//make sure to get Qunit started again!
            });
        });
        asyncTest("Basic Rendering: Core", 4, function () {
            stop(3);
            var pl = new PluginLoader(['ReMarkdown/plugins/Core/Core']);
            var rPromise = pl.renderers();
            when(rPromise, function (renderers) {
                ok(true, "Plugin Loaded");
                var el = new ElementFactory(renderers);
                var pg = el.element('Paragraph', ['TEST']);
                when(pg, function (text) {
                    var a = text.replace(/\r/g, "");
                    var b = BasicParagraph.replace(/\r/g, "");
                    equal(a, b, "Paragraph renders correctly for basic text");
                    start();
                });
                var blks = el.element('Blocks', ['a', 'b', 'c']);
                when(blks, function (blocks) {
                    var a = blocks.replace(/\r/g, "");
                    var b = BasicBlocks.replace(/\r/g, "");
                    equal(a, b, "Blocks render correctly for basic text");
                    start();
                });
                var doc = el.element('Document', 'TEST');
                when(doc, function (result) {
                    var a = result.replace(/\r/g, "");
                    var b = BasicDocument.replace(/\r/g, "");
                    equal(a, b, "Document renders correctly for basic text");
                    start();
                });
                start();//make sure to get Qunit started again!
            });
        });

        asyncTest("Async Rendering: Core", 3, function () {
            stop(2);
            var pl = new PluginLoader(['ReMarkdown/plugins/Core/Core', 'plugins/async/async']);
            var rPromise = pl.renderers();
            when(rPromise, function (renderers) {
                ok(true, "Plugin Loaded");
                var el = new ElementFactory(renderers);
                var as = el.element('Async', 'TEST');
                var pg = el.element('Paragraph', ['TEST', as]);
                when(pg, function (text) {
                    var a = text.replace(/\r/g, "");
                    var b = AsyncParagraph.replace(/\r/g, "");
                    equal(a, b, "Paragraph renders correctly for basic text");
                    start();
                });
                var ea = el.element('Async', 'a');
                var eb = el.element('Async', 'b');
                var ec = el.element('Async', 'c');
                var blks = el.element('Blocks', [ea, eb, ec]);
                when(blks, function (blocks) {
                    var a = blocks.replace(/\r/g, "");
                    var b = AsyncBlocks.replace(/\r/g, "");
                    equal(a, b, "Blocks render correctly for basic text");
                    start();
                });
                start();//make sure to get Qunit started again!
            });
        })
    });

