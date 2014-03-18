define(["pegjs"],
    function (pegjs) {
        TestUtils = {
            pegTest: function (grammar) {
                try {
                    var peg = pegjs.buildParser(grammar, {output: "parser"});
                } catch (err) {
                    console.log(err);
                    return false;
                }
                return true;
            },
        };
        return TestUtils;
    });
