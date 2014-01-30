define(
    ['helpers'],
    function(helpers) {
    return {
        name: "Image",
        SpanElements:[
            {
                name: "Image",
                rule: "text: (text:ImageText\n" +
                      "        target:ImageTarget\n" +
                      "        {return [text, target]})"
            }
        ],
        BlockElements:[],
        AdditionalElements:[
            helpers.spanElement({
                name: "ImageTarget",
                open: "(",
                close: ")"
            }),
            helpers.spanElement({
                name: "ImageText",
                open: "![",
                close: "]"
            })
        ]
    };
});