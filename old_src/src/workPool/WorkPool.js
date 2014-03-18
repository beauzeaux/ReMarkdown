/**
 * Created by Nicholas on 2/9/14.
 */
define(["../../../lib/dojo-release-1.9.2-src/dojo/_base/declare", "dojox/collections/Queue"],
    function (declare, queue) {
        var pool = null;

        var WorkerPool = declare(null, {
            var _workers = [],
            var _work = new Queue(), //stack that holds the work to be done
            constructor: function (numWorkers, file) {
                for (var i = 0; i < numWorkers; i++) {
                    workers[i] = new Worker(file);

                }
            },
            enqueue: function (type, value, callback) {
                /**
                 * The callback to be called when the job is finished
                 * It wraps the provided callback and then returns the
                 * @param result
                 */
                var callback = function (result) {
                    //
                }
                this._work.enqueue({type: type, value: value});
            }
        });

        if (pool === null) {
            //initialize the object
            pool = new WorkerPool(8) //TODO: implement a config file that will take care of the magic numbers
        }

        return pool
    });
