requirejs.config({
    paths: {
        headingElement: 'plugins/heading/headingElement.html'
    }
});
define(['../../../lib/external/dojo-release-1.9.2-src/dojo/string', 'text!headingElement'],
    function (string, template) {
        return function (values) {
            var ret = string.substitute(template, values);
            return ret;
        }
    });

