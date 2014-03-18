define(['dojo/when', 'ReMarkdown/PluginLoader/PluginLoader', 'TestUtils'],
    function (when, PluginLoader, TestUtils) {
        asyncTest("Plugin Loader: basic plugin", 2, function () {
            var pl = new PluginLoader(['PluginTests/basic/basic']);
            var gPromise = pl.grammar();
            when(gPromise, function (grammar) {
                ok(true, "Plugin Loaded Exited");
                ok(TestUtils.pegTest(grammar), "Resulting Grammar is valid");
                start();//make sure to get Qunit started again!
            });
        });
        asyncTest("Plugin Loader: async plugin", 2, function () {
            var pl = new PluginLoader(['PluginTests/async/async']);
            var gPromise = pl.grammar();
            when(gPromise, function (grammar) {
                ok(true, "Plugin Loaded Exited");
                ok(TestUtils.pegTest(grammar), "Resulting Grammar is valid");
                start();//make sure to get Qunit started again!
            });
        });
    });
