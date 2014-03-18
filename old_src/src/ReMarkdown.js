/**
 * Top level parser for the ReMarkdown syntax
 * This parser uses a worker pool (Singleton) to
 * parse documents.
 */
define(["../../lib/dojo-release-1.9.2-src/dojo/_base/declare", "dojo/_base/lang", "workPool"],
    function (declare, lang, workPool) {
        var ReMarkdown = declare(null, {
            _options: {

            },
            constructor: function (input, options) {
                //set the options
                lang.mixin(this._options, options);

                //parse the input (put the message on the workerpool stack

            },

        })
    }
)