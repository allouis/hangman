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

    onKeyup:function(letter){
        if(!this.word.letters[letter] && !~this.alphabet.letters.indexOf(letter)){
            this.score ++;
            for(var i = 0, l = this.score; i < l; i++){
                this.hangman[i]();
            }
            if(this.score > 11) this.onLose();
        }
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
        if(word.replace(/[a-z]/g, "").replace(/\ /g, "").length) return this.askForWord();
        return word;
    },

    onWin: function(){
        this.onComplete("you won!");
    },

    onLose: function(){
        this.onComplete("you lose:(");
    },

    onComplete: function(msg){
        window.removeEventListener("keyup", this.keyupListener);
        this.draw();
        alert(msg);
        this.reset();
    },

    reset: function(){
        if(confirm("Play again?")) {
            this.init();
        }
    },

    setupSandbox: function(){
        this.sandbox = new Events();
        this.sandbox.on("word:complete", this.onWin, this);
    },

    setupGameObjects: function(){
        this.alphabet = new Alphabet(this.sandbox);
        this.sandbox.on("game:keyup", this.onKeyup, this);
        this.word = new Word(this.sandbox, this.askForWord());
    },

    addKeyupListener: function(){
        this.keyupListener = this.keyupListener.bind(this);
        window.addEventListener("keyup", this.keyupListener);
    },

    keyupListener: function(event){
        if(event.which > 64 && event.which < 91) {
            this.sandbox.emit("game:keyup", event.which-65);
            this.draw();
        }
    }
};
