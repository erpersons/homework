function reverseString(str) {
    var newString = ''
    for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    } // end for
    return newString;
} // end reverseString
console.log(reverseString('howdy'));