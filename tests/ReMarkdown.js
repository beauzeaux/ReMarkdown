define([
    "intern!object",
    "intern/chai!assert",
    "ReMarkdown"
], function (registerSuite, assert, ReMarkdown) {
    var parser = new ReMarkdown();
    console.log(parser);
    registerSuite({
        name: 'ReMarkdown Sanity Checks',
        create: function () {
            assert.notEqual(parser, null, "Constructor returns a valid object");
        }
    });
});
