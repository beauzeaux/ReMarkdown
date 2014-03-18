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