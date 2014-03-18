define(["dojo/Deferred"],
    function (Deferred) {
        asyncTest("Deferred Tests", 0, function () {
            var deferred = new Deferred();
            deferred.resolve("Hello World");
            console.log(deferred.promise);
        });
    });