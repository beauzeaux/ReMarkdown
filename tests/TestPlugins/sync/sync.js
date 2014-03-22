define(['dojo/text!./basic.pegjs'],
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
                    return "TEST:" + values;
                }
            }
        };
        return manifest;
    });