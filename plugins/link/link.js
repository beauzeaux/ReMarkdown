/**
 * Created by beauzeaux on 12/21/13.
 */
define(
    ['helpers'],
    function(helpers) {
    return {
        name: "Link",
        SpanElements:[
            {
                name: "Link",
                rule: "text: (text:LinkText\n" +
                      "        target:LinkTarget\n" +
                      "        {return [text, target]})"
            }
        ],
        BlockElements:[],
        AdditionalElements:[
            helpers.spanElement({
                name: "LinkTarget",
                open: "(",
                close: ")"
            }),
            helpers.spanElement({
                name: "LinkText",
                open: "[",
                close: "]"
            })
        ]
    };
});