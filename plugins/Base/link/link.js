/**
 * Created by beauzeaux on 12/21/13.
 */
requirejs.config({
    paths: {
        linkgrammar: 'plugins/link/link.pegjs',
        linkRenderer: 'plugins/link/aElement'
    }
})
define(
    ['text!linkgrammar', 'linkRenderer'],
    function (grammar, linkRenderer) {
        return {
            name: "Link",
            grammar: {
                prelude: [],
                blocks: [],
                spans: ["Link"],
                grammar: grammar
            },
            renderers: [
                {
                    'Link': linkRenderer
                }
            ]
        };
    });