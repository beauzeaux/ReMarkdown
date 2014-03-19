define(
    ['dojo/_base/lang', 'dojo/_base/declare', 'dojo/string',
        'dojo/Deferred', 'dojo/promise/all', 'dojo/when', '../Utils', 'text!./parser_template.pegjs'],
    function (lang, declare, dojoString, Deferred, all, when, Utils, parserTemplate) {
        var PluginLoader = declare(null, {
            _manifest: null, // the final manifest
            _grammar: null, // the final grammar (for PEG.js)
            _renderers: null, // the final renderers object (for ElementFactory)
            /**
             * @private
             * Loads a list of manifest files for the individual plugins and plugin packages
             * This function is asyncronus and is intended to run in the background
             *
             */
            _loadPlugins: function (pluginList) {
                //console.log("[ReMarkdown][PluginLoader]Loading...");
                /*
                 * This massive nested closure is resposible for the loading of the plugins
                 * The outer deferred object returns a promise for a manifest. Requirejs is
                 * then used to load the plugin which can either return a promise object or
                 * a manifest which will then be used to resolve the outermost deferred.
                 *
                 * Promise for manifest
                 * | Requirejs loader
                 * | | Promise for manifest or manifest which resolves outermost promise
                 */
                var manifests = pluginList.map(function (pluginName, i, arr) {
                    //The promise for the manifest
                    var deferred = new Deferred();
                    //since you can only define a name once with requirejs (can undef but race conditions)
                    var str = Utils.nonce();
                    define(str, deferred);//define it so it can be passed via requirejs
                    requirejs(['dojo/_base/lang', 'dojo/when', str, pluginName],
                        function (lang, when, deferred, pluginPromise) {
                            /*
                             The object returned is either a promise for a manifest or a
                             manifest. The when abstraction handles either, so when the manifest
                             is available resolve the deferred object with that manifest.
                             */
                            when(pluginPromise, function (manifest) {
                                //console.log("[ReMarkdown][PluginLoader]Loaded: " + manifest.name);
                                deferred.resolve(manifest);
                            });
                            require.undef(str);//clean up the namespace
                        }
                    );
                    return deferred.promise;
                });
                // Once all the manifests are done loading there are a few tasks to perform
                // 1) creating the final manifest which represents all the loaded plugins
                // 2) creating the grammar for PEG.js
                // 3) creating the renderers object for the Element Factory

                this._manifest = all(manifests).then(function (manifests) {
                    //first merge all the manifests into the final manifest
                    //TODO: clean this looping mess up
                    var Manifest = {
                        name: "PluginLoader Manifest",
                        grammar: {
                            preludes: [].concat.apply([], manifests.map(function (manifest) {
                                return manifest.grammar.prelude;
                            })),
                            blocks: [].concat.apply([], manifests.map(function (manifest) {
                                return manifest.grammar.blocks;
                            })),
                            spans: [].concat.apply([], manifests.map(function (manifest) {
                                return manifest.grammar.spans;
                            })),
                            grammar: [].concat.apply([], manifests.map(function (manifest) {
                                return manifest.grammar.grammar;
                            })).join("\n")
                        },
                        renderers: lang.mixin.apply({},
                            [].concat.apply([],
                                manifests.map(function (manifest) {
                                    return manifest.renderers;
                                })))
                    }
                    //console.log("[ReMarkdown][PluginLoader]Final Manifest generated...");
                    return Manifest;
                });
                // Once the final manifest is ready, go ahead and generate the grammar
                // and the renderers
                this._renderers = when(this._manifest, function (manifest) {
                    return manifest.renderers;
                });
                this._grammar = when(this._manifest, function (manifest) {
                    var replace = {
                        preludes: manifest.grammar.preludes.join("\n"),
                        blocks: manifest.grammar.blocks.join("/\n    "),
                        spans: manifest.grammar.spans.join("/\n   "),
                        grammar: manifest.grammar.grammar
                    }
                    if (manifest.grammar.blocks.length > 0) {
                        replace.blocks += "/"
                    }
                    if (manifest.grammar.spans.length > 0) {
                        replace.spans += "/"
                    }
                    //form the replacement strings
                    //do the substitution inside the template
                    grammar = dojoString.substitute(parserTemplate, manifest.grammar);
                    //console.log("[ReMarkdown][PluginLoader]Final Grammar generated...");
                    return grammar;
                });
                all([this._manifest, this._grammar, this._renderers]).then(function (results) {
                    //console.log("[ReMarkdown][PluginLoader]PluginLoader finished");
                })

            },

            /**
             * Load a list of plugins for the ReMarkdown parser
             * @param pluginList
             */
            constructor: function (pluginList) {
                this._loadPlugins(pluginList);
            },

            /**
             * Load a final manifest for the
             * @returns {A final Manifest file for all the loaded plugins | A promise for the formentioned manifest}
             */
            manifest: function () {
                return this._manifest;
            },
            /**
             * Get a promise for or a grammar associated with the loaded plugins
             */
            grammar: function () {
                return this._grammar;
            },

            renderers: function () {
                return this._renderers;
            }
        });
        return PluginLoader;
    }
);
