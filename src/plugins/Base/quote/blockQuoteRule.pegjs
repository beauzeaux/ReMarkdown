BlockQuote =
    lines:( '>'
            chars:( !(NewLine)
                    c:. { return c })*
            NewLine ?
            {return chars.join('')})+
{
    var pText = options.parser.parse(lines, {startRule: 'Blocks'});
    var ret = options.elementFactory.element('BlockQuote', pText);
    return ret;
}