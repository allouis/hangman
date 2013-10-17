function letterToNum(letter){
    return (parseInt(letter, 36) - 10);
}

function numToLetter(num){
    return (num + 10).toString(36);
}

function extend(){
    var obj = Array.prototype.splice.call(arguments, 0, 1)[0];
    for(var i = 0, l = arguments.length; i < l; i++){
        var arg = arguments[i];
        for(var key in arg) {
            obj[key] = arg[key];
        }
    }
    return obj;
}
