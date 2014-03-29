define([
    "intern!object",
    "intern/chai!assert",
    "../BasePluginTester"
], function (registerSuite, assert, PluginTester) {;
    PluginTester.TestPlugin({
        name: "Quote",
        paths: ["Base/quote/quote"],
        blocks: ["BlockQuote"],
        spans: [],
        renderers: {
            "BlockQuote": '<div class="rmd-BlockQuote">${content}</div>'
        }
    });
});
