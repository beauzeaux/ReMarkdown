define(
    [
        'dojo/_base/lang',
        'dojo/_base/declare',
        'dojo/_base/array',
        'dojo/string',
        'dojo/Deferred',
        'dojo/promise/all',
        'dojo/when',
        'dojo/text!./parser_template.pegjs'
    ],
    function (lang, declare, dojoArray, dojoString, Deferred, all, when, parserTemplate) {
        'use strict';
        //noinspection JSLint
        return declare(null, {
            _manifest: null, // the final manifest
            _grammar: null, // the final grammar (for PEG.js)
            _renderers: null, // the final renderers object (for ElementFactory)
            /**
             * @private
             * Loads a list of manifest files for the individual plugins and plugin packages
             * This function is async and is intended to run in the background
             *
             */
            _loadPlugins: function (pluginList) {
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
                var manifests = pluginList.map(function (pluginName) {
                    //The promise for the manifest
                    var deferred = new Deferred();
                    require(['dojo/_base/lang', 'dojo/when', pluginName],
                        function (lang, when, pluginPromise) {
                            /*
                             The object returned is either a promise for a manifest or a
                             manifest. The when abstraction handles either, so when the manifest
                             is available resolve the deferred object with that manifest.
                             */
                            when(pluginPromise).then(function (manifest) {
                                deferred.resolve(manifest);
                            });
                        }
                    );
                    return deferred.promise;
                });
                // Once all the manifests are done loading there are a few tasks to perform
                // 1) creating the final manifest which represents all the loaded plugins
                // 2) creating the grammar for PEG.js
                // 3) creating the renderers object for the Element Factory
                //noinspection JSLint
                this._manifest = all(manifests).then(function (manifests) {
                    //helper function for collapsing an array of objects
                    var mergeProperty = function (arr, prop) {
                        return dojoArray.filter(
                            [].concat.apply([],
                                arr.map(
                                    function (obj) {
                                        return obj[prop];
                                    }
                                )
                            ),
                            function (item) {//filter out the null objects
                                return item !== null;
                            }
                        );
                    };

                    //merge the grammar objects
                    var grammars = mergeProperty(manifests, 'grammar');
                    var renderers = mergeProperty(manifests, 'renderers');

                    //create the final manifest
                    return {
                        name: "PluginLoader Manifest",
                        grammar: {
                            preludes: mergeProperty(grammars, 'preludes'),
                            blocks: mergeProperty(grammars, 'blocks'),
                            spans: mergeProperty(grammars, 'spans'),
                            grammar: mergeProperty(grammars, 'grammar').join("\n")
                        },
                        renderers: lang.mixin.apply({}, renderers)
                    };

                });
                // Once the final manifest is ready, go ahead and generate the grammar
                // and the renderers
                this._renderers = when(this._manifest).then(function (manifest) {
                    return manifest.renderers;
                });
                this._grammar = when(this._manifest).then(function (manifest) {
                    //console.log(manifest);
                    var replace = {
                        preludes: manifest.grammar.preludes.join("\n"),
                        blocks: manifest.grammar.blocks.join("/\n    "),
                        spans: manifest.grammar.spans.join("/\n   "),
                        grammar: manifest.grammar.grammar
                    };
                    if (manifest.grammar.blocks.length > 0) {
                        replace.blocks += "/";
                    }
                    if (manifest.grammar.spans.length > 0) {
                        replace.spans += "/";
                    }
                    //form the replacement strings
                    //do the substitution inside the template
                    return dojoString.substitute(parserTemplate, replace);
                });
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
             * @returns {Object}
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
    }
);
