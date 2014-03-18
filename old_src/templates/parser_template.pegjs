/**
 * Created by beauzeaux on 12/21/13.
 */
{
    //PRELUDE ELEMENTS
    ${prelude}
}

start = blocks
:
Blocks

Document =
    blocks
:
Blocks

SpanStart =
    value
:
Span
NewLine * EOF
{
    return value;
}

// Generated Elements
Prelude =
    FAILURE

BlockElement =
    ${blocks}
    Paragraph /
        Singleton /
        FAILURE

Span =
    ${spans}
    FAILURE

// Pre-Defined Elements

Block =
    EmptyLine *
        element
:
BlockElement
(EmptyLine / EmptyLine * EOF)
{
    return element;
}

Blocks =
    blocks
:
Block +
{
    return blocks.join('');
}

Paragraph =
    vals
:
(val
:
Inline + NewLine ? {return val.join('')}
)
+
{
    var element = options.elementFactory.element('Paragraph');
return element(vals.join(' '));
}

Singleton =
    vals
:
(val
:
Inline
)
{
    var ret = vals.join('');
    return ret;
}

Inline =
    values
:
(Span / Text) +
{
    return values;
}


//A Single non-span starting non-span ending and non-newline character

TextChar = !Span
!NewLine
char:.
{
    return char;
}

//Text
Text =
    text
:
TextChar +
{
    //return just a string
    return text.join('');
}

//Empty Line
EmptyLine =
    (' ' / '\t') *
        NewLine

//New Line
NewLine =
    '\r' ? '\n'

//End of File
    EOF
        = !
.

//Failure rule (always returns false)
FAILURE =
&
{
    return false;
}

${extras}