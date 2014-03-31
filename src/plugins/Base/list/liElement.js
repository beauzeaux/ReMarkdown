define(['dojo/string', 'dojo/text!./liElement.html'],
    function (string, template) {
        return function (promise) {
            return promise.then(function(text){
                return string.substitute(template, {content: text});
            });
        }
    });