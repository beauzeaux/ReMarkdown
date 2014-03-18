define(
    ['text!blockQuoteTemplate'],
    function (grammar) {
        return {
            name: "Code",
            grammar: {
                prelude: [],
                blocks: ["CodeBlock"],
                spans: [],
                grammar: grammar
            },
            renderers: [
                {
                    'BlockQuote': blockQuoteRenderer
                }
            ]
        };
    });