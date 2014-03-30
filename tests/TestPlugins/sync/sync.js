define(['dojo/text!./sync.pegjs', 'dojo/Deferred'],
    function (grammar, Deferred) {
        var manifest = {
            name: "Sync",
            grammar: {
                preludes: [],
                blocks: [],
                spans: ["Sync"],
                grammar: grammar
            },
            renderers: {
                Sync: function (values) {
                    var dfd = new Deferred();
                    dfd.resolve("Sync:" + values);
                    return dfd.promise;
                }
            }
        };
        return manifest;
    });