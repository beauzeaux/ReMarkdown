define(
    ['dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'pegjs', 'PluginLoader', 'ElementFactory', 'text!templates/parser_template.pegjs'],
    function(declare, lang, string, pegjs, PluginLoader, ElementFactory, template) {
        var Parser = declare(null, {
            constructor: function(parser, options) {
                this._parser = parser;
                this._options = options;
            },
            parse: function(input) {
                return this._parser.parse(input, this._options);
            }
        })
        var ParserFactory = declare(null, {
            _grammar: null,
            _elementFactory: null,

            _onLoads: [],
            _ready: false,

            //callback structure for different types of parsers
            _parserStarts: ['Document', 'Blocks', 'Inline'],
            _baseParser: null,

            _generateGrammar: function(grammars) {
                var prelude = "";
                var blocks = "";
                var spans = "";
                var grammar = "";
                for(var j in grammars) {
                    for(var i in grammars[j].prelude) {
                        prelude += grammars[j].prelude[i] + "\n";
                    }
                    for(var i in grammars[j].blocks) {
                        blocks += grammars[j].blocks[i] + "/ \n";
                    }
                    for(var i in grammars[j].spans) {
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

            _onPluginLoad: function(grammar, renderers, self) {
                //Prepare the peg.js grammar
                var values = self._generateGrammar(grammar);
                self._grammar = string.substitute(template, values);
                self._elementFactory = ElementFactory(renderers);
                self._baseParser = pegjs.buildParser(self._grammar, {allowedStartRules: self._parserStarts});
                self._ready = true;

                //fire off the callbacks;
                self._onLoads.forEach(function(obj, index, arr) {
                    obj.callback(this, obj.param);
                }, self);

            },
            constructor: function(pluginList) {
                //Load the plugins
                var pluginLoader = new PluginLoader(pluginList);
                pluginLoader.onLoad({callback:this._onPluginLoad, param: this});
                pluginLoader.load();
            },

            parser: function(type) {
                if (!this._ready) {
                    throw Error("ParserFactory Not Ready!");
                } else if (this._parserStarts.indexOf(type) != -1) {
                    var parser = lang.clone(this._baseParser);
                    return new Parser(parser,
                        {startRule: type, elementFactory: this._elementFactory, parserFactory: this});
                } else {
                    throw ("Unknown Parser Type: " + type);
                }
            },

            onLoad: function(callbackObj) {
                if (!('callback' in callbackObj)) {
                    throw new Error("Callback function required!")
                }
                if(this._ready) {
                    callbackObj.callback(callbackObj.param);
                }
                this._onLoads.push(callbackObj);
            }
        });
        return (ParserFactory);
    }
)
