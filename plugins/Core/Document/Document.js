define(['./DocumentElement'],
    function (DocumentElement) {
        var manifest = {
            name: "Document",
            grammar: {
                preludes: [],
                blocks: [], //already defined in the template file
                spans: [],
                grammar: null, //grammar is defined in the template
            },
            renderers: {
                'Document': DocumentElement
            }
        };
        return manifest;
    });