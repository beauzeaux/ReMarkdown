define(
    ["dojo/text!./codeRules.pegjs","./blockCodeElement"],
    function (grammar, blockCodeElement) {
        return {
            name: "Code",
            grammar: {
                prelude: [],
                blocks: ["blockCode"],
                spans: [],
                grammar: grammar
            },
            renderers: [
                {
                    'blockCode': blockCodeElement
                }
            ]
        };
    });