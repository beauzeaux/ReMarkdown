define(
    ['dojo/string', 'dojo/text!./Paragraph.html', 'dojo/promise/all'],
    function (dojoString, template, all) {
        return function (promise) {
            //wait until the text is ready
            return promise.then(function (text) {
                var ret = dojoString.substitute(template, {text: text});
                return ret;
            });
        }
    }
);