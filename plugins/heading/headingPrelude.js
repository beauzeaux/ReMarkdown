var currentHeading = 0;

var lowerHeading = function(count) {
    if (count <= currentHeading) {
        return true;
    }
    return false;
};

var updateHeading = function(count) {
    currentHeading = count;
    return true;
}