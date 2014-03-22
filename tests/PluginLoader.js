define([
    "intern!object",
    "intern/chai!assert",
    "ReMarkdown/PluginLoader"
], function (registerSuite, assert, PluginLoader) {
    registerSuite({
        name: 'Plugin Loader',
        setup: function () {
            pl = new PluginLoader(["TestPlugins/TestPlugins"]);
        },
        "Creation": function () {
            assert(pl != null, "New Creates a non-null object");
        },
        "Plugin Loading": function () {
            return pl.manifest().then(function (manifest) {
                //console.log(manifest);
                assert(true, "Plugins Loaded");
                assert(manifest.grammar.spans.indexOf("Sync") > -1, "Synchronus Plugin Present");
                assert(manifest.grammar.spans.indexOf("Async") > -1, "Async Plugin Present");
            });
        }
    });
});
