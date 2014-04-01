ListLine =
    '  ' ' '?
    chars:((!NewLine) c:. {return c;})*
    NewLine?
{
    return chars.join('');
}

OrderedList =
    items:OrderedListElement+
{
    return options.elementFactory.element('OrderedList', items);
}

OrderedFirstLine =
    [0-9]+ (')' / '.')
    ' '
    chars:(!NewLine c:. {return c;})*
    NewLine?
{
    return chars.join('');
}

OrderedListElement =
    line1:OrderedFirstLine
    lines:ListLine*
{
    var input = line1 += "\n" + lines.join('\n');
    //Render the contents
    var content = options.parser.parse(input, {startRule:'Blocks'});
    var element = options.elementFactory.element('ListItem', content);
    return element;
}



UnorderedList =
    items:UnorderedListElement+
{
    var element = options.elementFactory.element('UnorderedList', items);
    return element;
}

UnorderedFirstLine =
    ('-' / '*')
    ' '
    chars:(!NewLine c:. {return c;})*
    NewLine?
{
    return chars.join('');
}

UnorderedListElement =
    line1: UnorderedFirstLine
    lines: ListLine*
{
    var input = line1 += "\n" + lines.join('\n')
    //Render the contents
    var content = options.parser.parse(input, {startRule:'Blocks'});
    var element = options.elementFactory.element('ListItem', content);
    return element;
}
