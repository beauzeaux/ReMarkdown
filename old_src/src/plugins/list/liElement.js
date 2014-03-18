requirejs.config({
    paths: {
        liTemplate: 'plugins/list/liElement.html'
    }
});
define(['../../../lib/external/dojo-release-1.9.2-src/dojo/string', 'text!liTemplate'],
    function (string, template) {
        return function (text) {
            var ret = string.substitute(template, {content: text});
            return ret;
        }
    });