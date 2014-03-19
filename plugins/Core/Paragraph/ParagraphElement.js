define(
    ['dojo/string', 'text!./Paragraph.html', 'dojo/promise/all'],
    function (dojoString, template, all) {
        return function (promises) {
            //wait until every one of the inlines is done rendering
            return all(promises).then(function (strs) {
                //strings should be a bunch of inlines
                //combine them using a space character
                var text = strs.join(' ');
                var ret = dojoString.substitute(template, {text: text});
                return ret;
            });
        }
    }
);