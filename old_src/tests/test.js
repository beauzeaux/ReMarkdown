/**
 * Created by beauzeaux on 12/21/13.
 */
define(
    function () {
        return {
            tests: {
                'basic': 'hello world',
                'newline': 'hello world\n',
                'underline': '_hello_\n',
                'italics': '*hi*\n',
                'link': requirejs('text!tests/link.txt'),
                'nested_inlines': requirejs('text!tests/nested_inlines.txt'),
                'paragraph': requirejs('text!tests/paragraph.txt'),
                'blockquote': requirejs('text!tests/blockquote.txt'),
                'unorderedlist': requirejs('text!tests/unorderedlist.txt'),
                'orderedlist': requirejs('text!tests/orderedlist.txt'),
                'headings': requirejs('text!tests/headings.txt'),
                'longInput': requirejs('text!tests/longerInput.txt')
            },
            test_func: function (parser, test) {
                if (test == null) {
                    for (var i in this.tests)
                        this.test_func(parser, i);
                    return true;
                }
                console.log("===================");
                console.log(this.tests[test]);
                var output = parser.parse(this.tests[test]);
                console.log(JSON.stringify(output, null, 2));
                console.log("===================");
                return true;
            }
        };
    });