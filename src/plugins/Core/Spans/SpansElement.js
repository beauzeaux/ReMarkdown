define(['dojo/string', 'dojo/promise/all'],
    function (dojoString, all) {
        return function (promises) {
            console.log("SPANSSS");
            //flatten the promises since it is an array of arrays
            var merged = [].concat.apply([], promises);
            var ret =  all(merged).then(function (strs) {
                var text = strs.join("\n");
                return text;
            });
            return ret;
        }
    });
