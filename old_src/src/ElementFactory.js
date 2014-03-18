define(
    ['../../lib/dojo-release-1.9.2-src/dojo/_base/declare',
        'dojo/_base/lang',
        './ParagraphElement'
    ],
    function (declare, lang, ParagraphElement) {
        var ElementFactory = declare(null, {
            _elements: null,
            constructor: function (elements) {
                this._elements = {
                    'Paragraph': ParagraphElement
                };
                this.addElements(elements);
            },

            addElements: function (elements) {
                lang.mixin(this._elements, elements);
            },

            //get the generator for a specific type of element
            element: function (type) {
                return this._elements[type];
            }
        });
        return (ElementFactory);
    }
);