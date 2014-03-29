define(['dojo/string', 'dojo/text!Base/quote/blockQuote.html', 'dojo/promise/all'],
    function (string, template, all) {
        return function (lines) {
            var ret = all(lines).then(function (text) {
                return string.substitute(template, {content: text.join('\n')});
            });
            return ret;
        }
    });
