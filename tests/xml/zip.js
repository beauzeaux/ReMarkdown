define([],
function(){
    /*
     * From stackoverflow answer by George Stocker
     * http://stackoverflow.com/questions/4856717/javascript-equivalent-of-pythons-zip-function
     */
    var zip = function(arrays) {
        return arrays[0].map(function(_, i){
           return arrays.map(function(array){
               return array[i]
           });
        });
    };
    return zip;
})
