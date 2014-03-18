define(['dojo/when', 'ReMarkdown/PluginLoader/PluginLoader', 'ReMarkdown/ElementFactory/ElementFactory'],
    function (when, PluginLoader, ElementFactory) {
        asyncTest("Element Factory: basic plugin", 2, function () {
            var pl = new PluginLoader(['PluginTests/basic/basic']);
            var rPromise = pl.renderers();
            when(rPromise, function (renderers) {
                var ef = new ElementFactory(renderers);
                var ret = ef.element('Example', 'TEST');
                ok(true, "Element Factory Created Successfully");
                ok(ret == "EXAMPLE:TEST", "Basic Plugin Rendering okay");
                start();//restart Qunit
            });
        });
        asyncTest("Element Factory: async plugin", 2, function () {
            stop();//add dependency for another start
            var pl = new PluginLoader(['PluginTests/async/async']);
            var rPromise = pl.renderers();
            when(rPromise, function (renderers) {
                var ef = new ElementFactory(renderers);
                ok(true, "Element Factory Created Successfully");
                start();
                var ret = ef.element('Async', 'TEST');
                when(ret, function (text) {
                    ok(text == "ASYNCTEST:TEST", "Async Plugin Rendering okay");
                    start();
                });
            });
        });
    });
