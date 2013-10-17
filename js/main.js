// Utils
function letterToNum(letter){
    return (parseInt(letter, 36) - 10);
}

function numToLetter(num){
    return (num + 10).toString(36);
}

function GameObject(sandbox){
    this.sandbox = sandbox;
    this.letters = [];
    sandbox.on("game:keyup", this.onKeyup, this);
    sandbox.on("game:draw", this.draw, this);
}

// Alphabet
function Alphabet(sandbox){
    GameObject.apply(this, arguments);
    this.pickedLetters = [];
    for(var i = 0, l = 26; i < l; i++){
        this.letters[i] = false;
    }
    this.sandbox.on("word:correct", this.removeLetter, this);
}
