define(
    ["dojo/text!./listGrammar.pegjs", "./liElement", "./ulElement", "./olElement"],
    function (grammar, listItemRenderer, unorderedListRenderer, orderedListRenderer) {
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
                    'ListItem': listItemRenderer,
                    'UnorderedList': unorderedListRenderer,
                    'OrderedList': orderedListRenderer
                }
            ]
        };
    });