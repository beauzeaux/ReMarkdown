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
            "Core/Paragraph/Paragraph",
            "Core/Document/Document",
            "Core/Blocks/Blocks",
        ];
        var pLoader = new PluginLoader(plugins);
        var promise = pLoader.manifest();
        return promise;
    });