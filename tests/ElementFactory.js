define([
    "intern!object",
    "intern/chai!assert",
    "dojo/Deferred",
    "ReMarkdown/PluginLoader",
    "ReMarkdown/ElementFactory"
], function (registerSuite, assert, Deferred, PluginLoader, ElementFactory) {
    registerSuite({
        name: 'Element Factory',
        setup: function () {
            pl = new PluginLoader(["TestPlugins/TestPlugins"]);
        },
        "Creation": function () {
            assert(pl != null, "New Creates a non-null object");
        },
        "Element Rendering (sync)": function () {
            return pl.renderers().then(function (renderers) {
                var ef = new ElementFactory(renderers);
                var ret = ef.element('Sync', 'Hello World');
                assert.strictEqual(ret, 'Sync:Hello World', 'Synchronus rendering');
            });
        },
        "Element Rendering (async)": function () {
            var dfd = new Deferred();
            var ret = pl.renderers().then(function (renderers) {
                var ef = new ElementFactory(renderers);
                var ret = ef.element('Async', 'Hello World');
                ret.then(function (value) {
                    assert.strictEqual(value, "Async:Hello World", "Async rendering");
                    dfd.resolve(true);
                });
            });
            return dfd.promise;
        }
    });
});
