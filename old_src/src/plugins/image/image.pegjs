//TODO: add support for "titles" and ids
Image =
    altText
:
ImageAltText
target:ImageTarget
{
    var element = options.elementFactory.element('Image');
    return element({altText: altText, target: target});
}

ImageAltText =
    "!["
text:(!"]"
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

ImageTarget =
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
    return text.join('');
}