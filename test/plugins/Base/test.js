define(['dojo/when', 'ReMarkdown/PluginLoader/PluginLoader', 'TestUtils',
    'plugins/Base/quote/test'],
    function (when, PluginLoader, TestUtils) {
        //do nothing just require loading the other plugins
        asyncTest("Basic Loading: Base", 2, function () {
            var pl = new PluginLoader(['ReMarkdown/plugins/Base/Base']);
            var gPromise = pl.grammar();
            when(gPromise, function (grammar) {
                ok(true, "Plugin Loaded");
                ok(TestUtils.pegTest(grammar), "Resulting Grammar is valid");
                start();//make sure to get Qunit started again!
            });
        });
        return null;
    });
