define(
    ['dojo/text!./blockQuoteRule.pegjs', './blockQuoteElement'],
    function (grammar, blockQuoteRenderer) {
        return {
            name: "Quote",
            grammar: {
                prelude: [],
                blocks: ["BlockQuote"],
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