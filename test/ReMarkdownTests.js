define(['dojo/when', 'ReMarkdown/ReMarkdown'],
    function (when, ReMarkdown) {
        asyncTest("ReMarkdown: Basic Loading", 1, function () {
            var pluginList = ['Core'];
            var rmd = new ReMarkdown();
            var promise = rmd.parse("Hello World\n\n");
            when(promise, function (text) {
                ok(true, "ReMarkdown parser created successfully and parses text");
                start();
            });
        });
    });

