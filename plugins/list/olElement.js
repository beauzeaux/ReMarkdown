requirejs.config({
    paths: {
        olTemplate: 'plugins/list/olElement.html'
    }
});
define(['dojo/string', 'text!olTemplate'],
    function(string, template) {
        return function(text) {
            var ret = string.substitute(template, {content: text});
            return ret;
        }
    });