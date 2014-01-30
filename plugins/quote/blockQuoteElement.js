requirejs.config({
    paths: {
        blockQuote: 'plugins/quote/blockQuote.html'
    }
});
define(['dojo/string', 'text!blockQuote'],
function(string, template) {
    return function(text) {
        var ret = string.substitute(template, {content: text});
        return ret;
    }
});
