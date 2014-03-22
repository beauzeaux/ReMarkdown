define(['dojo/text!./sync.pegjs'],
    function (grammar) {
        var manifest = {
            name: "Sync",
            grammar: {
                preludes: [],
                blocks: [],
                spans: ["Sync"],
                grammar: grammar
            },
            renderers: {
                Sync: function (values) {
                    return "Sync:" + values;
                }
            }
        };
        return manifest;
    });