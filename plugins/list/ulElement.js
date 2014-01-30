requirejs.config({
    paths: {
        ulTemplate: 'plugins/list/ulElement.html'
    }
});
define(['dojo/string', 'text!ulTemplate'],
    function(string, template) {
        return function(text) {
            var ret = string.substitute(template, {content: text});
            return ret;
        }
    });
