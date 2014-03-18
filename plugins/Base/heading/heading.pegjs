Heading =
    level
:
HeadingStart
headText: Inline //the heading title
NewLine
    & {headingLevel = level;
return true;
} // set the heading level to determine where to stop
text: (!(NewLine
LowerHeading
)
char:.
{
    return char
}
)* //content under the heading
{
    //console.log("Heading: " + headText + "\nContents:" + text.join(''));
    var parser = options.parserFactory.parser('Blocks');
    var content = parser.parse(text.join(''));
    var element = options.elementFactory.element('Heading');
    return element({level: level, content: content, heading: headText});
}

HeadingStart =
    level
:
"#" +
" "
{
    return level.length;
}

LowerHeading =
    level
:
HeadingStart
& {return (headingLevel >= level);
}