define(['dojo/text!./async.pegjs', './asyncElement'],
    function (grammar, element) {
        var manifest = {
            name: "Async",
            grammar: {
                preludes: [],
                blocks: [],
                spans: ["Async"],
                grammar: grammar
            },
            renderers: {
                Async: element
            }
        };
        return manifest;
    });