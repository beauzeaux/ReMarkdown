/**
 * Created by beauzeaux on 12/21/13.
 */
define(
    ['helpers'],
    function (helpers) {
        return {
            name: "Code",
            SpanElements: [
                {
                    name: "InlineEquation",
                    rule: helpers.spanElementRule({
                        open: "$",
                        close: "$"
                    })
                }
            ],
            BlockElements: [],
            AdditionalElements: []
        };
    });