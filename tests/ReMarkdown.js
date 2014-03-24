define([
    "intern!object",
    "intern/chai!assert",
    "ReMarkdown"
], function (registerSuite, assert, ReMarkdown) {
    var parser = new ReMarkdown();
    registerSuite({
        name: 'ReMarkdown Sanity Checks',
        create: function () {
            assert.notEqual(parser, null, "Constructor returns a valid object");
        }
    });
});
