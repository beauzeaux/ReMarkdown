/**
 * Created by beauzeaux on 12/21/13.
 */
requirejs.config({
    paths: {
        imageGrammar: 'plugins/image/image.pegjs',
        imageRenderer: 'plugins/image/imgElement'
    }
})
define(
    ['text!imageGrammar', 'imageRenderer'],
    function (grammar, imageRenderer) {
        return {
            name: "Image",
            grammar: {
                prelude: [],
                blocks: [],
                spans: ["Image"],
                grammar: grammar
            },
            renderers: [
                {
                    'Image': imageRenderer
                }
            ]
        };
    });