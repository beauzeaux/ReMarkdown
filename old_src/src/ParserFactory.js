define(
    ['../../lib/dojo-release-1.9.2-src/dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'pegjs', 'Remarkdown/src/PluginLoader', '/ElementFactory', 'text!ReMarkdown/templates/parser_template.pegjs'],
    function (declare, lang, string, pegjs, PluginLoader, ElementFactory, template) {
        /**
         * The parser Object that is returned to the end-user
         * @type {A parser object}
         */
        var Parser = declare(null, {
            _options: {
                callbacks: [],
                parserFactory: null,
                elementFactory: null
            },
            _completeCount: 0,
            _onComplete: function (result) {
                this._options.parserFactory
            },

            constructor: function (parser, options) {
                this._parser = parser;
                lang.mixin(this._options, options);
                //check that the parserFactory and elementFactory are set
                if (this._parserFactory == null) throw "parserFactory is null! don't create this object outside factory!"
                if (this._elementFactory == null) throw "elementFactory is null! don't create this object outside factory!"
            },

            parse: function (input) {
                if (input == null) {
                    //Todo make this a bit more... uniform
                    throw "Cannot Parse empty object"
                }
                var result = this._parser.parse(input, this._options);

            },
            onParsed: function (callback) {

            }
        });

        var ParserFactory = declare(null, {
            _grammar: null,
            _elementFactory: null,
            _parserCount: 0,

            _onLoads: [],
            _ready: false,

            //callback structure for different types of parsers
            _parserStarts: ['Document', 'Blocks', 'Inline'],
            _baseParser: null,

            _generateGrammar: function (grammars) {
                var prelude = "";
                var blocks = "";
                var spans = "";
                var grammar = "";
                for (var j in grammars) {
                    for (var i in grammars[j].prelude) {
                        prelude += grammars[j].prelude[i] + "\n";
                    }
                    for (var i in grammars[j].blocks) {
                        blocks += grammars[j].blocks[i] + "/ \n";
                    }
                    for (var i in grammars[j].spans) {
                        spans += (grammars[j].spans[i] + "/ \n");
                    }
                    grammar += grammars[j].grammar;
                }
                var ret = {
                    prelude: prelude,
                    blocks: blocks,
                    spans: spans,
                    extras: grammar
                }
                return ret;
            },

            _onPluginLoad: function (grammar, renderers, self) {
                //Prepare the peg.js grammar
                var values = self._generateGrammar(grammar);
                self._grammar = string.substitute(template, values);
                self._elementFactory = ElementFactory(renderers);
                self._baseParser = pegjs.buildParser(self._grammar, {allowedStartRules: self._parserStarts});
                self._ready = true;

                //fire off the callbacks;
                self._onLoads.forEach(function (obj, index, arr) {
                    obj.callback(this, obj.param);
                }, self);

            },

            constructor: function (pluginList) {
                //Load the plugins
                var pluginLoader = new PluginLoader(pluginList);
                pluginLoader.onLoad({callback: this._onPluginLoad, param: this});
                pluginLoader.load();
            },

            parser: function (type) {
                if (!this._ready) {
                    throw Error("ParserFactory Not Ready!\n Use the On_ready command!");
                }
                if (this._parserStarts.indexOf(type) == -1) {
                    throw ("Unknown Parser Type: " + type);
                }

                var parser = lang.clone(this._baseParser);
                return new Parser(parser,
                    {startRule: type, elementFactory: this._elementFactory, parserFactory: this});
            },

            onLoad: function (callbackObj) {
                if (!('callback' in callbackObj)) {
                    throw new Error("Callback function required!")
                }
                if (this._ready) {
                    callbackObj.callback(callbackObj.param);
                }
                this._onLoads.push(callbackObj);
            },

            getGrammar: function () {
                return this._grammar;
            }
        });
        return (ParserFactory);
    }
)
