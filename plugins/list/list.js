requirejs.config({
    paths: {
        grammar: 'plugins/list/listGrammar.pegjs',
        listItemRenderer: 'plugins/list/liElement',
        unorderedListRenderer: 'plugins/list/ulElement',
        orderedListRenderer: 'plugins/list/olElement'
    }
});

define(
    ["text!grammar", "listItemRenderer", "unorderedListRenderer", "orderedListRenderer"],
    function(grammar, listItemRenderer, unorderedListRenderer, orderedListRenderer) {
        return {
            name: "List",
            grammar: {
                prelude: [],
                blocks: ["UnorderedList", "OrderedList"],
                spans: [],
                grammar: grammar
            },
            renderers: [
                {
                    'ListItem' : listItemRenderer,
                    'UnorderedList': unorderedListRenderer,
                    'OrderedList' : orderedListRenderer
                }
            ]
        };
    });