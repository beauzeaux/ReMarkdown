/**
 * Created by beauzeaux on 12/22/13.
 */
requirejs.config({
    paths: {
        headingRule: 'plugins/heading/headingRule.txt',
        headingPrelude: 'plugins/heading/headingPrelude.js',
        lowerHeadingRule: 'plugins/heading/lowerHeadingRule.txt'
    }
});

define(
    ['helpers', 'text!headingRule', 'text!headingPrelude', 'text!lowerHeadingRule'],
    function(helpers, headingRule, headingPrelude, lowerHeadingRule) {
        return {
            name: "Heading",
            SpanElements:[],
            BlockElements:[
                {
                    name: "Heading",
                    rule: headingRule
                }
            ],
            AdditionalElements:[lowerHeadingRule],
            prelude: "" +
                headingPrelude
        };
    });