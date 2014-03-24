define([
    "intern!object",
    "intern/chai!assert",
    "xml/parser",
    "xml/equal"
], function (registerSuite, assert, xmlParser, xmlEqual) {
    registerSuite({
        name: 'XML Compare',
        "Basics": function () {
            var a = xmlParser.parse("<p>Hi</p>");
            var b = xmlParser.parse("<p>Hi</p>");
            var c = xmlParser.parse("<b>Hi</b>");
            var eq = new xmlEqual();
            assert(eq.areEqual(a, b), "node name equiv");
            assert(!eq.areEqual(a, c), "node name not equiv");
        },
        "Spaces": function () {
            var a = xmlParser.parse("<p>Hi</p>");
            var b = xmlParser.parse("<p>\n    Hi\n</p>");
            var c = xmlParser.parse("<b>  Hi  </b>");
            var eq = new xmlEqual();
            assert(eq.areEqual(a, b), "node name equiv");
            assert(!eq.areEqual(a, c), "node name not equiv");
        }
    });
});
