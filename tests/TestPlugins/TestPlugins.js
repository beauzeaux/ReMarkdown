define(["ReMarkdown/PluginLoader"],
    function (PluginLoader) {
        var plugins = [
            "TestPlugins/async/async",
            "TestPlugins/sync/sync"
        ];
        var pLoader = new PluginLoader(plugins);
        var promise = pLoader.manifest();
        return promise;
    });