define([
    "intern!object",
    "intern/chai!assert",
    "../../BasePluginTester",
    "dojo/text!./1_in.rm",
    "dojo/text!./1_out.html",
    "dojo/text!./2_in.rm",
    "dojo/text!./2_out.html",
    "dojo/text!./3_in.rm",
    "dojo/text!./3_out.html",
    "dojo/text!./4_in.rm",
    "dojo/text!./4_out.html",
    "dojo/text!./5_in.rm",
    "dojo/text!./5_out.html",
    "dojo/text!./6_in.rm",
    "dojo/text!./6_out.html"


], function (registerSuite, assert, PluginTester,
             test1in, test1out,
             test2in, test2out,
             test3in, test3out,
             test4in, test4out,
             test5in, test5out,
             test6in, test6out

    ){
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

    PluginTester.TestParse({
        name: "List",
        paths: ["Base/list/list", "Base/quote/quote"],
        tests:[
            [test1in, test1out],
            [test2in, test2out],
            [test3in, test3out],
            [test4in, test4out],
            [test5in, test5out],
            [test6in, test6out]
        ]
    });

});
