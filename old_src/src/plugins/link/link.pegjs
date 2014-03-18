Link =
    text
:
LinkText
target: LinkTarget
{
    var element = options.elementFactory.element('Link');
    return element({text: text, target: target});
}
LinkText =
    "["
text:(!']'
!NewLine
c:.
{
    return c;
}
)*
"]"
{
    var parser = options.parserFactory.parser('Inline');
    var content = parser.parse(text.join(''));
    return content;
}

LinkTarget =
    "("
text:(!")"
!NewLine
c:.
{
    return c;
}
)*
")"
{
    //this should be raw text, but may need to revisit this assumption
    return text.join('');
}
