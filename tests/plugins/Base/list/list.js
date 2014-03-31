define([
    "intern!object",
    "intern/chai!assert",
    "../../BasePluginTester",
], function (registerSuite, assert, PluginTester){
    PluginTester.TestPlugin({
        name: "List",
        paths: ["Base/list/list"],
        blocks: ["UnorderedList", "OrderedList"],
        spans: [],
        renderers: {
            "ListItem": '<li>${content}</li>',
            "UnorderedList" : '<ul>${content}</ul>',
            "OrderedList" : '<ol>${content}</ol>'
        }
    });
    /*
    PluginTester.TestParse({
        name: "Quote",
        paths: ["Base/list/list"],
        tests:[
            [test1in, test1out],
            [test2in, test2out]
        ]
    });
    */
});
