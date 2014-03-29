define([
    "intern!object",
    "intern/chai!assert",
    "../../BasePluginTester",
    "dojo/text!./1_in.rm",
    "dojo/text!./1_out.html",
    "dojo/text!./2_in.rm",
    "dojo/text!./2_out.html"
], function (registerSuite, assert, PluginTester,
             test1in, test1out, test2in, test2out
    ){
    PluginTester.TestPlugin({
        name: "Quote",
        paths: ["Base/quote/quote"],
        blocks: ["BlockQuote"],
        spans: [],
        renderers: {
            "BlockQuote": '<div class="rmd-BlockQuote">${content}</div>'
        }
    });
    PluginTester.TestParse({
        name: "Quote",
        paths: ["Base/quote/quote"],
        tests:[
            [test1in, test1out],
            [test2in, test2out]
        ]
    })
});
