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
            var dfd = this.async(10000);
            pl.renderers().then(function (renderers) {
                var ef = new ElementFactory(renderers);
                var ret = ef.element('Sync', 'Hello World');
                ret.then(dfd.callback(function(value){
                    assert.strictEqual(value, 'Sync:Hello World', 'Synchronus rendering');
                }));
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
