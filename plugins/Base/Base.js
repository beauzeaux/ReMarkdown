define(["ReMarkdown/PluginLoader/PluginLoader"],
    function (PluginLoader) {
        var plugins = [
            "Base/quote/quote"
        ];
        var pLoader = new PluginLoader(plugins);
        var promise = pLoader.manifest();
        return promise;
    });
