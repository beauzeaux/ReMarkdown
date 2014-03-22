define(
    ["dojo/_base/declare"],
    function (declare) {
        var ElementFactory = declare(null, {
            _factories: null,
            element: function (type, value) {
                if (type in this._factories) {
                    return this._factories[type](value);
                }
                else {
                    console.error("[ReMarkdown][ElementFactory]Unknown Element Type: " + type);
                    return "Unknown Element Type: " + type;
                }
            },
            constructor: function (factories) {
                this._factories = factories;
            },
        });
        return ElementFactory;
    }
)
