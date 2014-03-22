define(['text!./async.pegjs', './asyncElement'],
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