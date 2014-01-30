define(['text!plugins/example/example.pegjs'],
function(grammar) {
    var manifest = {
        name: "Example",
        grammar: {
            prelude: [],
            blocks: [],
            spans: ["Example"],
            grammar: grammar
        },
        renderers: [
            {
                Example : function(values) {return "EXAMPLE:" + values;}
            }
        ]
    };
    return manifest;
});