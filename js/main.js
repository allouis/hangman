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
}

Alphabet.prototype = {
    onKeyup: function(letter){
        if(this.letters.indexOf(letter)<0)this.letters.push(letter);
    },
    draw:function(ctx){
        ctx.fillStyle = "#C01075";
        ctx.fillText(this.getText(), 10, 50);
    },
    getText:function(){
        return this.letters
                .map(function(n){ return numToLetter(n); })
                .join(" ");
    }
};

function Word(sandbox, word){
    GameObject.apply(this, arguments);
    this.word = "";
    for(var i in word){
        this.letters[letterToNum(word[i])] = false;
        this.word += word[i] + " ";
    }
}

}
