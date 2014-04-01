define(['dojo/string', 'dojo/text!./ulElement.html', 'dojo/promise/all'],
    function (string, template, all) {
        return function (promises) {
            return all(promises).then(function(texts){
                var content = texts.join("\n");
                return string.substitute(template, {content: content});
            });
        }
    });
