define(["dojo/Deferred", "dojo/when"],
    function (Deferred, when) {
        /**
         * Test the asynchronusness of the rendering sceheme by creating a basic wait/callback
         */
        return function (rPromise) {
            var df = new Deferred();
            //wait on all prior asyncs to finish
            when(rPromise, function (text) {
                setTimeout(function () {
                    df.resolve("ASYNCTEST:" + text);
                }, 1000);
            });
            return df.promise;
        }
    })