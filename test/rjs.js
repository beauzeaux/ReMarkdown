define([],
    function () {
        asyncTest("Requirejs double call test", 2, function () {
            requirejs(['basic'], function () {
                ok(true, "exited once");
            });
            requirejs(['basic'], function () {
                ok(true, "exited once");
                start();
            });
        });
    });