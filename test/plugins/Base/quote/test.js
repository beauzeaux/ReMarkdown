define(['dojo/when', 'ReMarkdown/PluginLoader/PluginLoader',
    'ReMarkdown/ElementFactory/ElementFactory', 'pegjs',
    'text!plugins/Base/quote/BasicQuote.html'
],
    function (when, PluginLoader, ElementFactory, pegjs, BasicQuote) {
        asyncTest("Quote: Basic", 2, function () {
            stop(1);
            var pl = new PluginLoader(['ReMarkdown/plugins/Base/Base']);
            var rPromise = pl.renderers();
            when(rPromise, function (renderers) {
                ok(true, "Plugin Loaded");
                var ef = new ElementFactory(renderers);
                var eq = ef.element('BlockQuote', ['TEST']);
                when(eq, function (text) {
                    var a = text.replace(/\r/g, "");
                    var b = BasicQuote.replace(/\r/g, "");
                    equal(a, b, "Quote renders for basic text");
                    start();
                });
                start();//make sure to get Qunit started again!
            });
        });

    });

