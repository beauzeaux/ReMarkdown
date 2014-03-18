BlockQuote =
    lines
:
('>'
chars:(!(NewLine)
c:.
{
    return c
}
)*
NewLine ?
{return chars.join('')}
)
+
{
    var element = options.elementFactory.element('BlockQuote');
//render the interior
var parser = options.parserFactory.parser('Blocks');
var content = parser.parse(lines.join('\n'));
return element(content);
}