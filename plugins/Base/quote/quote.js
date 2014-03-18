define(
    ['text!Base/quote/blockQuoteRule.pegjs', 'Base/quote/blockQuoteElement'],
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