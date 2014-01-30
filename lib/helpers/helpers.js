/**
 * Created by beauzeaux on 12/21/13.
 */
requirejs.config({
    paths: {
        spanElement : 'lib/helpers/spanElement.handlebars',
        spanElementRule : 'lib/helpers/spanElementRule.handlebars'
    }
});

define(
    ['handlebars','text!spanElement', 'text!spanElementRule'],
    function (handlebars,
              spanElement_temp,
              spanElementRule_temp) {

    return {
        spanElement : handlebars.compile(spanElement_temp),
        spanElementRule : handlebars.compile(spanElementRule_temp)
    };
});