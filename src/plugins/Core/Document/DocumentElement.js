define(
    ['dojo/string', 'dojo/text!./Document.html', 'dojo/when'],
    function (dojoString, template, when) {
        return function (promise) {
            //wait until every one of the inlines is done rendering
            var ret = when(promise).then(function (result) {
                var ret = dojoString.substitute(template, {content: result});
                return ret;
            });
            return ret;
        }
    }
);
