define([
    "intern!object",
    "intern/chai!assert",
    "../xml/parser",
    "xml/equal"
], function (registerSuite, assert, xmlParser, xmlEqual) {
    registerSuite({
        name: 'XML Compare',
        "Basics": function () {
            var a = xmlParser.parse("<p>Hi</p>");
            var b = xmlParser.parse("<p>Hi</p>");
            var c = xmlParser.parse("<b>Hi</b>");
            var d = xmlParser.parse("<p>bye</p>");
            var e = xmlParser.parse("<p>bye world</p>");
            var eq = new xmlEqual();
            assert(eq.areEqual(a, b), "node name equiv");
            assert(!eq.areEqual(a, c), "node name not equiv");
            assert(!eq.areEqual(a, d), "text not equiv");
        },
        "Spaces": function () {
            var a = xmlParser.parse("<p>Hi</p>");
            var b = xmlParser.parse("<p>\n    Hi\n</p>");
            var c = xmlParser.parse("<b>  Hi  </b>");
            var eq = new xmlEqual();
            assert(eq.areEqual(a, b), "node name equiv");
            assert(!eq.areEqual(a, c), "node name not equiv");
        },
        "OpenCloseOpenClose": function() {
            var a = xmlParser.parse('<a>Hi</a><b>Hi</b>');
            var b = xmlParser.parse('<a>Hi</a><b>Hi</b>');
            var c = xmlParser.parse('<a>Hi</a><b>Hello</b>');

            var eq = new xmlEqual();

            assert(eq.areEqual(a,b), "Same are the same");
            assert(!eq.areEqual(a,c), "Not equal are the same");
        }
    });
});
