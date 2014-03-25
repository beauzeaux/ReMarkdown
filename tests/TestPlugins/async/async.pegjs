Async =
    "<async>"
    text:$(!"</async>" !NewLine c:.)+
    "</async>"
{
    //Use the ParserFactory to create a span parser
    var parser = options.parserFactory.parser('Inline');
    var content = parser.parse(text);
    var element = options.elementFactory.element('Example');
    return element(content);
}
