function Word(sandbox, word){
    GameObject.apply(this, arguments);
    this.word = "";
    for(var i in word){
        this.letters[letterToNum(word[i])] = false;
        this.word += word[i] + " ";
    }
}

Word.prototype = {
    onKeyup: function(letter){
        if(this.letters[letter] !== undefined) {
            this.letters[letter] = true;
            this.sandbox.emit("word:correct", letter);
            if(this.isComplete()) {
                this.sandbox.emit("word:complete");
            }
        } 
    },
    draw: function(ctx){
        var word = this.word;
        this.letters.forEach(function(letter, i){
            if(letter===false) word = word.split(numToLetter(i)).join("_");
        });
        ctx.fillStyle = "#75C010";
        ctx.fillText(word, 10, 200);
    },
    isComplete: function(){
        return this.letters.every(function(letter){ return letter; }); 
    },
    toString: function(){
        return this.word.split(" ").join("");
    }
};
