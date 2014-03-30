define(['dojo/string', 'dojo/text!./blockCode.html', 'dojo/promise/all'],
    function (string, template, all) {
        return function (text) {
                return string.substitute(template, {content: text.join('')});
        }
    });
