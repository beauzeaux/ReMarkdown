Sync =
    "<sync>"
    text:$(!"</sync>" !NewLine c:. )+
    "</sync>"
{
    //Use the ParserFactory to create a span parser
    //TODO: parse the inner stuff!!
    var text = options.elementFactory.element('Sync', text);
    return text;
}
