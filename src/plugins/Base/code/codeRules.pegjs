blockCode =
    "```"
    text:(!"```" !EOF c:. {return c})+
    "```"
{
   return options.elementFactory.element('blockCode', text);
}