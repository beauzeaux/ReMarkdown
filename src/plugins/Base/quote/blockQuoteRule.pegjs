BlockQuote =
    lines:( '>'
            chars:( !(NewLine)
                    c:. { return c })*
            NewLine?
            {return chars.join('')})+
{
    var txt = lines.join("\n");
    console.log(txt);
    var pText = options.parser.parse(txt, {startRule: 'Blocks'});
    var ret = options.elementFactory.element('BlockQuote', pText);
    return ret;
}