BlockQuote =
    lines:( '>'
            chars:( !(NewLine)
                    c:. { return c })*
            NewLine ?
            {return chars.join('')})+
{
    return options.elementFactory.element('BlockQuote', lines);
}