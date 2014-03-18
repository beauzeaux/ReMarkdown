define(
    ['../../lib/dojo-release-1.9.2-src/dojo/string', 'text!templates/paragraph.html'],
    function (dojoString, template) {
        return function (text) {
            var ret = dojoString.substitute(template, {text: text});
            return ret;
        }
    }
)
