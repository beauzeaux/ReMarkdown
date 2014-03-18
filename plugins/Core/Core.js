/**
 * Meta-Manifest file for all the core Elements for the
 * ReMarkdown Syntax. Included in the package are
 *
 * - Blocks
 * - Documents
 * - Paragraphs
 */
define(["ReMarkdown/PluginLoader/PluginLoader", "dojo/when"],
    function (PluginLoader, when) {
        var plugins = [
            "ReMarkdown/plugins/Core/Paragraph/Paragraph",
            "ReMarkdown/plugins/Core/Document/Document",
            "ReMarkdown/plugins/Core/Blocks/Blocks",
        ];
        var pLoader = new PluginLoader(plugins);
        var promise = pLoader.manifest();
        return promise;
    })