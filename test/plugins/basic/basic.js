define(['text!PluginTests/basic/basic.pegjs'],
    function (grammar) {
        var manifest = {
            name: "Basic",
            grammar: {
                preludes: [],
                blocks: [],
                spans: ["Basic"],
                grammar: grammar
            },
            renderers: {
                Example: function (values) {
                    return "EXAMPLE:" + values;
                }
            }
        };
        return manifest;
    });