define(['ReMarkdown/Plugins/Core/Paragraph/ParagraphElement'],
    function (ParagraphElement) {
        var manifest = {
            name: "Paragraph",
            grammar: {
                preludes: [],
                blocks: [], //already defined in the template file
                spans: [],
                grammar: null, //grammar is defined in the template
            },
            renderers: {
                Paragraph: ParagraphElement
            }
        };
        return manifest;
    });