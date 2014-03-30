define(["./SpansElement"],
    function (SpansRenderer) {
        var manifest = {
            name: "Spans",
            grammar: {
                preludes: [],
                blocks: [], //already defined in the template file
                spans: [],
                grammar: null, //grammar is defined in the template
            },
            renderers: {
                'Spans': SpansRenderer
            }
        };
        return manifest;
    });