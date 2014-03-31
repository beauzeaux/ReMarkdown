/**
 * Meta-Manifest file for all the core Elements for the
 * ReMarkdown Syntax. Included in the package are
 *
 * - Blocks
 * - Documents
 * - Paragraphs
 */
define(["ReMarkdown/PluginLoader", "dojo/when"],
    function (PluginLoader, when) {
        var plugins = [
            "Base/quote/quote",
            "Base/code/code",
            "Base/list/list"
        ];
        var pLoader = new PluginLoader(plugins);
        var promise = pLoader.manifest();
        return promise;
    });