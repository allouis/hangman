function Game(){
    this.canvas = document.getElementById("scene");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.context = this.canvas.getContext("2d");
    this.context.font = "100 30px Helvetica Neue";
}

Game.prototype = {
    
    init: function(){
        this.score = 0;
        this.setupSandbox();
        this.setupGameObjects();
        this.draw();
        this.addKeyupListener();
    },

    onKeyup:function(letter){
        if(!this.word.letters[letter] && !~this.alphabet.letters.indexOf(letter)){
            this.score ++;
            if(this.score > 11) this.onLose();
        }
    },

    draw: function(){
        this.context.clearRect(0,0,this.width, this.height);
        this.sandbox.emit("game:draw", this.context, this.score);
    },

    askForWord: function(msg){
        return this.checkInput(prompt(msg));
    },

    checkInput: function(word){
        if(!word) return;
        word = word.toLowerCase();
        if(word.replace(/[a-z]/g, "").replace(/\ /g, "").length) return this.askForWord("Please enter a word - only letter's allowed!");
        return word;
    },

    onWin: function(){
        this.onComplete("And the crowd goes wild..");
    },

    onLose: function(){
        this.onComplete("UH UH :(");
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
        this.word = new Word(this.sandbox, this.askForWord("Please enter a word"));
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
