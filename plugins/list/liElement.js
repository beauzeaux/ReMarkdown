requirejs.config({
    paths: {
        liTemplate: 'plugins/list/liElement.html'
    }
});
define(['dojo/string', 'text!liTemplate'],
    function(string, template) {
        return function(text) {
            var ret = string.substitute(template, {content: text});
            return ret;
        }
    });