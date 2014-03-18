define(["ReMarkdown/plugins/Core/Blocks/BlockElements"],
    function (BlocksRenderer) {
        var manifest = {
            name: "Blocks",
            grammar: {
                preludes: [],
                blocks: [], //already defined in the template file
                spans: [],
                grammar: null, //grammar is defined in the template
            },
            renderers: {
                'Blocks': BlocksRenderer
            }
        };
        return manifest;
    });