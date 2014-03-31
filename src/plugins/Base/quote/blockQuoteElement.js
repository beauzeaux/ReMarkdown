define(['dojo/string', 'dojo/text!./blockQuote.html', 'dojo/promise/all'],
    function (string, template, all) {
        return function (pText) {
            var ret = pText.then(function (text) {
                console.log(text);
                return string.substitute(template, {content: text});
            });
            return ret;
        }
    });
