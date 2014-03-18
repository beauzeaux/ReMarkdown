define([],
    function () {
        var ret = {};
        ret.nonce = function () {
            return Math.random().toString(36).substring(2, 7);
        }
        return ret;
    });
