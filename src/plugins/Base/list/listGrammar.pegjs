OrderedList =
    items:OrderedListElement+
{
    return element = options.elementFactory.element('OrderedList', items);
}

OrderedListElement =
    line1:( OrderedListPrefix
            chars:(!(NewLine)
            c:. {return c;})*
            NewLine? {return chars.join('')})
    lines:( '  '
            chars:( (!NewLine)
                    c:. { return c; })*
            NewLine ? {return chars.join('')})*
{
    var input = line1 += "\n" + lines.join('\n')
    //Render the contents
    var parser = options.parserFactory.parser('Blocks');
    var content = parser.parse(input);

    var element = options.elementFactory.element('ListItem');
    return element(content);
}
OrderedListPrefix =
    [0 - 9] + (')' / '.')
' '

UnorderedList =
    items
:
UnorderedListElement +
{
    var content = items.join('\n');
var element = options.elementFactory.element('UnorderedList');
return element(content);
}

UnorderedListElement =
    line1
:
(UnorderedListPrefix
chars:(!(NewLine)
c:.
{
    return c;
}
)*
NewLine ? {return chars.join('')}
)
lines: ('  '
chars:((!NewLine)
c:.
{
    return c;
}
)*
NewLine ? {return chars.join('')}
)*

{
    var input = line1 += "\n" + lines.join('\n')
    //Render the contents
    var parser = options.parserFactory.parser('Blocks');
    var content = parser.parse(input);

    var element = options.elementFactory.element('ListItem');
    return element(content);
}

UnorderedListPrefix =
    ('-' / '*')
' '

