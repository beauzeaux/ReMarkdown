/**
 * Created by beauzeaux on 12/22/13.
 */
define(['helpers'],
    function (helpers) {
        return {
            name: "Formatting",
            SpanElements: [
                {
                    name: "Underline",
                    rule: helpers.spanElementRule({
                        open: "_",
                        close: "_"
                    })
                },
                {
                    name: "Bold",
                    rule: helpers.spanElementRule({
                        open: "=",
                        close: "="
                    })
                },
                {
                    name: "Italics",
                    rule: helpers.spanElementRule({
                        open: "*",
                        close: "*"
                    })
                }
            ],
            BlockElements:[],
            AdditionalElements:[]
        };
});
