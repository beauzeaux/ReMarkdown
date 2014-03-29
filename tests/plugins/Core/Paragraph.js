define([
    "intern!object",
    "intern/chai!assert",
    "../BasePluginTester"
], function (registerSuite, assert, PluginTester) {
    PluginTester.TestPlugin({
        name: "Paragraph",
        paths: ["Core/Paragraph/Paragraph"],
        blocks: [],
        spans: [],
        renderers: {
            "Paragraph": "<p>${content}</p>"
        }
    });
});
