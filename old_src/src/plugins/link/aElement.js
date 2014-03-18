requirejs.config({
    paths: {
        aTemplate: 'plugins/link/aElement.html'
    }
});
define(['../../../lib/external/dojo-release-1.9.2-src/dojo/string', 'text!aTemplate'],
    function (string, template) {
        return function (input) {
            var ret = string.substitute(template, input);
            return ret;
        }
    });
