define(["dojo/_base/declare", "dojo/_base/lang", "dojo/when", "dojo/promise/all", './pegjs',
    "./ElementFactory", "./PluginLoader"],
    function (declare, lang, when, all, pegjs, ElementFactory, PluginLoader) {
        var ReMarkdown = declare(null, {
            _options: {
                /*
                 * The default list of plugins to use,
                 * this may need to change later if individuals want to
                 * remove one of the defaults
                 */
                pluginList: [
                    "Core/Core"
                ]
            },

            /*
             * The Underlying parser factory object
             * this can change on a platform-to-platform
             * basis based on the platform's capabilities
             */
            _parserFactory: null,

            /**
             * Create a ReMarkdown parser object
             * @param options
             */
            constructor: function (options) {
                //Merge the options
                lang.mixin(this._options, options);

                //Setup and run the plugin loader
                var pl = PluginLoader(this._options.pluginList);
                var grammar = pl.grammar();
                var renderers = pl.renderers();
                self = this;
                this._parserFactory =
                    all({grammar: grammar, renderers: renderers}).then(function (obj) {
                        //create the parserFactory closure
                        var ret = function (input, opts) {
                            var options = {
                                elementFactory: new ElementFactory(obj.renderers),
                                parser: self,
                                allowedStartRules: ["start", "Document", "Blocks", "Spans"]
                            };
                            lang.mixin(options, opts);
                            try {
                                var parser = pegjs.buildParser(obj.grammar, options);
                            } catch (ex) {
                                console.log("Failed to build parser??");
                                console.log(ex.message);
                                console.log(ex);
                            }
                            var promise = parser.parse(input, options);
                            return promise;
                        };
                        return ret;
                    });
            },

            /**
             * Asynchronously parse a block of remarkdown text.
             * @input the ReMarkdown text to parser
             * @options UNUSED
             * @return a Promise object that calls callbacks with one parameter,
             * the resulting xml document
             */
            parse: function (input, options) {
                //generate a new parser and start the parsing process
                return when(this._parserFactory,
                    function (factory) {
                        //resolve to a promise... weird but what the api calls for
                        return factory(input, options);
                    });
            },
        });
        return ReMarkdown;
    });