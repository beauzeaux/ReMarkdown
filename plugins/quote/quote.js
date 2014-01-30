/**
 * Created by beauzeaux on 12/22/13.
 */
requirejs.config({
    paths: {
        blockQuoteTemplate: 'plugins/quote/blockQuoteRule.pegjs',
        blockQuoteElement: 'plugins/quote/blockQuoteElement'
    }
});

define(
    ['text!blockQuoteTemplate', 'blockQuoteElement'],
    function(grammar, blockQuoteRenderer) {
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
                    'BlockQuote' : blockQuoteRenderer
                }
            ]
        };
    });