requirejs.config({
    paths: {
        citationRefRule: 'plugins/citation/citationRefRule.txt',
    }
});

define(
    ['helpers', 'text!citationRefRule'],
    function (helpers, citationRefRule) {
        return {
            name: "Citation",
            SpanElements: [
                {
                    name: "Citation",
                    rule: helpers.spanElementRule({
                        open: "(c ",
                        close: ")"
                    })
                }
            ],
            BlockElements: [
                {
                    name: "CitationRefRule",
                    rule: citationRefRule
                }
            ],
            AdditionalElements: []
        };
    });