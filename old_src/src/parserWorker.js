// SetUp the Worker
var requirejs = importScripts('requirejs');

var callbacks = {
    'block': parseBlockElement,
    'span': parseSpanElement,
    'ping': pong
}
// The worker main

onmessage = function (message) {
    if (!(message.type in callbacks)) {
        // tried to get the worker to do something funny
        // TODO: post an error message
        return;
    }
    callbacks[message.type](message.params);
};

