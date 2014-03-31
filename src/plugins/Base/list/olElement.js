define(['dojo/string', 'dojo/text!./olElement.html'],
    function (string, template) {
        return function (promise) {
            return promise.then(function(text){
                return ret =  string.substitute(template, {content: text});
            });
        }
    });