requirejs.config({
    paths: {
        blockQuote: 'plugins/quote/blockQuote.html'
    }
});
define(['../../../lib/external/dojo-release-1.9.2-src/dojo/string', 'text!blockQuote'],
    function (string, template) {
        return function (text) {
            var ret = string.substitute(template, {content: text});
            return ret;
        }
    });
