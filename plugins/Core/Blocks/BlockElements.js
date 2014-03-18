define(['dojo/string', 'dojo/promise/all'],
    function (dojoString, all) {
        return function (promises) {
            return all(promises).then(function (strs) {
                var text = strs.join("\n");
                return text;
            });
        }
    });
