define(["dojox/uuid"],
    function (uuid) {
        asyncTest("Requirejs define", 0, function () {
            var a = "Hello";
            var b = "World";
            var def = uuid.generateRandomUuid();
            define(def, a);
            requirejs([def], function (stuff) {
                console.log(stuff);
            });
            def = uuid.generateRandomUuid();
            define(def, b);
            requirejs([def], function (stuff) {
                console.log(stuff);
            });
        });
    });
