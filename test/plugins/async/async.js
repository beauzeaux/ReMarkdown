define(['text!PluginTests/async/async.pegjs', 'PluginTests/async/asyncElement'],
    function (grammar, element) {
        var manifest = {
            name: "AsyncTester",
            grammar: {
                preludes: [],
                blocks: [],
                spans: ["AsyncTester"],
                grammar: grammar
            },
            renderers: {
                Async: element
            }
        };
        return manifest;
    });