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

function Game(){
    this.canvas = document.getElementById("scene");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.context = this.canvas.getContext("2d");
    this.context.font = "100 30px Helvetica Neue";
    this.score = 0;
}

Game.prototype = {
    
    init: function(){
        this.setupSandbox();
        this.setupGameObjects();
        this.draw();
        this.addKeyupListener();
    },

    draw: function(){
        this.context.clearRect(0,0,this.width, this.height);
        var ctx = this.context;
        this.sandbox.emit("game:draw", this.context);
    },

    askForWord: function(){
        return this.checkInput(prompt("please pick a word"));
    },

    checkInput: function(word){
        word = word.toLowerCase(); 
        if(word.replace(/[a-z]/g, "").length) return this.askForWord();
        return word;
    },

    onWin: function(){
        this.onComplete("you won! the answer was " + this.word);
    },

    onLose: function(){
        this.onComplete("you lose:(");
    },

    onComplete: function(msg){
        this.draw();
        alert(msg);
    }
};

