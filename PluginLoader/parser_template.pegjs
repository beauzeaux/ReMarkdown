{
    //PRELUDE ELEMENTS
    ${preludes}
}

start =
    document
:
Document
{
    return document;
}

Document =
    blocks
:
Blocks
{
    var ret = options.elementFactory.element('Document', blocks);
    return ret;
}
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
    return options.elementFactory.element('Blocks', blocks)
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
    var element = options.elementFactory.element('Paragraph', vals);
return element;
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

${grammar}