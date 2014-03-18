requirejs.config({
    paths: {
        imgTemplate: 'plugins/image/imgElement.html'
    }
});
define(['../../../lib/external/dojo-release-1.9.2-src/dojo/string', 'text!imgTemplate'],
    function (string, template) {
        return function (input) {
            var ret = string.substitute(template, input);
            return ret;
        }
    });
