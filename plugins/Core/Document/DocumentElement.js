define(
    ['dojo/string', 'text!ReMarkdown/plugins/Core/Document/Document.html', 'dojo/when'],
    function (dojoString, template, when) {
        return function (promise) {
            //wait until every one of the inlines is done rendering
            var ret = when(promise, function (result) {
                var ret = dojoString.substitute(template, {content: result});
                return ret;
            });
            return ret;
        }
    }
);
