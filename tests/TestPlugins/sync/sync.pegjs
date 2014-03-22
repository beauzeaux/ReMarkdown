Basic =
    "<example>"
text:$(!"</example>"
!NewLine
c:.
)
+
    "</example>"
{
    //Use the ParserFactory to create a span parser
    //TODO: parse the inner stuff!!
    var text = options.elementFactory.element('Example', text);
    return text;
}
