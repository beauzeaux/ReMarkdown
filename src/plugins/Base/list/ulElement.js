requirejs.config({
    paths: {
        ulTemplate: 'plugins/list/ulElement.html'
    }
});
define(['../../../lib/external/dojo-release-1.9.2-src/dojo/string', 'text!ulTemplate'],
    function (string, template) {
        return function (text) {
            var ret = string.substitute(template, {content: text});
            return ret;
        }
    });