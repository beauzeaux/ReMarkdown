requirejs.config({
    paths: {
        headingGrammar: 'plugins/heading/heading.pegjs',
        headingRenderer: 'plugins/heading/headingElement',
        headingPrelude: 'plugins/heading/headingPrelude.js'
    }
});

define(['text!headingGrammar', 'headingRenderer', 'text!headingPrelude'],
    function (grammar, headingRenderer, headingPrelude) {
        var manifest = {
            name: "Heading",
            grammar: {
                prelude: [headingPrelude],
                blocks: ["Heading"],
                spans: [],
                grammar: grammar
            },
            renderers: [
                {
                    Heading: headingRenderer
                }
            ]
        };
        return manifest;
    });