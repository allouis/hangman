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
