requirejs.config({
    paths: {
        olTemplate: 'plugins/list/olElement.html'
    }
});
define(['../../../lib/external/dojo-release-1.9.2-src/dojo/string', 'text!olTemplate'],
    function (string, template) {
        return function (text) {
            var ret = string.substitute(template, {content: text});
            return ret;
        }
    });