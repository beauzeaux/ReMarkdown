define(["dojo/_base/declare"],
function(declare){
    var TestObj = declare(null, {
       constructor: function(){
           define("Nothing", "Something");
           require(["Core/Core", "Nothing"], function(Utils, value) {
               console.log(Utils);
               console.log(value);
           });
           //console.log("Hello World");
           //console.log(this);
       }
    });
    return TestObj;
})
