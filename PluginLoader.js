define(
    ['dojo/_base/lang', 'dojo/_base/declare', 'dojo/string'],
    function(lang, declare, dojoString) {
        var PluginLoader = declare(null, {
            _grammar : [],
            _renderers : [],
            _onLoads: [],

            /**
             * Callback function for require
             * @param plugin
             * @private
             */
            _loadPlugin: function(loader, plugin) {
                loader._grammar = loader._grammar.concat(plugin.grammar);
                loader._renderers = loader._renderers.concat(plugin.renderers);
                loader._finished(loader, plugin.name);
            },

            _loadingCount: 0, // the number of plugins currently loading

            _finished: function(loader, name) {
                console.log("Loaded: " + name);
                loader._loadingCount--;
                if (loader._loadingCount > 0) {
                    return; // do nothing since we are still loading other plugins
                }
                if (loader._onLoads.length == 0) {
                    return;
                }
                //last plugin loaded, collapse the
                var renderTmp = {};
                for (var o in loader._renderers) {
                    lang.mixin(renderTmp, loader._renderers[o]);
                }
                loader._renderers = renderTmp;
                loader._onLoads.forEach(function(obj, index, arr) {
                    obj.callback(loader._grammar, loader._renderers, obj.param);
                }, this);
            },

            /**
             * @private
             * Updates the plugin loader to reflect the current
             * plugin list.
             */
            _loadPlugins: function() {
                this._loadingCount = this._pluginList.length;
                console.log("Loading " + this._loadingCount + " plugins");
                for (var o in this._pluginList) {
                    define('loader', this)
                    var path = dojoString.substitute("plugins/${name}/${name}.js", {name: this._pluginList[o]});
                    require(['loader', path], this._loadPlugin);
                }
            },

            constructor: function(pluginList) {
                this._pluginList = pluginList;
            },

            onLoad: function(callbackObj) {
                if (!('callback' in callbackObj)) {
                    throw new Error("Callback function required!")
                }
                this._onLoads.push(callbackObj);
            },

            load: function() {
                this._loadPlugins();
            },

            addPlugins: function(plugins) {
                throw new Error("Unimplemented Function");
            },

            removePlugins: function(plugins) {
                throw new Error("Unimplemented Function");
            }
        });

        return PluginLoader;
    }
);
